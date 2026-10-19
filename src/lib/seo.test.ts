import { describe, expect, it } from "vitest"

import {
  ORGANIZATION_SAME_AS,
  buildFaqJsonLd,
  buildHomeJsonLd,
  buildPageMeta,
  buildWorkshopEventJsonLd,
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
    expect(serialized).not.toMatch(
      /latinoam[eé]rica|latin america|centroam[eé]rica|central america/i
    )
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
      path: "/community",
      title: "Comunidad de WhatsApp | Ai Labs",
      description: "Comunidad en El Salvador.",
    })
    expect(head.links).toEqual([
      {
        rel: "canonical",
        href: "https://www.ailabs.sv/community",
      },
    ])
    expect(head.links.some((link) => link.hrefLang)).toBe(false)
    expect(head.meta.find((tag) => tag.property === "og:url")?.content).toBe(
      "https://www.ailabs.sv/community"
    )
    expect(
      buildPageMeta({
        locale: "es",
        title: "Inicio",
        description: "Ai Labs",
      }).links[0]?.href
    ).toBe("https://www.ailabs.sv/")
  })

  it("publishes only the questions it is given", () => {
    const script = buildFaqJsonLd([
      {
        question: "¿Qué es la consultoría en IA?",
        answer: "Revisamos cómo se trabaja.",
      },
    ])
    const document = JSON.parse(script.children) as {
      "@type": string
      mainEntity: Array<{ name: string; acceptedAnswer: { text: string } }>
    }
    expect(document["@type"]).toBe("FAQPage")
    expect(document.mainEntity).toEqual([
      {
        "@type": "Question",
        name: "¿Qué es la consultoría en IA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Revisamos cómo se trabaja.",
        },
      },
    ])
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
    expect(meta.find((tag) => tag.property === "og:image:width")?.content).toBe(
      "1200"
    )
    expect(
      meta.find((tag) => tag.property === "og:image:height")?.content
    ).toBe("630")
    const sized = buildPageMeta({
      locale: "es",
      path: "/events",
      title: "Eventos",
      description: "Este mes",
      image: {
        url: "https://www.ailabs.sv/events/community/01-group-hall.webp",
        alt: "Grupo",
        width: 1200,
        height: 676,
      },
    }).meta
    expect(
      sized.find((tag) => tag.property === "og:image:height")?.content
    ).toBe("676")
  })
})

describe("buildWorkshopEventJsonLd", () => {
  const base = {
    locale: "es" as const,
    path: "/events/demo",
    name: "Demo",
    description: "Taller de prueba.",
    priceCents: 2500,
    currency: "USD",
    soldOut: false,
  }

  it("skips workshops without a date", () => {
    expect(buildWorkshopEventJsonLd({ ...base, endsOn: null })).toBeNull()
  })

  it("publishes an in-person event in San Salvador with its price", () => {
    const script = buildWorkshopEventJsonLd({ ...base, endsOn: "2026-12-05" })
    const data = JSON.parse(script?.children ?? "{}")
    expect(data["@type"]).toBe("EducationEvent")
    expect(data.startDate).toBe("2026-12-05")
    expect(data.url).toBe("https://www.ailabs.sv/events/demo")
    expect(data.location.address.addressLocality).toBe("San Salvador")
    expect(data.offers.price).toBe("25.00")
    expect(data.offers.availability).toBe("https://schema.org/InStock")
  })

  it("marks sold-out workshops", () => {
    const script = buildWorkshopEventJsonLd({
      ...base,
      endsOn: "2026-12-05",
      soldOut: true,
    })
    expect(JSON.parse(script?.children ?? "{}").offers.availability).toBe(
      "https://schema.org/SoldOut"
    )
  })
})
