export type Locale = 'de' | 'en';

export const locales: Locale[] = ['de', 'en'];
export const defaultLocale: Locale = 'en';

export const languageNames = {
  de: { native: 'Deutsch', english: 'German' },
  en: { native: 'English', english: 'English' },
  ja: { native: '日本語', english: 'Japanese' },
} as const;

// Translation dictionaries
export const translations = {
  de: {
    'nav.home': 'Home',
    'nav.about': 'Über mich',
    'nav.profession': 'Berufliches',
    'nav.research_page': 'Forschung',
    'nav.services': 'Angebot',
    'nav.translation': 'Übersetzung',
    'nav.proofreading': 'Lektorat',
    'nav.research': 'Forschungsberatung',
    'nav.blog': 'Artikel',
    'nav.reading': 'Lesen',
    'nav.contact': 'Kontakt',
    'site.title': 'JM Sugawara',
    'site.description': 'Japanologie, Übersetzung & interkulturelle Brücken',
    'home.title': 'JM Sugawara',
    'home.subtitle': 'Sinnstiftung durch interkulturelle Brücken',
    'home.description': 'Spezialisiert auf literarische und akademische Texte zwischen Deutsch und Japanisch.',
    'about.title': 'Über mich',
    'about.description': 'Erfahren Sie mehr über meine Expertise und Arbeitsweise',
    'services.title': 'Angebot',
    'services.description': 'Professionelle Übersetzungs- und Lektoratsdienstleistungen',
    'contact.title': 'Kontakt',
    'contact.description': 'Nehmen Sie Kontakt mit mir auf',
    'blog.title': 'Artikel',
    'blog.description': 'Einblicke in die Welt der Übersetzung und Sprache',
    'landing.academia': 'Academia',
    'landing.profession': 'Profession',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.profession': 'Profession',
    'nav.research_page': 'Research',
    'nav.services': 'Services',
    'nav.translation': 'Translation',
    'nav.proofreading': 'Proofreading',
    'nav.research': 'Research Consulting',
    'nav.blog': 'Articles',
    'nav.reading': 'Reading',
    'nav.contact': 'Contact',
    'site.title': 'JM Sugawara',
    'site.description': 'Japanese Studies, Translation & Intercultural Bridges',
    'home.title': 'JM Sugawara',
    'home.subtitle': 'Creating Meaning Through Intercultural Bridges',
    'home.description': 'Specialized in literary and academic texts between German and Japanese.',
    'about.title': 'About',
    'about.description': 'Learn more about my expertise and approach',
    'services.title': 'Services',
    'services.description': 'Professional translation and proofreading services',
    'contact.title': 'Contact',
    'contact.description': 'Get in touch with me',
    'blog.title': 'Articles',
    'blog.description': 'Insights into the world of translation and language',
    'landing.academia': 'Academia',
    'landing.profession': 'Profession',
  },
  ja: {
    'nav.home': 'ホーム',
    'nav.about': '私について',
    'nav.profession': '経歴',
    'nav.research_page': '研究',
    'nav.services': 'サービス',
    'nav.translation': '翻訳',
    'nav.proofreading': '校正',
    'nav.research': '研究コンサルティング',
    'nav.blog': 'ブログ',
    'nav.reading': '読書',
    'nav.contact': 'お問い合わせ',
    'site.title': 'JM Sugawara',
    'site.description': '日本学、翻訳、異文化交流',
    'home.title': 'JM Sugawara',
    'home.subtitle': '異文化の架け橋を通じた意義の創造',
    'home.description': 'ドイツ語と日本語間の文学・学術テキストを専門としています。',
    'about.title': '私について',
    'about.description': '私の専門知識と研究について',
    'services.title': 'サービス',
    'services.description': 'プロフェッショナル翻訳・校正サービス',
    'contact.title': 'お問い合わせ',
    'contact.description': 'お気軽にお問い合わせください',
    'blog.title': '記事',
    'blog.description': '翻訳と言語の世界への洞察',
    'landing.academia': 'Academia',
    'landing.profession': 'Profession',
  },
} as const;

// Get translation function
export function useTranslations(locale: Locale) {
  return function t(key: keyof typeof translations[typeof defaultLocale]): string {
    return translations[locale][key] || translations[defaultLocale][key] || key;
  };
}

// Strip trailing slash from base URL, return empty string if base is just '/'
function getBase(): string {
  const base = import.meta.env.BASE_URL;
  return base === '/' ? '' : base.replace(/\/$/, '');
}

// URL utilities - now all locales have explicit prefixes for better SEO
export function getLocalizedPath(path: string, locale: Locale): string {
  return `${getBase()}/${locale}${path}`;
}

export function removeLocalePrefix(pathname: string): string {
  const base = getBase();
  const path = base ? pathname.replace(base, '') || '/' : pathname;
  for (const locale of locales) {
    if (path.startsWith(`/${locale}/`)) {
      return path.slice(`/${locale}`.length);
    }
    if (path === `/${locale}`) {
      return '/';
    }
  }
  return path;
}

export function getLocaleFromUrl(url: URL): Locale {
  const base = getBase();
  const pathname = base ? url.pathname.replace(base, '') || '/' : url.pathname;
  for (const locale of locales) {
    if (pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`) {
      return locale;
    }
  }
  return defaultLocale;
}