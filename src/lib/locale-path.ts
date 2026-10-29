import type { Locale } from "@/content"

/** English documents live under this prefix. Spanish stays unprefixed. */
export const ENGLISH_PREFIX = "/en"

export function isEnglishPath(pathname: string): boolean {
  return (
    pathname === ENGLISH_PREFIX || pathname.startsWith(`${ENGLISH_PREFIX}/`)
  )
}

/** Locale from the URL only. Unprefixed paths are Spanish, including crawlers. */
export function localeFromPathname(pathname: string): Locale {
  return isEnglishPath(pathname) ? "en" : "es"
}

/** Path without the English prefix. `/en` and `/en/` become `/`. */
export function stripLocalePrefix(pathname: string): string {
  if (pathname === ENGLISH_PREFIX || pathname === `${ENGLISH_PREFIX}/`) {
    return "/"
  }
  if (pathname.startsWith(`${ENGLISH_PREFIX}/`)) {
    const rest = pathname.slice(ENGLISH_PREFIX.length)
    return rest.length > 0 ? rest : "/"
  }
  return pathname.length > 0 ? pathname : "/"
}

function normalizeSitePath(path = ""): string {
  if (!path || path === "/") {
    return "/"
  }
  return path.startsWith("/") ? path : `/${path}`
}

/** Public page path for one language. Assets and hashes are not prefixed. */
export function localizedPath(locale: Locale, path = ""): string {
  const normalized = normalizeSitePath(path)
  if (locale !== "en") {
    return normalized
  }
  return normalized === "/" ? ENGLISH_PREFIX : `${ENGLISH_PREFIX}${normalized}`
}

export function alternatePath(pathname: string): {
  locale: Locale
  path: string
} {
  const current = localeFromPathname(pathname)
  const locale = current === "en" ? "es" : "en"
  return { locale, path: localizedPath(locale, stripLocalePrefix(pathname)) }
}
