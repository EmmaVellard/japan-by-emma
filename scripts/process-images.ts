import { createHash } from 'node:crypto';
import {
  access,
  mkdir,
  readFile,
  readdir,
  rm,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import config, {
  type ImagePipelineConfig,
  type WatermarkPosition,
} from '../image-pipeline.config';

const acceptedExtensions = new Set([
  '.jpeg',
  '.jpg',
  '.png',
  '.tif',
  '.tiff',
  '.webp',
]);

interface ImageOverride {
  watermark?: boolean;
  maxDimension?: number;
}

type ImageManifest = Record<string, ImageOverride>;

interface OutputPlan {
  sourcePath: string;
  relativeSource: string;
  relativeOutputStem: string;
}

interface Summary {
  discovered: number;
  processed: number;
  skipped: number;
  filesWritten: number;
  warnings: string[];
  failures: string[];
}

function toPosix(filePath: string): string {
  return filePath.split(path.sep).join('/');
}

function normalizeSegment(segment: string): string {
  const normalized = segment
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, '-and-')
    .replace(/[’']/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || 'image';
}

function normalizedStem(relativeSource: string): string {
  const parsed = path.posix.parse(toPosix(relativeSource));
  const segments = parsed.dir.split('/').filter(Boolean).map(normalizeSegment);
  segments.push(normalizeSegment(parsed.name));
  return segments.join('/');
}

function shortHash(value: string): string {
  return createHash('sha256').update(value).digest('hex').slice(0, 8);
}

async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function scan(directory: string): Promise<string[]> {
  if (!(await exists(directory))) return [];

  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await scan(entryPath)));
    } else if (
      entry.isFile() &&
      acceptedExtensions.has(path.extname(entry.name).toLowerCase())
    ) {
      files.push(entryPath);
    }
  }

  return files;
}

function createPlans(files: string[], inputDirectory: string): OutputPlan[] {
  const draftPlans = files.map((sourcePath) => {
    const relativeSource = toPosix(path.relative(inputDirectory, sourcePath));
    return {
      sourcePath,
      relativeSource,
      relativeOutputStem: normalizedStem(relativeSource),
    };
  });

  const collisions = new Map<string, number>();
  for (const plan of draftPlans) {
    collisions.set(
      plan.relativeOutputStem,
      (collisions.get(plan.relativeOutputStem) ?? 0) + 1,
    );
  }

  return draftPlans.map((plan) => ({
    ...plan,
    relativeOutputStem:
      collisions.get(plan.relativeOutputStem) === 1
        ? plan.relativeOutputStem
        : `${plan.relativeOutputStem}-${shortHash(plan.relativeSource)}`,
  }));
}

function validatePositiveInteger(
  value: unknown,
  label: string,
): asserts value is number {
  if (!Number.isInteger(value) || Number(value) <= 0) {
    throw new Error(`${label} must be a positive whole number.`);
  }
}

function validateQuality(value: number, label: string): void {
  if (!Number.isInteger(value) || value < 1 || value > 100) {
    throw new Error(`${label} must be a whole number between 1 and 100.`);
  }
}

function validateConfig(value: ImagePipelineConfig): void {
  validatePositiveInteger(value.maxDimension, 'maxDimension');
  validateQuality(value.jpegQuality, 'jpegQuality');
  validateQuality(value.webpQuality, 'webpQuality');

  if (!value.generateJpeg && !value.generateWebp) {
    throw new Error('At least one output format must be enabled.');
  }
  if (value.watermark.opacity < 0 || value.watermark.opacity > 1) {
    throw new Error('watermark.opacity must be between 0 and 1.');
  }
  if (value.watermark.widthRatio <= 0 || value.watermark.widthRatio > 1) {
    throw new Error(
      'watermark.widthRatio must be greater than 0 and at most 1.',
    );
  }
  if (value.watermark.marginRatio < 0 || value.watermark.marginRatio > 0.5) {
    throw new Error('watermark.marginRatio must be between 0 and 0.5.');
  }
}

function resolveProjectPath(
  root: string,
  configuredPath: string,
  label: string,
): string {
  const resolved = path.resolve(root, configuredPath);
  const relative = path.relative(root, resolved);
  if (
    relative === '' ||
    relative === '..' ||
    relative.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relative)
  ) {
    throw new Error(`${label} must be a folder or file inside the project.`);
  }
  return resolved;
}

async function readManifest(manifestPath: string): Promise<ImageManifest> {
  if (!(await exists(manifestPath))) return {};

  let parsed: unknown;
  try {
    parsed = JSON.parse(await readFile(manifestPath, 'utf8'));
  } catch (error) {
    throw new Error(
      `Could not read ${manifestPath}: ${error instanceof Error ? error.message : String(error)}`,
    );
  }

  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error(`${manifestPath} must contain a JSON object.`);
  }

  const manifest: ImageManifest = {};
  for (const [rawName, rawOverride] of Object.entries(parsed)) {
    const name = rawName.replace(/^\.\//, '').replaceAll('\\', '/');
    if (
      !rawOverride ||
      typeof rawOverride !== 'object' ||
      Array.isArray(rawOverride)
    ) {
      throw new Error(`The override for "${rawName}" must be an object.`);
    }

    const override = rawOverride as Record<string, unknown>;
    const unknownKeys = Object.keys(override).filter(
      (key) => !['watermark', 'maxDimension'].includes(key),
    );
    if (unknownKeys.length > 0) {
      throw new Error(
        `Unknown option${unknownKeys.length === 1 ? '' : 's'} for "${rawName}": ${unknownKeys.join(', ')}.`,
      );
    }
    if (
      override.watermark !== undefined &&
      typeof override.watermark !== 'boolean'
    ) {
      throw new Error(`"${rawName}.watermark" must be true or false.`);
    }
    if (override.maxDimension !== undefined) {
      validatePositiveInteger(
        override.maxDimension,
        `"${rawName}.maxDimension"`,
      );
    }

    const validatedOverride: ImageOverride = {};
    if (override.watermark !== undefined) {
      validatedOverride.watermark = override.watermark;
    }
    if (override.maxDimension !== undefined) {
      validatedOverride.maxDimension = override.maxDimension;
    }
    manifest[name] = validatedOverride;
  }

  return manifest;
}

function watermarkCoordinates(
  position: WatermarkPosition,
  imageWidth: number,
  imageHeight: number,
  watermarkWidth: number,
  watermarkHeight: number,
  margin: number,
): { left: number; top: number } {
  const left = {
    northwest: margin,
    west: margin,
    southwest: margin,
    north: Math.round((imageWidth - watermarkWidth) / 2),
    centre: Math.round((imageWidth - watermarkWidth) / 2),
    south: Math.round((imageWidth - watermarkWidth) / 2),
    northeast: imageWidth - watermarkWidth - margin,
    east: imageWidth - watermarkWidth - margin,
    southeast: imageWidth - watermarkWidth - margin,
  }[position];
  const top = {
    northwest: margin,
    north: margin,
    northeast: margin,
    west: Math.round((imageHeight - watermarkHeight) / 2),
    centre: Math.round((imageHeight - watermarkHeight) / 2),
    east: Math.round((imageHeight - watermarkHeight) / 2),
    southwest: imageHeight - watermarkHeight - margin,
    south: imageHeight - watermarkHeight - margin,
    southeast: imageHeight - watermarkHeight - margin,
  }[position];

  return { left: Math.max(0, left), top: Math.max(0, top) };
}

async function createWatermark(
  imagePath: string,
  targetWidth: number,
  opacity: number,
): Promise<{ input: Buffer; width: number; height: number }> {
  const { data, info } = await sharp(imagePath)
    .ensureAlpha()
    .resize({ width: targetWidth, withoutEnlargement: true })
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let index = 3; index < data.length; index += info.channels) {
    data[index] = Math.round(data[index]! * opacity);
  }

  return {
    input: await sharp(data, {
      raw: { width: info.width, height: info.height, channels: info.channels },
    })
      .png()
      .toBuffer(),
    width: info.width,
    height: info.height,
  };
}

async function applyWatermark(
  image: Buffer,
  width: number,
  height: number,
  watermarkPath: string,
): Promise<Buffer> {
  const watermarkWidth = Math.max(
    1,
    Math.round(width * config.watermark.widthRatio),
  );
  const watermark = await createWatermark(
    watermarkPath,
    watermarkWidth,
    config.watermark.opacity,
  );
  const margin = Math.round(
    Math.min(width, height) * config.watermark.marginRatio,
  );
  const position = watermarkCoordinates(
    config.watermark.position,
    width,
    height,
    watermark.width,
    watermark.height,
    margin,
  );

  return sharp(image)
    .composite([{ input: watermark.input, ...position }])
    .toBuffer();
}

async function cleanOutput(outputDirectory: string): Promise<void> {
  await rm(outputDirectory, { recursive: true, force: true });
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(path.join(outputDirectory, '.gitkeep'), '');
  console.log(`Cleaned ${outputDirectory}`);
}

async function processPlan(
  plan: OutputPlan,
  outputDirectory: string,
  manifest: ImageManifest,
  watermarkPath: string,
  force: boolean,
  summary: Summary,
): Promise<void> {
  const override = manifest[plan.relativeSource] ?? {};
  const maxDimension = override.maxDimension ?? config.maxDimension;
  const useWatermark = override.watermark ?? config.watermark.enabled;
  const jpegPath = path.join(outputDirectory, `${plan.relativeOutputStem}.jpg`);
  const webpPath = path.join(
    outputDirectory,
    `${plan.relativeOutputStem}.webp`,
  );
  const wantsJpeg = config.generateJpeg && (force || !(await exists(jpegPath)));
  const wantsWebp = config.generateWebp && (force || !(await exists(webpPath)));

  if (!wantsJpeg && !wantsWebp) {
    summary.skipped += 1;
    console.log(`Skipped ${plan.relativeSource} (outputs already exist)`);
    return;
  }

  const { data: resized, info } = await sharp(plan.sourcePath, {
    failOn: 'error',
  })
    .rotate()
    .resize({
      width: maxDimension,
      height: maxDimension,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toBuffer({ resolveWithObject: true });

  let publishable: Buffer<ArrayBufferLike> = resized;
  if (useWatermark) {
    if (await exists(watermarkPath)) {
      publishable = await applyWatermark(
        resized,
        info.width,
        info.height,
        watermarkPath,
      );
    } else {
      summary.warnings.push(
        `${plan.relativeSource}: watermark requested, but ${config.watermark.imagePath} was not found. The image was generated without one.`,
      );
    }
  }

  await mkdir(path.dirname(jpegPath), { recursive: true });

  if (wantsJpeg) {
    await sharp(publishable)
      .flatten({ background: '#f5f0e6' })
      .jpeg({ quality: config.jpegQuality, mozjpeg: true })
      .toFile(jpegPath);
    summary.filesWritten += 1;
  }
  if (wantsWebp) {
    await sharp(publishable)
      .webp({ quality: config.webpQuality, effort: 4 })
      .toFile(webpPath);
    summary.filesWritten += 1;
  }

  summary.processed += 1;
  console.log(
    `Processed ${plan.relativeSource} → ${plan.relativeOutputStem}.{jpg,webp}`,
  );
}

async function main(): Promise<void> {
  const argumentsSet = new Set(process.argv.slice(2));
  const supportedArguments = new Set(['--force', '--clean']);
  const unknownArguments = [...argumentsSet].filter(
    (argument) => !supportedArguments.has(argument),
  );
  if (unknownArguments.length > 0) {
    throw new Error(`Unknown option: ${unknownArguments.join(', ')}`);
  }

  validateConfig(config);
  const root = process.cwd();
  const inputDirectory = resolveProjectPath(
    root,
    config.inputDirectory,
    'inputDirectory',
  );
  const outputDirectory = resolveProjectPath(
    root,
    config.outputDirectory,
    'outputDirectory',
  );
  const manifestPath = resolveProjectPath(
    root,
    config.manifestPath,
    'manifestPath',
  );
  const watermarkPath = resolveProjectPath(
    root,
    config.watermark.imagePath,
    'watermark.imagePath',
  );

  if (argumentsSet.has('--clean')) {
    await cleanOutput(outputDirectory);
    return;
  }

  await mkdir(inputDirectory, { recursive: true });
  await mkdir(outputDirectory, { recursive: true });
  const manifest = await readManifest(manifestPath);
  const files = await scan(inputDirectory);
  const plans = createPlans(files, inputDirectory);
  const knownFiles = new Set(plans.map((plan) => plan.relativeSource));
  const unknownOverrides = Object.keys(manifest).filter(
    (source) => !knownFiles.has(source),
  );
  if (unknownOverrides.length > 0) {
    throw new Error(
      `The image manifest refers to missing file${unknownOverrides.length === 1 ? '' : 's'}: ${unknownOverrides.join(', ')}`,
    );
  }

  const summary: Summary = {
    discovered: plans.length,
    processed: 0,
    skipped: 0,
    filesWritten: 0,
    warnings: [],
    failures: [],
  };

  for (const plan of plans) {
    try {
      await processPlan(
        plan,
        outputDirectory,
        manifest,
        watermarkPath,
        argumentsSet.has('--force'),
        summary,
      );
    } catch (error) {
      const message = `${plan.relativeSource}: ${error instanceof Error ? error.message : String(error)}`;
      summary.failures.push(message);
      console.error(`Failed ${message}`);
    }
  }

  console.log('\nImage processing summary');
  console.log(`  Photographs found: ${summary.discovered}`);
  console.log(`  Photographs processed: ${summary.processed}`);
  console.log(`  Output files written: ${summary.filesWritten}`);
  console.log(`  Photographs skipped: ${summary.skipped}`);
  console.log(`  Warnings: ${summary.warnings.length}`);
  console.log(`  Failures: ${summary.failures.length}`);
  for (const warning of summary.warnings) console.warn(`  Warning: ${warning}`);

  if (summary.failures.length > 0) process.exitCode = 1;
}

main().catch((error) => {
  console.error(
    `Image processing stopped: ${error instanceof Error ? error.message : String(error)}`,
  );
  process.exitCode = 1;
});
