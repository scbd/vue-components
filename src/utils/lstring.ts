import { Locales } from "../data/un-languages";
import type { Locale } from "../types/lstring";
import type LString from "../types/lstring";

export default function (ltext?: string | LString | { [locale: string]: string }, ...preferedLocales: Locale[]): string {
  if (!ltext) return "";

  if (typeof (ltext) === 'string') return ltext;

  const cleanedLtext: LString | { [locale: string]: string } = Object.entries(ltext)
    .filter(isValidLocaleEntry)
    .reduce((o, [k, v]) => ({ ...o, [k]: v }), {});
  const ltextLocales = Object.keys(cleanedLtext);
  const locale = preferedLocales.find((l) => ltextLocales.includes(l)) || "en"; // TODO default to i18n.locale instead ;

  let text = cleanedLtext[locale] as string | undefined;

  if (!text) {
    const firstAvailableLocale = Locales.find((l) => !!cleanedLtext[l]);

    if (firstAvailableLocale) text = cleanedLtext[firstAvailableLocale];
  }

  if (!text) {
    // cannot find any of the un locales..... return first text value
    text = Object.values(cleanedLtext)
      .filter(o => typeof (o) === 'string')
      .filter(o => !!o)[0];
  }

  if (!text) text = ""

  return text;
}

export function trim(ltext?: string | LString | { [locale: string]: string }) {
  if (!ltext) return ltext;

  if (typeof (ltext) === 'string') return ltext.trim();

  return Object.entries(ltext).reduce((ret, [k, v]) => ({ ...ret, [k]: v?.trim() }), {});
}

export function isNullOrEmpty(ltext?: string | LString | { [locale: string]: string }) {
  return !ltext || !Object.entries(ltext)
    .filter(isValidLocaleEntry)
    .some(([k, v]) => !!v);
}

export function isNullOrWhiteSpace(ltext?: string | LString | { [locale: string]: string }) {
  return !ltext || !Object.entries(trim(ltext))
    .filter(isValidLocaleEntry)
    .some(([k, v]) => !!v);
}

function isValidLocaleEntry([k, v]: any) {
  return k && !k.startsWith("#")
}
