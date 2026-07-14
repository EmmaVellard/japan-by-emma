import { en } from './en';
import { fr } from './fr';

export const locales = ['en', 'fr'] as const;
export type Locale = (typeof locales)[number];
export type Section =
  | 'guide'
  | 'itineraries'
  | 'destinations'
  | 'lens'
  | 'maps'
  | 'resources'
  | 'about';

export const dictionaries = { en, fr } as const;

export const sectionSlugs: Record<Section, Record<Locale, string>> = {
  guide: { en: 'guide', fr: 'guide' },
  itineraries: { en: 'itineraries', fr: 'itineraires' },
  destinations: { en: 'destinations', fr: 'destinations' },
  lens: { en: 'through-my-lens', fr: 'a-travers-mon-objectif' },
  maps: { en: 'maps', fr: 'cartes' },
  resources: { en: 'resources', fr: 'ressources' },
  about: { en: 'about', fr: 'a-propos' },
};

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'fr';
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'fr' : 'en';
}

export function localisedPath(
  locale: Locale,
  section?: Section,
  slug?: string,
): string {
  const parts: string[] = [locale];
  if (section) parts.push(sectionSlugs[section][locale]);
  if (slug) parts.push(slug);
  return `/${parts.join('/')}/`;
}

export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
