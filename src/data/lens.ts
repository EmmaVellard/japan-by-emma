import type { ImageMetadata } from 'astro';

const generatedLensModules = import.meta.glob<{
  default: ImageMetadata;
}>('../assets/images/generated/lens/*.{jpg,jpeg,png}', { eager: true });

export const lensImages = Object.entries(generatedLensModules)
  .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
  .map(([, module]) => module.default);
