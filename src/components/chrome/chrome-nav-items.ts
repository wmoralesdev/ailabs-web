import type { NavContent } from "@/content"
import { hashFromHref, isInternalHref, routeForHref } from "@/lib/locale-links"

/** One services destination and one community group, shared by both menus. */
export function getChromeNavItems(nav: NavContent) {
  return {
    services: { ...nav.services, hash: hashFromHref(nav.services.href) },
    community: {
      label: nav.community.label,
      items: nav.community.items.map((item) => {
        if (!isInternalHref(item.href)) {
          throw new Error(
            "Community navigation must point to an internal route"
          )
        }
        return { ...item, to: routeForHref(item.href) }
      }),
    },
    contact: nav.contact,
  }
}
