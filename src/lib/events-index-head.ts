import type { EventsIndexContent, Locale } from "@/content/types"
import type { LumaEvent } from "@/content/luma-events"
import {
  lumaPlaceFields,
  splitCurrentMonthEvents,
} from "@/content/luma-event-format"
import type { PageHead } from "@/lib/seo"
import {
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  buildPageMeta,
} from "@/lib/seo"

const EVENTS_PATH = "/events"

function isoInTimeZone(isoUtc: string, timeZone: string): string {
  const date = new Date(isoUtc)
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date)
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "00"
  const year = Number(value("year"))
  const month = Number(value("month"))
  const day = Number(value("day"))
  const hour = Number(value("hour"))
  const minute = Number(value("minute"))
  const second = Number(value("second"))
  const localAsUtc = Date.UTC(year, month - 1, day, hour, minute, second)
  const offsetMinutes = Math.round((localAsUtc - date.getTime()) / 60000)
  const sign = offsetMinutes >= 0 ? "+" : "-"
  const absolute = Math.abs(offsetMinutes)
  const offsetHour = String(Math.floor(absolute / 60)).padStart(2, "0")
  const offsetMinute = String(absolute % 60).padStart(2, "0")

  return `${value("year")}-${value("month")}-${value("day")}T${value("hour")}:${value("minute")}:${value("second")}${sign}${offsetHour}:${offsetMinute}`
}

function eventLocation(event: LumaEvent, locale: Locale) {
  const fields = lumaPlaceFields(event, locale)
  if (!fields) {
    return undefined
  }

  const address: Record<string, string> = { "@type": "PostalAddress" }
  if (fields.city) {
    address.addressLocality = fields.city
  }
  if (fields.country) {
    address.addressCountry = fields.country
  }

  const name =
    fields.venue ?? [fields.city, fields.country].filter(Boolean).join(", ")

  return {
    "@type": "Place",
    name,
    ...(fields.city || fields.country ? { address } : {}),
  }
}

function eventNode(event: LumaEvent, locale: Locale) {
  const location = eventLocation(event, locale)

  return {
    "@type": "Event",
    name: event.name,
    startDate: isoInTimeZone(event.startAt, event.timezone),
    ...(event.endAt
      ? { endDate: isoInTimeZone(event.endAt, event.timezone) }
      : {}),
    timezone: event.timezone,
    ...(location ? { location } : {}),
    organizer: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    url: event.href,
  }
}

/**
 * Head for `/events`: the visible title, a description that names the
 * published base, and JSON-LD for the events this page actually lists.
 */
export function buildEventsIndexHead(input: {
  locale: Locale
  events: EventsIndexContent
  now: Date
}): PageHead {
  const { locale, events, now } = input
  const photo = events.photos.at(0)
  const page = buildPageMeta({
    locale,
    path: EVENTS_PATH,
    title: events.metaTitle,
    description: events.metaDescription,
    image: photo
      ? {
          url: absoluteUrl(photo.src),
          alt: photo.alt,
          width: photo.width,
          height: photo.height,
        }
      : undefined,
  })
  const listed = splitCurrentMonthEvents(now)
  const rendered = [...listed.upcoming, ...listed.past]
  const pageUrl = absoluteUrl(EVENTS_PATH)

  return {
    ...page,
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: events.breadcrumbHome,
                  item: absoluteUrl("/"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: events.label,
                  item: pageUrl,
                },
              ],
            },
            {
              "@type": "ItemList",
              name: events.headline,
              description: events.intro,
              url: pageUrl,
              numberOfItems: rendered.length,
              inLanguage: locale,
              areaServed: {
                "@type": "Country",
                name: "El Salvador",
              },
              itemListElement: rendered.map((event, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: eventNode(event, locale),
              })),
            },
          ],
        }),
      },
    ],
  }
}
