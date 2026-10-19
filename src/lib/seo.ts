import type { Locale } from "@/content"

/** Host that returns the public site. Canonical URLs use www. */
export const SITE_URL = "https://www.ailabs.sv"
export const SITE_NAME = "Ai Labs"
export const OG_IMAGE_PATH = "/og-image.png"
export const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`

/** Profiles the footer already publishes. */
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
  image?: {
    url: string
    alt: string
    width?: number
    height?: number
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

export type FaqItem = {
  question: string
  answer: string
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
  const imageUrl = image?.url ?? OG_IMAGE_URL
  const imageAlt = image?.alt ?? OG_IMAGE_ALT_BY_LOCALE[locale]

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
      { property: "og:image", content: imageUrl },
      { property: "og:image:alt", content: imageAlt },
      {
        property: "og:image:width",
        content: String(image?.width ?? 1200),
      },
      {
        property: "og:image:height",
        content: String(image?.height ?? 630),
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: imageUrl },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [],
  }
}

export function buildFaqJsonLd(items: readonly FaqItem[]): HeadScript {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    }),
  }
}

/**
 * Event for a dated, in-person workshop in San Salvador. Returns null while the
 * date is TBD: search engines reject an Event without `startDate`.
 */
export function buildWorkshopEventJsonLd(input: {
  locale: Locale
  path: string
  name: string
  description: string
  endsOn: string | null
  priceCents: number
  currency: string
  soldOut: boolean
}): HeadScript | null {
  if (!input.endsOn) {
    return null
  }
  const url = absoluteUrl(input.path)
  const organizationId = `${absoluteUrl()}#organization`

  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "EducationEvent",
      name: input.name,
      description: input.description,
      url,
      inLanguage: input.locale,
      startDate: input.endsOn,
      endDate: input.endsOn,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      image: [OG_IMAGE_URL],
      location: {
        "@type": "Place",
        name: "San Salvador",
        address: {
          "@type": "PostalAddress",
          addressLocality: "San Salvador",
          addressCountry: "SV",
        },
      },
      organizer: {
        "@type": "Organization",
        "@id": organizationId,
        name: SITE_NAME,
        url: absoluteUrl(),
      },
      offers: {
        "@type": "Offer",
        url,
        price: (input.priceCents / 100).toFixed(2),
        priceCurrency: input.currency,
        availability: input.soldOut
          ? "https://schema.org/SoldOut"
          : "https://schema.org/InStock",
      },
    }),
  }
}

/** WebPage, Service, and breadcrumb for one consulting route. */
export function buildServicePageJsonLd(input: {
  locale: Locale
  path: string
  title: string
  description: string
  serviceName: string
  homeLabel: string
}): HeadScript {
  const url = absoluteUrl(input.path)
  const home = absoluteUrl()
  const organizationId = `${home}#organization`
  const serviceId = `${url}#service`

  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "@id": `${url}#webpage`,
          url,
          name: input.title,
          description: input.description,
          inLanguage: input.locale,
          isPartOf: { "@id": `${home}#website` },
          about: { "@id": serviceId },
          breadcrumb: { "@id": `${url}#breadcrumb` },
        },
        {
          "@type": "Service",
          "@id": serviceId,
          name: input.serviceName,
          description: input.description,
          url,
          provider: {
            "@type": "Organization",
            "@id": organizationId,
            name: SITE_NAME,
            url: home,
          },
          areaServed: { "@type": "Country", name: "El Salvador" },
          availableLanguage: ["es", "en"],
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: input.homeLabel,
              item: home,
            },
            {
              "@type": "ListItem",
              position: 2,
              name: input.serviceName,
              item: url,
            },
          ],
        },
      ],
    }),
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
