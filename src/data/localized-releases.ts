import releases from './releases.json';
import translations from './release-translations.json';
import type {Lang} from '../i18n/content';
for (const entry of releases.en) {
  const key = `${entry.component}:${entry.version}` as keyof typeof translations;
  const item = translations[key];
  const source = entry.highlights.join('\n');
  if (!item || item.sourceText !== source) throw new Error(`Missing or stale release translation: ${key}`);
  for (const lang of ['kk','uz','ky','tg'] as const) if (!item[lang]?.length || item[lang].some(s => !s.trim())) throw new Error(`Missing ${lang} release: ${key}`);
}
export function localizedReleases(lang: Lang) {
  if (lang === 'ru' || lang === 'en') return releases[lang];
  return releases.en.map(entry => ({...entry, highlights: translations[`${entry.component}:${entry.version}` as keyof typeof translations][lang]}));
}
