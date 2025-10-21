import { Locales } from "../data/un-languages";
import type { Locale } from "../types/lstring";
import type LString from "../types/lstring";

export default function (ltext: string | LString | { [locale: string]: string } | null | undefined, preferedLocale?: Locale): string {
  if (!ltext) return "";

  if (typeof (ltext) === 'string') return ltext;

  const locale = preferedLocale || "en"; // TODO default to i18n.locale instead ;

  let text = ltext[locale] as string | undefined;

  if (!text) {
    const firstAvailableLocale = Locales.find((l) => !!ltext[l]);

    if (firstAvailableLocale) text = ltext[firstAvailableLocale];
  }

  if (!text) {
    // cannot find any of the un locales..... return first text value
    text = Object.values(ltext)
      .filter(o => typeof (o) === 'string')
      .filter(o => !!o)[0];
  }

  if (!text) text = ""

  return text;
}

export function trim(ltext: LString) {
  return Object.entries(ltext).reduce((ret, [k, v]) => ({ ...ret, [k]: v?.trim() }), {});
}

export function isEmpty(ltext?: LString) {
  return !ltext || !Object.values(trim(ltext)).some(Boolean);
}
