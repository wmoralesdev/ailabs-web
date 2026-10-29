import type { Locale } from "@/content"
import { localizedPath } from "@/lib/locale-path"

/**
 * Content modules store locale-agnostic path hrefs ("/community") or home
 * section hashes ("#academy"). Path hrefs map to route paths; English adds `/en`.
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

function routeForHref(href: InternalHref, locale: Locale = "es"): string {
  return localizedPath(locale, INTERNAL_ROUTES[href])
}

function homePath(locale: Locale): string {
  return localizedPath(locale, "/")
}

export {
  hashFromHref,
  homePath,
  isHashHref,
  isInternalHref,
  routeForHref,
}
export type { InternalHref, InternalRoute }
