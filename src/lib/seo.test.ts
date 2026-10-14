import { describe, expect, it } from "vitest"

import {
  ORGANIZATION_SAME_AS,
  buildHomeJsonLd,
  buildLandingJsonLd,
  buildPageMeta,
} from "@/lib/seo"

type ServiceOffer = {
  "@type": string
  name: string
  description: string
}

type JsonLdNode = {
  "@type": string
  name?: string
  itemListElement?: ReadonlyArray<{
    "@type": string
    position: number
    itemOffered: ServiceOffer
  }>
}

const services = [
  {
    name: "Process consulting and prioritization",
    description:
      "Identify and prioritize a practical AI opportunity in an existing process.",
  },
  {
    name: "Team enablement",
    description: "Prepare business teams to apply AI in their day-to-day work.",
  },
  {
    name: "Workflow design and implementation",
    description:
      "Design, integrate, document, and transfer an AI-enabled workflow.",
  },
] as const

describe("buildHomeJsonLd", () => {
  it("publishes exactly three consultative services without Aperture", () => {
    const script = buildHomeJsonLd({
      locale: "en",
      title: "Ai Labs applied AI consulting",
      description: "Applied AI consulting for business teams.",
      services,
    })
    const document = JSON.parse(script.children) as {
      "@context": string
      "@graph": JsonLdNode[]
    }
    const catalog = document["@graph"].find(
      (node) => node["@type"] === "OfferCatalog"
    )

    expect(script.type).toBe("application/ld+json")
    expect(catalog).toBeDefined()
    if (!catalog?.itemListElement || !catalog.name) {
      throw new Error("Missing OfferCatalog details")
    }

    const offeredServices = catalog.itemListElement.map(
      ({ itemOffered }) => itemOffered
    )

    expect(catalog.name).not.toMatch(/pillars|pilares/i)
    expect(catalog.itemListElement).toHaveLength(3)
    expect(catalog.itemListElement.map(({ position }) => position)).toEqual([
      1, 2, 3,
    ])
    expect(
      offeredServices.every((service) => service["@type"] === "Service")
    ).toBe(true)
    expect(
      offeredServices.map(({ name, description }) => ({ name, description }))
    ).toEqual(services)
    expect(JSON.stringify(offeredServices)).not.toMatch(/aperture/i)

    const serialized = JSON.stringify(document)
    expect(serialized).not.toMatch(/latinoam[eé]rica|latin america/i)
    const organization = document["@graph"].find(
      (node) => node["@type"] === "Organization"
    ) as
      | {
          sameAs?: string[]
          areaServed?: { name?: string }
          address?: { addressLocality?: string; addressCountry?: string }
        }
      | undefined
    expect(organization?.sameAs).toEqual([...ORGANIZATION_SAME_AS])
    expect(organization?.areaServed?.name).toBe("El Salvador")
    expect(organization?.address).toMatchObject({
      "@type": "PostalAddress",
      addressLocality: "San Salvador",
      addressCountry: "SV",
    })
  })
})

describe("buildPageMeta", () => {
  it("adds a robots noindex tag only when asked", () => {
    const base = { locale: "en" as const, title: "Terms", description: "d" }
    const robots = (noindex?: boolean) =>
      buildPageMeta({ ...base, noindex }).meta.filter(
        (tag) => tag.name === "robots"
      )

    expect(robots()).toEqual([])
    expect(robots(true)).toEqual([
      { name: "robots", content: "noindex, nofollow" },
    ])
  })

  it("canonicalizes on www and does not emit hreflang", () => {
    const head = buildPageMeta({
      locale: "es",
      path: "/consultoria-de-ia",
      title: "Consultoría de IA en El Salvador | Ai Labs",
      description: "Desde San Salvador.",
    })
    expect(head.links).toEqual([
      {
        rel: "canonical",
        href: "https://www.ailabs.sv/consultoria-de-ia",
      },
    ])
    expect(head.links.some((link) => link.hrefLang)).toBe(false)
    expect(
      head.meta.some((tag) => tag.property === "og:locale:alternate")
    ).toBe(false)
    expect(head.meta.find((tag) => tag.property === "og:url")?.content).toBe(
      "https://www.ailabs.sv/consultoria-de-ia"
    )
  })

  it("emits hreflang only when both language URLs exist", () => {
    const head = buildPageMeta({
      locale: "en",
      path: "/ai-consulting-el-salvador",
      title: "AI consulting in El Salvador | Ai Labs",
      description: "From San Salvador.",
      alternates: {
        es: "/consultoria-de-ia",
        en: "/ai-consulting-el-salvador",
      },
    })
    expect(head.links).toEqual([
      {
        rel: "canonical",
        href: "https://www.ailabs.sv/ai-consulting-el-salvador",
      },
      {
        rel: "alternate",
        hrefLang: "es",
        href: "https://www.ailabs.sv/consultoria-de-ia",
      },
      {
        rel: "alternate",
        hrefLang: "en",
        href: "https://www.ailabs.sv/ai-consulting-el-salvador",
      },
      {
        rel: "alternate",
        hrefLang: "x-default",
        href: "https://www.ailabs.sv/consultoria-de-ia",
      },
    ])
    expect(
      head.meta.find((tag) => tag.property === "og:locale:alternate")?.content
    ).toBe("es_SV")
  })

  it("puts Central America on the regional service, not Latin America", () => {
    const script = buildLandingJsonLd({
      locale: "en",
      page: {
        path: "/ai-consulting-central-america",
        metaTitle: "AI consulting in Central America | Ai Labs",
        metaDescription: "From San Salvador.",
        schemaName: "AI consulting in Central America",
        areaName: "Central America",
        areaType: "AdministrativeArea",
        kind: "service",
      },
    })
    const document = JSON.parse(script.children) as {
      "@graph": Array<{
        "@type": string
        areaServed?: { "@type": string; name: string }
        spatialCoverage?: { name: string }
      }>
    }
    const service = document["@graph"].find(
      (node) => node["@type"] === "Service"
    )
    expect(service?.areaServed).toEqual({
      "@type": "AdministrativeArea",
      name: "Central America",
    })
    expect(JSON.stringify(document)).not.toMatch(/latin america/i)
    expect(
      document["@graph"].find((node) => node["@type"] === "WebPage")
        ?.spatialCoverage?.name
    ).toBe("Central America")
  })

  it("uses a custom share image when provided", () => {
    const meta = buildPageMeta({
      locale: "en",
      path: "/u/walter",
      title: "Walter",
      description: "Building",
      image: {
        url: "https://ailabs.sv/api/og/u/walter",
        alt: "Walter · Aperture member #005",
      },
    }).meta
    expect(meta.find((tag) => tag.property === "og:image")?.content).toBe(
      "https://ailabs.sv/api/og/u/walter"
    )
  })
})
