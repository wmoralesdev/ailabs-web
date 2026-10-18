/**
 * Search-shaped paths that 301 to a page that already exists.
 * An alias is not a document: sitemap, llms.txt, and hreflang stay on the destination.
 */

export const PUBLIC_PAGE_PATHS = [
  "/",
  "/community",
  "/campus-leader",
  "/aperture",
  "/events/modo-fundador",
  "/events/get-competitive-quick",
  "/consultoria-ia-el-salvador",
  "/capacitacion-ia-el-salvador",
  "/automatizacion-ia-el-salvador",
] as const

export type PublicPagePath = (typeof PUBLIC_PAGE_PATHS)[number]

const HOME = "/"
const COMMUNITY = "/community"
const CAMPUS_LEADER = "/campus-leader"
const APERTURE = "/aperture"
const MODO_FUNDADOR = "/events/modo-fundador"
const GET_COMPETITIVE_QUICK = "/events/get-competitive-quick"
const CONSULTING = "/consultoria-ia-el-salvador"
const TRAINING = "/capacitacion-ia-el-salvador"
const AUTOMATION = "/automatizacion-ia-el-salvador"

/**
 * One segment each, so the existing `/$locale` matcher can 301 before 404.
 * Slugs name what that destination page already says. No other countries.
 */
export const SEARCH_ALIASES: Readonly<Record<string, PublicPagePath>> = {
  // Home: the company in El Salvador.
  "/agencia-ia-el-salvador": HOME,
  "/agencia-de-inteligencia-artificial-el-salvador": HOME,
  "/ia-el-salvador": HOME,
  "/inteligencia-artificial-el-salvador": HOME,
  "/ai-agency-el-salvador": HOME,
  "/ai-el-salvador": HOME,

  // Consulting page.
  "/consultoria-de-ia-el-salvador": CONSULTING,
  "/consultoria-el-salvador": CONSULTING,
  "/consultor-ia-el-salvador": CONSULTING,
  "/ai-consulting-el-salvador": CONSULTING,

  // Training page (Academy).
  "/capacitacion-de-ia-el-salvador": TRAINING,
  "/curso-ia-el-salvador": TRAINING,
  "/cursos-ia-el-salvador": TRAINING,
  "/ai-training-el-salvador": TRAINING,

  // Automation page (Agentic).
  "/automatizacion-de-procesos-el-salvador": AUTOMATION,
  "/automatizacion-con-ia-el-salvador": AUTOMATION,
  "/ai-automation-el-salvador": AUTOMATION,

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
  "/eventos-tech-el-salvador": MODO_FUNDADOR,
  "/tech-events-el-salvador": MODO_FUNDADOR,

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
