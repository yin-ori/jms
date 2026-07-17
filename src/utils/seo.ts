import type { Locale } from './i18n';
import { SITE_CONFIG } from '@/constants/site';

export interface SEOProps {
  title: string;
  description: string;
  locale: Locale;
  keywords?: string[];
  image?: string;
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
  };
}

// Generate structured data for Person
export function generatePersonSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${SITE_CONFIG.name} Professional`,
    jobTitle: 'Translator and Proofreader',
    description: 'Professional translator and proofreader specializing in German-Japanese literary and academic texts',
    url: SITE_CONFIG.url,
    sameAs: [],
    knowsLanguage: [
      {
        '@type': 'Language',
        name: 'German',
        alternateName: 'de',
      },
      {
        '@type': 'Language',
        name: 'Japanese',
        alternateName: 'ja',
      },
    ],
  };
}

// Generate hreflang links
export function generateHreflangLinks(currentPath: string) {
  return [
    { hreflang: 'de', href: `${SITE_CONFIG.url}${currentPath}` },
    { hreflang: 'ja', href: `${SITE_CONFIG.url}/ja${currentPath}` },
    { hreflang: 'x-default', href: `${SITE_CONFIG.url}${currentPath}` },
  ];
}

// Generate Open Graph meta tags
export function generateOpenGraphTags(props: SEOProps) {
  const { title, description, locale, image } = props;

  return [
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:locale', content: locale === 'de' ? 'de_DE' : 'ja_JP' },
    { property: 'og:site_name', content: SITE_CONFIG.name },
    ...(image ? [{ property: 'og:image', content: image }] : []),
  ];
}

// Generate Twitter Card meta tags
export function generateTwitterCardTags(props: SEOProps) {
  const { title, description, image } = props;

  return [
    { name: 'twitter:card', content: image ? 'summary_large_image' : 'summary' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    ...(image ? [{ name: 'twitter:image', content: image }] : []),
  ];
}