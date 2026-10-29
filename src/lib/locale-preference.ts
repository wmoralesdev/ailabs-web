import { createIsomorphicFn, createServerFn } from "@tanstack/react-start"
import { setCookie } from "@tanstack/react-start/server"

import { getContent, isLocale } from "@/content"
import type { Locale, SiteContent } from "@/content"
import { localeFromPathname } from "@/lib/locale-path"

export const LOCALE_COOKIE = "ailabs-locale"

const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

export type LocaleContext = {
  locale: Locale
  content: SiteContent
}

function writeLocaleCookie(locale: Locale): void {
  setCookie(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: LOCALE_COOKIE_MAX_AGE,
    sameSite: "lax",
  })
}

/**
 * Document locale comes from the URL: `/en` and `/en/…` are English,
 * everything else is Spanish. Cookie and Accept-Language do not change what
 * a crawler receives on an unprefixed path.
 *
 * `createIsomorphicFn` keeps client navigations off a server round trip; the
 * pathname is available on both sides.
 */
const resolveLocale = createIsomorphicFn()
  .server((pathname: string): Locale => localeFromPathname(pathname))
  .client((pathname: string): Locale => localeFromPathname(pathname))

export function resolveLocaleContext(pathname: string): LocaleContext {
  const locale = resolveLocale(pathname)
  return { locale, content: getContent(locale) }
}

export const setLocalePreference = createServerFn({ method: "POST" })
  .validator((data: { locale: string }) => {
    if (!isLocale(data.locale)) {
      throw new Error(`Invalid locale: ${data.locale}`)
    }
    return { locale: data.locale }
  })
  .handler(async ({ data }): Promise<LocaleContext> => {
    writeLocaleCookie(data.locale)
    return { locale: data.locale, content: getContent(data.locale) }
  })

/** Used by `/es/*` redirects so bookmarks keep a Spanish preference. */
export const rememberLocaleFromPrefix = createServerFn({ method: "POST" })
  .validator((data: { locale: string }) => {
    if (!isLocale(data.locale)) {
      throw new Error(`Invalid locale: ${data.locale}`)
    }
    return { locale: data.locale }
  })
  .handler(async ({ data }): Promise<{ locale: Locale }> => {
    writeLocaleCookie(data.locale)
    return { locale: data.locale }
  })
