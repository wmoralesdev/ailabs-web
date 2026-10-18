import type { Locale } from "@/content/types"

import { lumaEvents } from "@/content/luma-events"
import type { LumaEvent } from "@/content/luma-events"

const intlLocale: Record<Locale, string> = {
  es: "es-SV",
  en: "en-US",
}

function pick(
  locale: Locale,
  spanish: string | undefined,
  english: string | undefined
): string | undefined {
  const value = locale === "es" ? (spanish ?? english) : (english ?? spanish)
  const trimmed = value?.trim()
  return trimmed || undefined
}

function formatDay(date: Date, timeZone: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    timeZone,
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

function formatClock(date: Date, timeZone: string, locale: Locale): string {
  return new Intl.DateTimeFormat(intlLocale[locale], {
    timeZone,
    hour: "numeric",
    minute: "2-digit",
  }).format(date)
}

function dayKey(date: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date)
}

export function formatLumaPlace(
  event: LumaEvent,
  locale: Locale
): string | null {
  const place = event.place
  if (!place) {
    return null
  }

  const parts: Array<string> = []
  for (const part of [
    pick(locale, place.venueEs, place.venueEn),
    pick(locale, place.cityEs, place.cityEn),
    pick(locale, place.countryEs, place.countryEn),
  ]) {
    if (!part) {
      continue
    }
    const seen = parts.some(
      (existing) => existing.toLocaleLowerCase() === part.toLocaleLowerCase()
    )
    if (!seen) {
      parts.push(part)
    }
  }

  return parts.length > 0 ? parts.join(", ") : null
}

export function formatLumaDate(event: LumaEvent, locale: Locale): string {
  return formatDay(new Date(event.startAt), event.timezone, locale)
}

export function formatLumaTime(event: LumaEvent, locale: Locale): string {
  const start = new Date(event.startAt)
  const startClock = formatClock(start, event.timezone, locale)
  if (!event.endAt) {
    return startClock
  }

  const end = new Date(event.endAt)
  const endClock = formatClock(end, event.timezone, locale)
  if (dayKey(start, event.timezone) === dayKey(end, event.timezone)) {
    return `${startClock} – ${endClock}`
  }

  return `${startClock} – ${formatDay(end, event.timezone, locale)}, ${endClock}`
}

export function formatLumaWhen(event: LumaEvent, locale: Locale): string {
  return `${formatLumaDate(event, locale)}, ${formatLumaTime(event, locale)}`
}

export function formatLumaMonth(event: LumaEvent, locale: Locale): string {
  const label = new Intl.DateTimeFormat(intlLocale[locale], {
    timeZone: event.timezone,
    month: "long",
    year: "numeric",
  }).format(new Date(event.startAt))
  return label.charAt(0).toLocaleUpperCase(intlLocale[locale]) + label.slice(1)
}

export function lumaMonthKey(event: LumaEvent): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: event.timezone,
    year: "numeric",
    month: "2-digit",
  }).format(new Date(event.startAt))
}

/** El Salvador clock. The events page follows this month, not the viewer's. */
const SITE_TIME_ZONE = "America/El_Salvador"

/**
 * Walter Morales's public Luma profile. The repo has no separate calendar URL.
 */
export const walterEventsCalendarUrl = "https://luma.com/user/wmoralesdev"

export function currentMonthKey(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
  }).format(now)
}

export function formatCurrentMonth(now: Date, locale: Locale): string {
  const label = new Intl.DateTimeFormat(intlLocale[locale], {
    timeZone: SITE_TIME_ZONE,
    month: "long",
    year: "numeric",
  }).format(now)
  return label.charAt(0).toLocaleUpperCase(intlLocale[locale]) + label.slice(1)
}

function splitEvents(
  events: ReadonlyArray<LumaEvent>,
  now: Date
): { upcoming: Array<LumaEvent>; past: Array<LumaEvent> } {
  const upcoming: Array<LumaEvent> = []
  const past: Array<LumaEvent> = []
  for (const event of events) {
    const boundary = new Date(event.endAt ?? event.startAt)
    if (boundary.getTime() >= now.getTime()) {
      upcoming.push(event)
    } else {
      past.push(event)
    }
  }
  upcoming.sort((a, b) => a.startAt.localeCompare(b.startAt))
  past.sort((a, b) => b.startAt.localeCompare(a.startAt))
  return { upcoming, past }
}

export function splitLumaEvents(now: Date): {
  upcoming: Array<LumaEvent>
  past: Array<LumaEvent>
} {
  return splitEvents(lumaEvents, now)
}

export function splitCurrentMonthEvents(now: Date): {
  upcoming: Array<LumaEvent>
  past: Array<LumaEvent>
} {
  const month = currentMonthKey(now)
  return splitEvents(
    lumaEvents.filter((event) => lumaMonthKey(event) === month),
    now
  )
}

export function groupPastLumaEvents(
  past: ReadonlyArray<LumaEvent>,
  locale: Locale
): Array<{ key: string; label: string; events: Array<LumaEvent> }> {
  const groups: Array<{
    key: string
    label: string
    events: Array<LumaEvent>
  }> = []
  for (const event of past) {
    const key = lumaMonthKey(event)
    const last = groups.at(-1)
    if (!last || last.key !== key) {
      groups.push({
        key,
        label: formatLumaMonth(event, locale),
        events: [event],
      })
    } else {
      last.events.push(event)
    }
  }
  return groups
}
