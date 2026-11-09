import type { Locale } from "@/content"
import {
  BOOKING_PAGE_PATH,
  BOOKING_TOPIC_FIELD,
  SERVICE_BOOKING_TOPIC,
} from "@/content/booking"
import type { ServicePageId } from "@/lib/service-pages"
import { localizedPath } from "@/lib/locale-path"

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
  en: "Ai Labs: automation, custom software and AI training for companies.",
  es: "Ai Labs: automatización, software a medida y capacitación en IA para empresas.",
}

/** Fallback alt for the document shell. Crawlers without a language get Spanish. */
export const OG_IMAGE_ALT = OG_IMAGE_ALT_BY_LOCALE.es

/** Other spellings people and engines use for the same company. */
const ORGANIZATION_ALTERNATE_NAMES = [
  "AI Labs",
  "Ai Labs El Salvador",
  "ailabs.sv",
] as const

/**
 * One line that tells this company apart from others with a similar name.
 * Third person, like `llms.txt`: it is read by machines, not shown on a page.
 */
const ORGANIZATION_DISAMBIGUATION: Record<Locale, string> = {
  en: "Private company in San Salvador, El Salvador, that builds AI automations and custom software for companies and trains their teams.",
  es: "Empresa privada de San Salvador, El Salvador, que construye automatizaciones con IA y software a medida para empresas y capacita a sus equipos.",
}

/** What the three service pages are about, in the words people search with. */
const ORGANIZATION_KNOWS_ABOUT: Record<Locale, ReadonlyArray<string>> = {
  en: [
    "Artificial intelligence (AI)",
    "AI consulting",
    "Process automation with AI",
    "AI agents",
    "Custom software",
    "AI training for teams",
    "ChatGPT",
    "Claude",
    "Codex",
  ],
  es: [
    "Inteligencia artificial (IA)",
    "Consultoría de IA",
    "Automatización de procesos con IA",
    "Agentes de IA",
    "Software a medida",
    "Capacitación en IA para equipos",
    "ChatGPT",
    "Claude",
    "Codex",
  ],
}

const SERVICE_TYPE: Record<ServicePageId, Record<Locale, string>> = {
  automation: {
    en: "AI automation and custom software",
    es: "Automatización con IA y software a medida",
  },
  consulting: { en: "AI consulting", es: "Consultoría de IA" },
  training: {
    en: "AI training for teams",
    es: "Capacitación en IA para equipos",
  },
}

const DIAGNOSTIC_OFFER_NAME: Record<Locale, string> = {
  en: "Free 30-minute diagnostic",
  es: "Diagnóstico de 30 minutos sin costo",
}

/** Booking the free diagnostic: the one action every page leads to. */
function reserveAction(locale: Locale, service?: ServicePageId) {
  const page = absolutePageUrl(BOOKING_PAGE_PATH, locale)
  return {
    "@type": "ReserveAction",
    name: DIAGNOSTIC_OFFER_NAME[locale],
    target: service
      ? `${page}?${BOOKING_TOPIC_FIELD}=${SERVICE_BOOKING_TOPIC[service]}`
      : page,
  }
}

const OG_LOCALE: Record<Locale, string> = {
  en: "en_US",
  es: "es_SV",
}

/** Normalize a site path (no locale prefix). Empty and `/` become `""`. */
export function sitePath(path = ""): string {
  if (path === "/" || path === "") {
    return ""
  }
  return path.startsWith("/") ? path : `/${path}`
}

export { localizedPath }

/** Absolute URL for an asset or an unprefixed path. */
export function absoluteUrl(path = ""): string {
  const normalized = sitePath(path)
  return normalized ? `${SITE_URL}${normalized}` : `${SITE_URL}/`
}

/** Absolute URL for a public page in one language. */
export function absolutePageUrl(path = "", locale: Locale = "es"): string {
  const localized = localizedPath(locale, path)
  return localized === "/" ? `${SITE_URL}/` : `${SITE_URL}${localized}`
}

const ORGANIZATION_HOME = `${SITE_URL}/`
const ORGANIZATION_ID = `${ORGANIZATION_HOME}#organization`

function hreflangLinks(path = ""): HeadLink[] {
  const esUrl = absolutePageUrl(path, "es")
  const enUrl = absolutePageUrl(path, "en")
  return [
    { rel: "alternate", href: esUrl, hrefLang: "es" },
    { rel: "alternate", href: enUrl, hrefLang: "en" },
    { rel: "alternate", href: esUrl, hrefLang: "x-default" },
  ]
}

/** Document title with the brand suffix, if the page title does not already have it. */
export function brandedTitle(title: string): string {
  const suffix = ` | ${SITE_NAME}`
  return title.endsWith(suffix) ? title : `${title}${suffix}`
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
  const url = absolutePageUrl(path, locale)
  const imageUrl = image?.url ?? OG_IMAGE_URL
  const imageAlt = image?.alt ?? OG_IMAGE_ALT_BY_LOCALE[locale]
  const otherLocale = locale === "en" ? "es" : "en"

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
      { property: "og:locale:alternate", content: OG_LOCALE[otherLocale] },
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
    links: [
      { rel: "canonical", href: url },
      ...(noindex ? [] : hreflangLinks(path)),
    ],
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

/** WebPage, Service, and breadcrumb for one consulting route. */
export function buildServicePageJsonLd(input: {
  locale: Locale
  path: string
  title: string
  description: string
  serviceName: string
  homeLabel: string
  /** Academy pages also publish a Course node for the practical training. */
  kind?: "service" | "course"
  /** Which offer this page is: names the service type and the booking topic. */
  service?: ServicePageId
}): HeadScript {
  const url = absolutePageUrl(input.path, input.locale)
  const home = absolutePageUrl("/", input.locale)
  const websiteHome = ORGANIZATION_HOME
  const organizationId = ORGANIZATION_ID
  const serviceId = `${url}#service`
  const aboutId = input.kind === "course" ? `${url}#course` : serviceId
  const provider = {
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_NAME,
    url: websiteHome,
  }
  const graph: Array<Record<string, unknown>> = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: input.title,
      description: input.description,
      inLanguage: input.locale,
      isPartOf: { "@id": `${websiteHome}#website` },
      about: { "@id": aboutId },
      breadcrumb: { "@id": `${url}#breadcrumb` },
    },
    {
      "@type": "Service",
      "@id": serviceId,
      name: input.serviceName,
      description: input.description,
      url,
      provider,
      areaServed: { "@type": "Country", name: "El Salvador" },
      availableLanguage: ["es", "en"],
      ...(input.service
        ? {
            serviceType: SERVICE_TYPE[input.service][input.locale],
            // The only published price: the diagnostic that opens every engagement.
            offers: {
              "@type": "Offer",
              name: DIAGNOSTIC_OFFER_NAME[input.locale],
              price: "0",
              priceCurrency: "USD",
              url: absolutePageUrl(BOOKING_PAGE_PATH, input.locale),
            },
            potentialAction: reserveAction(input.locale, input.service),
          }
        : {}),
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
  ]

  if (input.kind === "course") {
    graph.push({
      "@type": "Course",
      "@id": `${url}#course`,
      name: input.serviceName,
      description: input.description,
      url,
      inLanguage: input.locale,
      provider,
      availableLanguage: ["es", "en"],
    })
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
  /** Public service page on this site, when one exists. */
  path?: string
}

export function buildHomeJsonLd(input: {
  locale: Locale
  title: string
  description: string
  /**
   * Visible company sentence. Falls back to `description` when omitted.
   * The home meta description stays the shorter line.
   */
  organizationDescription?: string
  services: readonly [JsonLdService, JsonLdService, JsonLdService]
}): HeadScript {
  const url = absolutePageUrl("/", input.locale)
  const organizationId = ORGANIZATION_ID
  const graph = [
    {
      "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
      "@id": organizationId,
      name: SITE_NAME,
      alternateName: [...ORGANIZATION_ALTERNATE_NAMES],
      url: ORGANIZATION_HOME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/brand/ailabs-ico.svg`,
      },
      image: OG_IMAGE_URL,
      description: input.organizationDescription ?? input.description,
      disambiguatingDescription: ORGANIZATION_DISAMBIGUATION[input.locale],
      knowsAbout: [...ORGANIZATION_KNOWS_ABOUT[input.locale]],
      knowsLanguage: ["es", "en"],
      hasOfferCatalog: { "@id": `${url}#offer-catalog` },
      potentialAction: reserveAction(input.locale),
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
      "@id": `${ORGANIZATION_HOME}#website`,
      url: ORGANIZATION_HOME,
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
      isPartOf: { "@id": `${ORGANIZATION_HOME}#website` },
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
      itemListElement: input.services.map((service, index) => {
        const serviceUrl = service.path
          ? absolutePageUrl(service.path, input.locale)
          : undefined
        return {
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            ...(serviceUrl
              ? { "@id": `${serviceUrl}#service`, url: serviceUrl }
              : {}),
            name: service.name,
            description: service.description,
            provider: { "@id": organizationId },
            areaServed: {
              "@type": "Country",
              name: "El Salvador",
            },
          },
        }
      }),
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

/**
 * WebPage and breadcrumb for a page that is neither the home nor a service:
 * the booking page and the community page. `reserve` marks the page where the
 * diagnostic is booked.
 */
export function buildSimplePageJsonLd(input: {
  locale: Locale
  path: string
  title: string
  description: string
  homeLabel: string
  /** Second crumb. */
  label: string
  reserve?: boolean
}): HeadScript {
  const url = absolutePageUrl(input.path, input.locale)
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
          isPartOf: { "@id": `${ORGANIZATION_HOME}#website` },
          about: { "@id": ORGANIZATION_ID },
          breadcrumb: { "@id": `${url}#breadcrumb` },
          ...(input.reserve
            ? {
                potentialAction: {
                  ...reserveAction(input.locale),
                  provider: { "@id": ORGANIZATION_ID },
                },
              }
            : {}),
        },
        {
          "@type": "BreadcrumbList",
          "@id": `${url}#breadcrumb`,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: input.homeLabel,
              item: absolutePageUrl("/", input.locale),
            },
            {
              "@type": "ListItem",
              position: 2,
              name: input.label,
              item: url,
            },
          ],
        },
      ],
    }),
  }
}
