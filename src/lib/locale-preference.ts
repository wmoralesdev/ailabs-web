import { createIsomorphicFn, createServerFn } from "@tanstack/react-start"
import {
  getCookie,
  getRequestHeader,
  setCookie,
} from "@tanstack/react-start/server"

import { getContent, isLocale, localeFromAcceptLanguage } from "@/content"
import type { Locale, SiteContent } from "@/content"

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

function readDocumentLocaleCookie(): string | undefined {
  const prefix = `${LOCALE_COOKIE}=`
  return document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix))
    ?.slice(prefix.length)
}

/**
 * Resolve UI locale: cookie → Accept-Language → `es`.
 * The server persists the resolved locale when the cookie was missing. The
 * browser reads the same cookie locally, so client navigations never wait on
 * a server round trip; the language toggle writes the cookie, then invalidates.
 */
const resolveLocale = createIsomorphicFn()
  .server((): Locale => {
    const cookieValue = getCookie(LOCALE_COOKIE)
    if (typeof cookieValue === "string" && isLocale(cookieValue)) {
      return cookieValue
    }
    const locale = localeFromAcceptLanguage(getRequestHeader("accept-language"))
    writeLocaleCookie(locale)
    return locale
  })
  .client((): Locale => {
    const cookieValue = readDocumentLocaleCookie()
    if (cookieValue && isLocale(cookieValue)) {
      return cookieValue
    }
    return localeFromAcceptLanguage(navigator.languages.join(","))
  })

export function resolveLocaleContext(): LocaleContext {
  const locale = resolveLocale()
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

/** Used by legacy `/en/*` and `/es/*` redirects so bookmarks keep language. */
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
