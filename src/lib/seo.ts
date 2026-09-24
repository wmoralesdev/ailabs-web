import type { Locale } from "@/content"
import { LOCALES } from "@/content"

export const SITE_URL = "https://ailabs.sv"
export const SITE_NAME = "Ai Labs"
export const OG_IMAGE_PATH = "/og-image.png"
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`
export const OG_IMAGE_ALT =
  "Ai Labs: AI consulting, business automation and practical education."

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_SV",
}

/** Normalize a site path (no locale prefix). */
export function sitePath(path = ""): string {
  if (path === "/" || path === "") {
    return ""
  }
  return path.startsWith("/") ? path : `/${path}`
}

/**
 * @deprecated Locale is cookie-based; paths no longer include `/en` or `/es`.
 * Kept as an alias of `sitePath` for call-site compatibility.
 */
export function localizedPath(_locale: Locale, path = ""): string {
  return sitePath(path)
}

export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${sitePath(path)}`
}

type BuildPageMetaInput = {
  locale: Locale
  path?: string
  title: string
  description: string
  /** Private, unfinished, or thin pages stay out of search results. */
  noindex?: boolean
  image?: {
    url: string
    alt: string
  }
}

type HeadMeta = {
  title?: string
  name?: string
  property?: string
  content?: string
  charSet?: string
}

type HeadLink = {
  rel: string
  href: string
  hrefLang?: string
  type?: string
  sizes?: string
}

type HeadScript = {
  type: string
  children: string
}

export type PageHead = {
  meta: HeadMeta[]
  links: HeadLink[]
  scripts: HeadScript[]
}

export function buildPageMeta({
  locale,
  path = "",
  title,
  description,
  noindex = false,
  image,
}: BuildPageMetaInput): PageHead {
  const url = absoluteUrl(path)
  const alternateLocale = locale === "en" ? "es" : "en"
  const imageUrl = image?.url ?? OG_IMAGE_URL
  const imageAlt = image?.alt ?? OG_IMAGE_ALT

  return {
    meta: [
      { title },
      { name: "description", content: description },
      ...(noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:locale", content: OG_LOCALE[locale] },
      {
        property: "og:locale:alternate",
        content: OG_LOCALE[alternateLocale],
      },
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: imageAlt },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [
      { rel: "canonical", href: url },
      ...LOCALES.map((lang) => ({
        rel: "alternate",
        href: url,
        hrefLang: lang,
      })),
      {
        rel: "alternate",
        href: url,
        hrefLang: "x-default",
      },
    ],
    scripts: [],
  }
}

type JsonLdService = {
  name: string
  description: string
}

export function buildHomeJsonLd(input: {
  locale: Locale
  title: string
  description: string
  services: readonly [JsonLdService, JsonLdService, JsonLdService]
}): HeadScript {
  const url = absoluteUrl()
  const graph = [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/ailabs-ico.svg`,
      },
      description: input.description,
      areaServed: {
        "@type": "Country",
        name: "El Salvador",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "SV",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: input.description,
      publisher: { "@id": `${SITE_URL}/#organization` },
      inLanguage: LOCALES,
      potentialAction: {
        "@type": "ReadAction",
        target: url,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${url === SITE_URL ? `${SITE_URL}/` : url}#webpage`,
      url,
      name: input.title,
      description: input.description,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      inLanguage: input.locale,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE_URL,
      },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${SITE_URL}/#offer-catalog`,
      name: "Ai Labs services",
      itemListElement: input.services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": `${SITE_URL}/#organization` },
          areaServed: {
            "@type": "Country",
            name: "El Salvador",
          },
        },
      })),
    },
  ]

  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph,
    }),
  }
}
