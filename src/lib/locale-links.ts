/**
 * Content modules store locale-agnostic path hrefs ("/community") or home
 * section hashes ("#academy"). Path hrefs map to route ids (no locale segment).
 */
const INTERNAL_ROUTES = {
  "/community": "/community",
  "/campus-leader": "/campus-leader",
  "/aperture": "/aperture",
  "/aperture/join": "/aperture/join",
  "/me": "/me",
  "/terms": "/terms",
  "/privacy": "/privacy",
  "/consultoria-de-ia": "/consultoria-de-ia",
  "/capacitacion-ia": "/capacitacion-ia",
  "/automatizacion-con-ia": "/automatizacion-con-ia",
  "/eventos": "/eventos",
  "/enlaces": "/enlaces",
  "/comunidad-de-ia-el-salvador": "/comunidad-de-ia-el-salvador",
  "/comunidad-de-ia-centroamerica": "/comunidad-de-ia-centroamerica",
  "/eventos-tech-centroamerica": "/eventos-tech-centroamerica",
  "/consultoria-de-ia-centroamerica": "/consultoria-de-ia-centroamerica",
  "/ai-consulting-el-salvador": "/ai-consulting-el-salvador",
  "/ai-training-el-salvador": "/ai-training-el-salvador",
  "/ai-automation-el-salvador": "/ai-automation-el-salvador",
  "/tech-events-el-salvador": "/tech-events-el-salvador",
  "/ai-community-el-salvador": "/ai-community-el-salvador",
  "/ai-community-central-america": "/ai-community-central-america",
  "/tech-events-central-america": "/tech-events-central-america",
  "/ai-consulting-central-america": "/ai-consulting-central-america",
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
