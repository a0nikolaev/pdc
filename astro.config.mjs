// @ts-check
import { defineConfig } from 'astro/config';

// Сайт публикуется на GitHub Pages репозитория a0nikolaev/pdc → a0nikolaev.github.io/pdc/.
// Шесть языков; корневая страница учитывает сохранённый выбор и языки браузера.
export default defineConfig({
  site: 'https://a0nikolaev.github.io',
  base: '/pdc/',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru', 'en', 'kk', 'uz', 'ky', 'tg'],
    routing: { prefixDefaultLocale: true, redirectToDefaultLocale: false },
  },
});
