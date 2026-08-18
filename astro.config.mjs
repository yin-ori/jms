import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Pfade aller Blog-Artikel, die im Frontmatter `unlisted: true` tragen. Sie
// werden gebaut und sind ueber ihren Link erreichbar, sollen aber nicht in der
// Sitemap stehen (die Seiten selbst liefern zusaetzlich noindex aus).
function unlistedBlogPaths() {
  const blogDir = path.resolve('src/content/blog');
  if (!fs.existsSync(blogDir)) return [];

  const paths = [];
  for (const locale of fs.readdirSync(blogDir)) {
    const localeDir = path.join(blogDir, locale);
    if (locale.startsWith('_') || !fs.statSync(localeDir).isDirectory()) continue;

    for (const file of fs.readdirSync(localeDir)) {
      if (!file.endsWith('.md') && !file.endsWith('.mdx')) continue;
      const frontmatter = fs.readFileSync(path.join(localeDir, file), 'utf-8').split('---')[1] ?? '';
      if (/^unlisted:\s*true\s*$/m.test(frontmatter)) {
        paths.push(`/${locale}/blog/${file.replace(/\.mdx?$/, '')}`);
      }
    }
  }
  return paths;
}

// Die Sprach-Einstiege leiten nur weiter und tragen noindex — eine Seite, die
// nicht indexiert werden soll, gehoert nicht in die Sitemap.
const redirectPaths = ['/de', '/en'];
const excludedFromSitemap = [...unlistedBlogPaths(), ...redirectPaths];

// https://astro.build/config
export default defineConfig({
  site: 'https://jmsugawara.com',
  base: '/',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) => {
        const pathname = new URL(page).pathname.replace(/\/$/, '');
        return !excludedFromSitemap.includes(pathname);
      },
      i18n: {
        defaultLocale: 'en',
        locales: {
          de: 'de',
          en: 'en',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['de', 'en'],
    routing: {
      prefixDefaultLocale: false
    }
  },
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
});