import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import type { ImageMetadata } from 'astro';

const locale = z.enum(['en', 'fr']);
type ImageSchema = () => z.ZodType<ImageMetadata>;
const imageMetadata = (image: ImageSchema) =>
  z.object({
    image: image(),
    alt: z.string(),
    caption: z.string().optional(),
    location: z.string().optional(),
    date: z.coerce.date().optional(),
  });
const baseEditorial = (image: ImageSchema) =>
  z.object({
    title: z.string(),
    description: z.string(),
    locale,
    translationKey: z.string(),
    slug: z.string(),
    order: z.number().default(99),
    featured: z.boolean().default(false),
    lastUpdated: z.coerce.date(),
    needsReview: z.boolean().default(false),
    translationReview: z.boolean().default(false),
    heroImage: image().optional(),
    heroAlt: z.string().optional(),
    heroCaption: z.string().optional(),
    gallery: z.array(imageMetadata(image)).default([]),
  });

const guide = defineCollection({
  loader: glob({
    base: './src/content/guide',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: ({ image }) =>
    baseEditorial(image).extend({ category: z.string().default('planning') }),
});

const itinerary = defineCollection({
  loader: glob({
    base: './src/content/itineraries',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: ({ image }) =>
    baseEditorial(image).extend({
      days: z.number().int().positive(),
      recommendedFor: z.string().optional(),
      destinations: z.array(z.string()),
      timeline: z.array(
        z.object({
          day: z.string(),
          title: z.string(),
          note: z.string().optional(),
        }),
      ),
      transportNotes: z.array(z.string()).default([]),
      alternatives: z.array(z.string()).default([]),
      mapUrl: z.url().optional(),
    }),
});

const destination = defineCollection({
  loader: glob({
    base: './src/content/destinations',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: ({ image }) =>
    baseEditorial(image).extend({
      region: z.string(),
      recommendedDuration: z.string(),
      highlights: z.array(z.string()).default([]),
      mapUrl: z.url().optional(),
    }),
});

const recommendation = defineCollection({
  loader: glob({
    base: './src/content/recommendations',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    locale,
    translationKey: z.string(),
    slug: z.string(),
    type: z.enum(['restaurant', 'hotel', 'cafe', 'experience', 'shop']),
    destination: z.string(),
    status: z.enum(['visited', 'researched', 'to-test']),
    mapUrl: z.url().optional(),
    priceRange: z.string().optional(),
    featured: z.boolean().default(false),
    lastUpdated: z.coerce.date(),
  }),
});

const resource = defineCollection({
  loader: glob({
    base: './src/content/resources',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: ({ image }) =>
    baseEditorial(image).extend({ resourceType: z.string() }),
});

const gallery = defineCollection({
  loader: glob({
    base: './src/content/galleries',
    pattern: '**/*.{md,mdx}',
    generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, ''),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      locale,
      translationKey: z.string(),
      slug: z.string(),
      photos: z.array(imageMetadata(image)),
    }),
});

export const collections = {
  guide,
  itineraries: itinerary,
  destinations: destination,
  recommendations: recommendation,
  resources: resource,
  galleries: gallery,
};
