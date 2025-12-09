import { Locales } from "../data/un-languages";
import type { Locale } from "../types/lstring";
import type LString from "../types/lstring";

export default function (ltext: LString | { [locale: string]: string }, ...preferedLocales: Locale[]): string {
  if (!ltext) return "";

  const cleaned = cleanLString(ltext) as LString;
  const ltextLocales = Object.keys(cleaned);
  const locale = preferedLocales.find((l) => ltextLocales.includes(l)) || "en";

  let text = cleaned[locale] as string | null | undefined;

  if (!text) {
    const firstAvailableLocale = Locales.find((l) => !!cleaned[l]);

    if (firstAvailableLocale) text = cleaned[firstAvailableLocale];
  }

  if (!text) {
    // cannot find any of the un locales..... return first text value
    text = Object.values(cleaned)
      .filter(o => typeof (o) === 'string')
      .filter(o => !!o)[0];
  }

  if (!text) text = ""

  return text;
}

export function trim(ltext: LString | { [locale: string]: string }) {
  if (!ltext) return ltext;

  return Object.entries(ltext).reduce((ret, [k, v]) => ({ ...ret, [k]: v?.trim() }), {});
}

export function isNullOrEmpty(ltext?: LString | { [locale: string]: string }) {
  return !ltext || !Object.values(cleanLString(ltext)).some(Boolean);
}

export function isNullOrWhiteSpace(ltext?: LString | { [locale: string]: string }) {
  return !ltext || !Object.values(trim(cleanLString(ltext))).some(Boolean);
}

function isValidLocaleEntry([k, v]: any) {
  return k && !k.startsWith("#")
}

function cleanLString(ltext: LString | { [locale: string]: string }): LString | { [locale: string]: string } {
  if (!ltext) return {};

  return Object.entries(ltext)
    .filter(isValidLocaleEntry)
    .reduce((o, [k, v]) => ({ ...o, [k]: v }), {});
}