import type { Locale, NavContent } from "@/content"
import { hashFromHref, isInternalHref, routeForHref } from "@/lib/locale-links"

function internalRoute(href: string, locale: Locale, name: string): string {
  if (!isInternalHref(href)) {
    throw new Error(`${name} navigation must point to an internal route`)
  }
  return routeForHref(href, locale)
}

/** One services destination, the events link and the booking CTA, shared by both menus. */
export function getChromeNavItems(nav: NavContent, locale: Locale) {
  return {
    services: { ...nav.services, hash: hashFromHref(nav.services.href) },
    events: {
      ...nav.events,
      to: internalRoute(nav.events.href, locale, "Events"),
    },
    contact: {
      ...nav.contact,
      to: internalRoute(nav.contact.href, locale, "Contact"),
    },
  }
}
