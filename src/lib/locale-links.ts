/**
 * Content modules store locale-agnostic path hrefs ("/community") or home
 * section hashes ("#academy"). Path hrefs map to route ids (no locale segment).
 */
const INTERNAL_ROUTES = {
  "/consultoria-de-ia-el-salvador": "/consultoria-de-ia-el-salvador",
  "/community": "/community",
  "/campus-leader": "/campus-leader",
  "/events": "/events",
  "/terms": "/terms",
  "/privacy": "/privacy",
  "/capacitacion-ia-el-salvador": "/capacitacion-ia-el-salvador",
  "/automatizacion-ia-el-salvador": "/automatizacion-ia-el-salvador",
} as const

type InternalHref = keyof typeof INTERNAL_ROUTES

type InternalRoute = (typeof INTERNAL_ROUTES)[InternalHref]

function isInternalHref(href: string): href is InternalHref {
  return href in INTERNAL_ROUTES
}

function isHashHref(href: string): boolean {
  return href.startsWith("#")
}

function hashFromHref(href: string): string {
  return href.startsWith("#") ? href.slice(1) : href
}

function routeForHref(href: InternalHref): InternalRoute {
  return INTERNAL_ROUTES[href]
}

export { hashFromHref, isHashHref, isInternalHref, routeForHref }
export type { InternalHref, InternalRoute }
