import type { LandingMeta, Locale } from "@/content"

/** Host that returns 200. The apex 308s here. */
export const SITE_URL = "https://www.ailabs.sv"
export const SITE_NAME = "Ai Labs"
export const OG_IMAGE_PATH = "/og-image.png"
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`

/**
 * Profiles the site already publishes. TikTok is included because the footer
 * treats it as an official profile.
 */
export const ORGANIZATION_SAME_AS = [
  "https://www.linkedin.com/company/ai-labs-sv",
  "https://x.com/ailabs_sv",
  "https://www.instagram.com/ailabs_sv/",
  "https://www.tiktok.com/@ailabs_sv",
] as const

const OG_IMAGE_ALT_BY_LOCALE: Record<Locale, string> = {
  en: "Ai Labs: AI consulting, business automation and practical education.",
  es: "Ai Labs: consultoría en IA, automatización y formación práctica.",
}

/** Fallback alt for the document shell. Crawlers without a language get Spanish. */
export const OG_IMAGE_ALT = OG_IMAGE_ALT_BY_LOCALE.es

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
  const normalized = sitePath(path)
  return normalized ? `${SITE_URL}${normalized}` : `${SITE_URL}/`
}

type BuildPageMetaInput = {
  locale: Locale
  path?: string
  title: string
  description: string
  /** Private, unfinished, or thin pages stay out of search results. */
  noindex?: boolean
  /**
   * Emit hreflang only when both languages have their own 200 URL.
   * `es` is x-default.
   */
  alternates?: { es: string; en: string }
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
  alternates,
  image,
}: BuildPageMetaInput): PageHead {
  const url = absoluteUrl(path)
  const imageUrl = image?.url ?? OG_IMAGE_URL
  const imageAlt = image?.alt ?? OG_IMAGE_ALT_BY_LOCALE[locale]
  const otherLocale = locale === "es" ? "en" : "es"
  const alternateLinks: HeadLink[] = alternates
    ? [
        {
          rel: "alternate",
          hrefLang: "es",
          href: absoluteUrl(alternates.es),
        },
        {
          rel: "alternate",
          hrefLang: "en",
          href: absoluteUrl(alternates.en),
        },
        {
          rel: "alternate",
          hrefLang: "x-default",
          href: absoluteUrl(alternates.es),
        },
      ]
    : []

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
      ...(alternates
        ? [
            {
              property: "og:locale:alternate",
              content: OG_LOCALE[otherLocale],
            },
          ]
        : []),
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
    links: [{ rel: "canonical", href: url }, ...alternateLinks],
    scripts: [],
  }
}

const DEVDAY_EVENT = {
  "@type": "Event",
  name: "DevDay. San Salvador",
  startDate: "2026-10-24T15:00:00-06:00",
  endDate: "2026-10-24T19:00:00-06:00",
  eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
  eventStatus: "https://schema.org/EventScheduled",
  inLanguage: "es",
  url: "https://devday.ailabs.sv/",
  location: {
    "@type": "Place",
    name: "BINAES",
    address: {
      "@type": "PostalAddress",
      addressLocality: "San Salvador",
      addressCountry: "SV",
    },
  },
  organizer: { "@id": `${SITE_URL}/#organization` },
} as const

/** JSON-LD for one language-locked landing page. Does not redefine the homepage area. */
export function buildLandingJsonLd(input: {
  locale: Locale
  page: LandingMeta
}): HeadScript {
  const url = absoluteUrl(input.page.path)
  const organizationId = `${SITE_URL}/#organization`
  const areaServed = {
    "@type": input.page.areaType,
    name: input.page.areaName,
  }
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: input.page.metaTitle,
      description: input.page.metaDescription,
      inLanguage: input.locale,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": organizationId },
      spatialCoverage: areaServed,
    },
  ]

  if (input.page.kind === "service") {
    graph.push({
      "@type": "Service",
      name: input.page.schemaName,
      description: input.page.metaDescription,
      url,
      provider: { "@id": organizationId },
      areaServed,
    })
  }

  if (input.page.kind === "event") {
    graph.push({ ...DEVDAY_EVENT })
  }

  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": graph,
    }),
  }
}

type JsonLdService = {
  name: string
  description: string
  path?: string
}

export function buildHomeJsonLd(input: {
  locale: Locale
  title: string
  description: string
  services: readonly [JsonLdService, JsonLdService, JsonLdService]
}): HeadScript {
  const url = absoluteUrl()
  const organizationId = `${url}#organization`
  const graph = [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: SITE_NAME,
      url,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/ailabs-ico.svg`,
      },
      description: input.description,
      sameAs: [...ORGANIZATION_SAME_AS],
      areaServed: {
        "@type": "Country",
        name: "El Salvador",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "San Salvador",
        addressCountry: "SV",
      },
    },
    {
      "@type": "WebSite",
      "@id": `${url}#website`,
      url,
      name: SITE_NAME,
      description: input.description,
      publisher: { "@id": organizationId },
      inLanguage: input.locale,
      potentialAction: {
        "@type": "ReadAction",
        target: url,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: input.title,
      description: input.description,
      isPartOf: { "@id": `${url}#website` },
      about: { "@id": organizationId },
      inLanguage: input.locale,
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: OG_IMAGE_URL,
      },
    },
    {
      "@type": "OfferCatalog",
      "@id": `${url}#offer-catalog`,
      name: "Ai Labs services",
      itemListElement: input.services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          ...(service.path ? { url: absoluteUrl(service.path) } : {}),
          provider: { "@id": organizationId },
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
