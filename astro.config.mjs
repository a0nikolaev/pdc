// @ts-check
import { defineConfig } from 'astro/config';

// Сайт публикуется на GitHub Pages репозитория a0nikolaev/pdc → a0nikolaev.github.io/pdc/.
// Две языковые версии: /ru/ и /en/; корневая страница выбирает язык по браузеру.
export default defineConfig({
  site: 'https://a0nikolaev.github.io',
  base: '/pdc/',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
