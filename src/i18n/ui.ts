import strings from './ui.json';
import type { Lang } from './content';
export function ui(lang: Lang, key: keyof typeof strings.en): string { return strings[lang][key]; }
