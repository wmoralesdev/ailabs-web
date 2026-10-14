import { getContent } from "@/content"
import type { LandingMeta, Locale } from "@/content"

import { alternatesFor } from "@/lib/language-pairs"
import { buildLandingJsonLd, buildPageMeta } from "@/lib/seo"

/** Force a landing URL to one language, ignoring the cookie and Accept-Language. */
export function lockedLocale(locale: Locale) {
  return { locale, content: getContent(locale) }
}

export function landingHead(locale: Locale, page: LandingMeta) {
  const head = buildPageMeta({
    locale,
    path: page.path,
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: alternatesFor(page.path),
  })

  return {
    meta: head.meta,
    links: head.links,
    scripts: [buildLandingJsonLd({ locale, page })],
  }
}
