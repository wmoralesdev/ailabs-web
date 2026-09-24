import type { Locale } from "@/content"

const INTL_LOCALE: Record<Locale, string> = { en: "en-US", es: "es-SV" }

/** UTC keeps the server render and the hydrated date identical. */
export function formatMeDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(new Date(iso))
}

export function toIso(value: Date | null): string | null {
  return value ? value.toISOString() : null
}
