import type { ImageMetadata } from 'astro';

const generatedDestinationModules = import.meta.glob<{
  default: ImageMetadata;
}>('../assets/images/generated/*/gallery/*.{jpg,jpeg,png}', { eager: true });

export function getDestinationPhotos(slug: string) {
  const gallerySegment = `/generated/${slug}/gallery/`;

  return Object.entries(generatedDestinationModules)
    .filter(([path]) => path.includes(gallerySegment))
    .sort(([firstPath], [secondPath]) => firstPath.localeCompare(secondPath))
    .map(([, module]) => module.default);
}
