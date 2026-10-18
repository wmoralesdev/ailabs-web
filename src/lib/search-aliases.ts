/**
 * Search-shaped paths that 301 to a page that already exists.
 * An alias is not a document: sitemap, llms.txt, and hreflang stay on the destination.
 */

export const PUBLIC_PAGE_PATHS = [
  "/",
  "/consultoria-de-ia-el-salvador",
  "/community",
  "/campus-leader",
  "/aperture",
  "/events",
  "/events/modo-fundador",
  "/events/get-competitive-quick",
] as const

export type PublicPagePath = (typeof PUBLIC_PAGE_PATHS)[number]

const HOME = "/"
const CONSULTING = "/consultoria-de-ia-el-salvador"
const COMMUNITY = "/community"
const CAMPUS_LEADER = "/campus-leader"
const APERTURE = "/aperture"
const EVENTS = "/events"
const MODO_FUNDADOR = "/events/modo-fundador"
const GET_COMPETITIVE_QUICK = "/events/get-competitive-quick"

/**
 * One segment each, so the existing `/$locale` matcher can 301 before 404.
 * Slugs name what that destination page already says. No other countries.
 */
export const SEARCH_ALIASES: Readonly<Record<string, PublicPagePath>> = {
  // Consulting page. The canonical path is a document, not an alias.
  "/consultoria-ia-el-salvador": CONSULTING,
  "/consultoria-el-salvador": CONSULTING,
  "/agencia-ia-el-salvador": CONSULTING,
  "/agencia-de-inteligencia-artificial-el-salvador": CONSULTING,
  "/ai-consulting-el-salvador": CONSULTING,
  "/ai-agency-el-salvador": CONSULTING,

  // Home: the company in El Salvador, not a consulting-only query.
  "/ia-el-salvador": HOME,
  "/inteligencia-artificial-el-salvador": HOME,
  "/ai-el-salvador": HOME,

  // WhatsApp community in El Salvador.
  "/comunidad-ia-el-salvador": COMMUNITY,
  "/comunidad-de-ia-el-salvador": COMMUNITY,
  "/comunidad-whatsapp-el-salvador": COMMUNITY,
  "/ai-community-el-salvador": COMMUNITY,
  "/whatsapp-ai-community-el-salvador": COMMUNITY,

  // One campus leader per university in El Salvador.
  "/campus-leader-el-salvador": CAMPUS_LEADER,
  "/lider-campus-el-salvador": CAMPUS_LEADER,
  "/ai-campus-leader-el-salvador": CAMPUS_LEADER,

  // Aperture member directory. That page does not name a country.
  "/miembros-aperture": APERTURE,
  "/miembros-de-aperture": APERTURE,
  "/aperture-members": APERTURE,

  // Modo Fundador is the in-person workshop in San Salvador.
  "/modo-fundador": MODO_FUNDADOR,
  "/taller-modo-fundador": MODO_FUNDADOR,
  "/taller-fundadores-san-salvador": MODO_FUNDADOR,

  // The events index, not one workshop. Same 301 for every client.
  "/eventos": EVENTS,
  "/eventos-el-salvador": EVENTS,
  "/eventos-tech-el-salvador": EVENTS,
  "/eventos-de-ia-el-salvador": EVENTS,
  "/tech-events-el-salvador": EVENTS,
  "/ai-events-el-salvador": EVENTS,

  // Get Competitive Quick does not name a country or city.
  "/get-competitive-quick": GET_COMPETITIVE_QUICK,
  "/taller-get-competitive-quick": GET_COMPETITIVE_QUICK,
  "/taller-primer-empleo-tech": GET_COMPETITIVE_QUICK,
}

/** Lowercase path without a trailing slash. `/` stays `/`. */
export function normalizeAliasPath(pathname: string): string {
  const trimmed = pathname.trim()
  if (trimmed.length === 0) {
    return "/"
  }
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`
  const [pathOnly] = withSlash.split(/[?#]/, 1)
  const stripped = pathOnly.replace(/\/+$/, "")
  return (stripped.length === 0 ? "/" : stripped).toLowerCase()
}

/** Destination path when `pathname` is an alias. Otherwise null. */
export function searchAliasDestination(
  pathname: string
): PublicPagePath | null {
  return SEARCH_ALIASES[normalizeAliasPath(pathname)] ?? null
}

export function aliasRedirectHref(
  pathname: string,
  search = "",
  hash = ""
): string | null {
  const destination = searchAliasDestination(pathname)
  if (!destination) {
    return null
  }
  const query = search ? (search.startsWith("?") ? search : `?${search}`) : ""
  const fragment = hash ? (hash.startsWith("#") ? hash : `#${hash}`) : ""
  return `${destination}${query}${fragment}`
}
