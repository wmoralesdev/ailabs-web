import type { Locale, NavContent } from "@/content"
import { isInternalHref, routeForHref } from "@/lib/locale-links"

function internalRoute(href: string, locale: Locale, name: string): string {
  if (!isInternalHref(href)) {
    throw new Error(`${name} navigation must point to an internal route`)
  }
  return routeForHref(href, locale)
}

/** The services menu, the events link and the booking CTA, shared by both menus. */
export function getChromeNavItems(nav: NavContent, locale: Locale) {
  return {
    services: {
      label: nav.services.label,
      items: nav.services.items.map((item) => ({
        ...item,
        to: internalRoute(item.href, locale, "Services"),
      })),
    },
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
