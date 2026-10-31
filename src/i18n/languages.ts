export const languages = ['ru', 'en', 'kk', 'uz', 'ky', 'tg'] as const;
export type Language = typeof languages[number];
export const languageNames: Record<Language, string> = {ru:'Русский', en:'English', kk:'Қазақша', uz:'O‘zbekcha', ky:'Кыргызча', tg:'Тоҷикӣ'};
export function isLanguage(value: unknown): value is Language { return typeof value === 'string' && languages.includes(value as Language); }
export function preferredLanguage(saved: unknown, browserLanguages: readonly string[]): Language {
  if (isLanguage(saved)) return saved;
  for (const value of browserLanguages) { const short = value.toLowerCase().split(/[-_]/)[0]; if (isLanguage(short)) return short; }
  return 'en';
}
