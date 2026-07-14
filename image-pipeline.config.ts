export type WatermarkPosition =
  | 'northwest'
  | 'north'
  | 'northeast'
  | 'west'
  | 'centre'
  | 'east'
  | 'southwest'
  | 'south'
  | 'southeast';

export interface ImagePipelineConfig {
  inputDirectory: string;
  outputDirectory: string;
  manifestPath: string;
  maxDimension: number;
  jpegQuality: number;
  webpQuality: number;
  generateJpeg: boolean;
  generateWebp: boolean;
  watermark: {
    enabled: boolean;
    imagePath: string;
    position: WatermarkPosition;
    opacity: number;
    widthRatio: number;
    marginRatio: number;
  };
}

const config: ImagePipelineConfig = {
  inputDirectory: 'photos/originals',
  outputDirectory: 'src/assets/images/generated',
  manifestPath: 'photos/images.json',
  maxDimension: 2000,
  jpegQuality: 82,
  webpQuality: 82,
  generateJpeg: true,
  generateWebp: true,
  watermark: {
    enabled: false,
    imagePath: 'photos/watermark/watermark.png',
    position: 'southeast',
    opacity: 0.28,
    widthRatio: 0.15,
    marginRatio: 0.025,
  },
};

export default config;
