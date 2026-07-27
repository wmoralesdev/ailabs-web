import type { Locale, NavContent } from "@/content"
import {
  hashFromHref,
  isInternalHref,
  routeForHref,
  type InternalRoute,
} from "@/lib/locale-links"

type ChromeNavSectionItem = {
  key: string
  label: string
  kind: "section"
  /** Hash href as stored in content (e.g. `#academy`). */
  href: string
  /** Hash without `#` for TanStack Router `hash` props. */
  hash: string
}

type ChromeNavRouteItem = {
  key: string
  label: string
  kind: "route"
  to: InternalRoute
  params: { locale: Locale }
}

type ChromeNavItem = ChromeNavSectionItem | ChromeNavRouteItem

/**
 * Normalized pillars + community links from `chrome.nav`.
 * Shells map items and supply their own classNames / link primitives.
 */
function getChromeNavItems(
  locale: Locale,
  nav: Pick<NavContent, "pillars" | "community">
): ReadonlyArray<ChromeNavItem> {
  const pillars: ChromeNavItem[] = nav.pillars.map((pillar) => ({
    key: pillar.id,
    label: pillar.label,
    kind: "section",
    href: pillar.href,
    hash: hashFromHref(pillar.href),
  }))

  const communityHref = nav.community.href
  if (!isInternalHref(communityHref)) {
    throw new Error(
      `chrome.nav.community.href must be an internal route, got "${communityHref}"`
    )
  }

  return [
    ...pillars,
    {
      key: "community",
      label: nav.community.label,
      kind: "route",
      to: routeForHref(communityHref),
      params: { locale },
    },
  ]
}

export { getChromeNavItems }
export type { ChromeNavItem, ChromeNavRouteItem, ChromeNavSectionItem }
