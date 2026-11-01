import {
  localeFromPathname,
  localizedPath,
  stripLocalePrefix,
} from "@/lib/locale-path"

/**
 * Search-shaped paths that 301 to a page that already exists.
 * An alias is not a document: sitemap, llms.txt, and hreflang stay on the destination.
 * `/en/…` aliases keep the English prefix on the destination.
 */

export const PUBLIC_PAGE_PATHS = [
  "/",
  "/consultoria-de-ia-el-salvador",
  "/events",
  "/capacitacion-ia-el-salvador",
  "/automatizacion-ia-el-salvador",
  "/agendar",
] as const

export type PublicPagePath = (typeof PUBLIC_PAGE_PATHS)[number]

const HOME = "/"
const CONSULTING = "/consultoria-de-ia-el-salvador"
const EVENTS = "/events"
const TRAINING = "/capacitacion-ia-el-salvador"
const AUTOMATION = "/automatizacion-ia-el-salvador"

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
  "/consultor-ia-el-salvador": CONSULTING,

  // Home: the company in El Salvador, not a consulting-only query.
  "/ia-el-salvador": HOME,
  "/inteligencia-artificial-el-salvador": HOME,
  "/ai-el-salvador": HOME,

  // Training page (Academy).
  "/capacitacion-de-ia-el-salvador": TRAINING,
  "/curso-ia-el-salvador": TRAINING,
  "/cursos-ia-el-salvador": TRAINING,
  "/ai-training-el-salvador": TRAINING,

  // Automation page (Agentic).
  "/automatizacion-de-procesos-el-salvador": AUTOMATION,
  "/automatizacion-con-ia-el-salvador": AUTOMATION,
  "/ai-automation-el-salvador": AUTOMATION,

  // The retired WhatsApp community page now lands on the events index.
  "/comunidad-ia-el-salvador": EVENTS,
  "/comunidad-de-ia-el-salvador": EVENTS,
  "/comunidad-whatsapp-el-salvador": EVENTS,
  "/ai-community-el-salvador": EVENTS,
  "/whatsapp-ai-community-el-salvador": EVENTS,

  // The retired Campus Leader program.
  "/campus-leader-el-salvador": EVENTS,
  "/lider-campus-el-salvador": EVENTS,
  "/ai-campus-leader-el-salvador": EVENTS,

  // Searches for the retired Aperture member directory.
  "/miembros-aperture": EVENTS,
  "/miembros-de-aperture": EVENTS,
  "/aperture-members": EVENTS,

  // Retired workshop microsites: Modo Fundador and Get Competitive Quick.
  "/modo-fundador": EVENTS,
  "/taller-modo-fundador": EVENTS,
  "/taller-fundadores-san-salvador": EVENTS,
  "/get-competitive-quick": EVENTS,
  "/taller-get-competitive-quick": EVENTS,
  "/taller-primer-empleo-tech": EVENTS,

  // The events index, not one workshop. Same 301 for every client.
  "/eventos": EVENTS,
  "/eventos-el-salvador": EVENTS,
  "/eventos-tech-el-salvador": EVENTS,
  "/eventos-de-ia-el-salvador": EVENTS,
  "/tech-events-el-salvador": EVENTS,
  "/ai-events-el-salvador": EVENTS,
}

/**
 * Pages that no longer exist. Community pages (the WhatsApp landing, the
 * Campus Leader application, the Aperture directory, join flow, dashboard and
 * `/u/` profiles) and the two workshop microsites 301 to the events index.
 * The credit redemption and sign-in flows 301 home.
 */
const RETIRED_TO_EVENTS = new Set([
  "/community",
  "/campus-leader",
  "/aperture",
  "/aperture/join",
  "/me",
  "/events/modo-fundador",
  "/events/get-competitive-quick",
])
const RETIRED_TO_HOME = new Set(["/redeem", "/sign-in", "/sign-up"])

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

function underAny(path: string, prefixes: Iterable<string>): boolean {
  for (const prefix of prefixes) {
    if (path === prefix || path.startsWith(`${prefix}/`)) {
      return true
    }
  }
  return false
}

/** Destination path when `pathname` is an alias. Otherwise null. */
export function searchAliasDestination(
  pathname: string
): PublicPagePath | null {
  const path = normalizeAliasPath(pathname)
  if (underAny(path, RETIRED_TO_EVENTS) || path.startsWith("/u/")) {
    return EVENTS
  }
  if (underAny(path, RETIRED_TO_HOME)) {
    return HOME
  }
  return SEARCH_ALIASES[path] ?? null
}

export function aliasRedirectHref(
  pathname: string,
  search = "",
  hash = ""
): string | null {
  const locale = localeFromPathname(pathname)
  const destination = searchAliasDestination(stripLocalePrefix(pathname))
  if (!destination) {
    return null
  }
  const localized = localizedPath(locale, destination)
  const query = search ? (search.startsWith("?") ? search : `?${search}`) : ""
  const fragment = hash ? (hash.startsWith("#") ? hash : `#${hash}`) : ""
  return `${localized}${query}${fragment}`
}
