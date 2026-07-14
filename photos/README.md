# Photograph publishing workflow

This folder is the private starting point for personal photographs. The website should only use the processed copies created in `src/assets/images/generated/`.

## Add photographs safely

1. Put JPEG, PNG, TIFF or WebP working files inside `photos/originals/`. Subfolders are preserved, so photographs for the lens page belong in `photos/originals/lens/`.
2. Keep RAW camera files outside the repository. RAW formats are blocked by Git as an additional safeguard and are not processed by this workflow.
3. Run `pnpm images:process`.
4. Review the new JPEG and WebP files in `src/assets/images/generated/` before publishing them.

The default processing removes embedded metadata, applies the correct camera orientation, limits the longest edge to 2000 pixels, and uses quality 82. Existing generated files are left untouched unless you run `pnpm images:process:force`.

Run `pnpm images:clean` to remove all generated copies and start again. Originals are never removed or overwritten by these commands.

## Optional watermark

Place a transparent PNG at `photos/watermark/watermark.png`, then enable the watermark in `image-pipeline.config.ts`. A subtle mark such as the following works well:

```text
© Emma Vellard
emmavellard.com
```

The watermark scales with each photograph. It can be disabled for individual files with the optional `photos/images.json` manifest:

```json
{
  "kyoto/fushimi-inari.jpg": {
    "watermark": true,
    "maxDimension": 2200
  },
  "tokyo/shibuya-night.jpg": {
    "watermark": false
  }
}
```

Paths in this file are relative to `photos/originals/`. The processor validates every entry and stops with a clear message if an option or filename is incorrect.

## Important limitation

This workflow prevents accidental publication of original files and discourages casual reuse. It cannot completely prevent someone from saving or copying a photograph displayed on the web.
