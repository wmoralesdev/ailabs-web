import type { Locale, NavContent } from "@/content"
import type { InternalRoute } from "@/lib/locale-links"
import {
  hashFromHref,
  isInternalHref,
  routeForHref,
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
  to: InternalRoute | "/$locale"
  params: { locale: Locale }
}

type ChromeNavItem = ChromeNavSectionItem | ChromeNavRouteItem

type ChromeNavGroup = {
  key: string
  items: ReadonlyArray<ChromeNavItem>
}

function requireInternalRoute(
  href: string,
  field: string
): InternalRoute {
  if (!isInternalHref(href)) {
    throw new Error(`chrome.nav.${field}.href must be an internal route, got "${href}"`)
  }
  return routeForHref(href)
}

/**
 * Nav groups for the floating chrome bar.
 *
 * Home: pillars | contact | community | campus leaders
 * Other: home | contact | community | campus leaders
 *
 * Theme/locale controls sit after these groups in the shell.
 */
function getChromeNavGroups(
  locale: Locale,
  nav: NavContent,
  { onHome }: { onHome: boolean }
): ReadonlyArray<ChromeNavGroup> {
  const contactItem: ChromeNavItem = {
    key: "contact",
    label: nav.contact.label,
    kind: "section",
    href: nav.contact.href,
    hash: hashFromHref(nav.contact.href),
  }

  const communityItem: ChromeNavItem = {
    key: "community",
    label: nav.community.label,
    kind: "route",
    to: requireInternalRoute(nav.community.href, "community"),
    params: { locale },
  }

  const campusLeaderItem: ChromeNavItem = {
    key: "campus-leader",
    label: nav.campusLeader.label,
    kind: "route",
    to: requireInternalRoute(nav.campusLeader.href, "campusLeader"),
    params: { locale },
  }

  const trailingGroups: ChromeNavGroup[] = [
    { key: "contact", items: [contactItem] },
    { key: "community", items: [communityItem] },
    { key: "campus-leader", items: [campusLeaderItem] },
  ]

  if (onHome) {
    return [
      {
        key: "pillars",
        items: nav.pillars.map((pillar) => ({
          key: pillar.id,
          label: pillar.label,
          kind: "section" as const,
          href: pillar.href,
          hash: hashFromHref(pillar.href),
        })),
      },
      ...trailingGroups,
    ]
  }

  return [
    {
      key: "home",
      items: [
        {
          key: "home",
          label: nav.home.label,
          kind: "route",
          to: "/$locale",
          params: { locale },
        },
      ],
    },
    ...trailingGroups,
  ]
}

export { getChromeNavGroups }
export type { ChromeNavGroup, ChromeNavItem, ChromeNavRouteItem, ChromeNavSectionItem }
