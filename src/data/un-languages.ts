import type { Locale } from '../types/lstring';

export interface Language {
    locale: Locale,
    name: string,
    direction: "ltr" | "rtl"
};

export const English: Language = { locale: "en", name: "English", direction: "ltr" };
export const Spanish: Language = { locale: "es", name: "Español", direction: "ltr" };
export const French: Language = { locale: "fr", name: "Français", direction: "ltr" };
export const Arabic: Language = { locale: "ar", name: "العربية", direction: "rtl" };
export const Russian: Language = { locale: "ru", name: "Русский", direction: "ltr" };
export const Chinese: Language = { locale: "zh", name: "中文", direction: "ltr" };

export const Languages: Language[] = [
    English,
    Spanish,
    French,
    Arabic,
    Russian,
    Chinese
];

export const Locales: Array<string> = Languages.map(({ locale }) => locale);