import { existsSync, readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import {
  formatLumaPlace,
  formatLumaWhen,
  splitCurrentMonthEvents,
  splitLumaEvents,
  walterEventsCalendarUrl,
} from "@/content/luma-event-format"
import { lumaEvents } from "@/content/luma-events"
import { buildEventsIndexHead } from "@/lib/events-index-head"

const fetchedAt = new Date("2026-10-18T12:00:00.000Z")

describe("events index", () => {
  it("uses the Spanish title on the Spanish URL and English on /en/events", () => {
    expect(es.events.headline).toBe(
      "Eventos de IA de Ai Labs en San Salvador, El Salvador"
    )
    expect(es.events.metaTitle).toBe(es.events.headline)
    expect(es.events.intro).toBe(
      "Publicamos los eventos de IA en El Salvador de Ai Labs en Luma para este mes, en San Salvador; no son todos los eventos del país."
    )
    expect(es.events.metaDescription).toBe(es.events.intro)
    expect(es.events.breadcrumbHome).toBe("Inicio")
    expect(en.events.headline).toBe(
      "AI events from Ai Labs in San Salvador, El Salvador"
    )
    expect(en.events.metaTitle).toBe(en.events.headline)
    expect(en.events.intro).toBe(
      "We publish the Ai Labs AI events in El Salvador on Luma for this month, in San Salvador; they are not every event in the country."
    )
    expect(en.events.metaDescription).toBe(en.events.intro)
    expect(en.events.breadcrumbHome).toBe("Home")
    expect(es.community.eventsCta.href).toBe("/events")
    expect(en.community.eventsCta.href).toBe("/events")
  })

  it("lists the public Luma events once, with only published fields", () => {
    expect(lumaEvents).toHaveLength(55)
    expect(new Set(lumaEvents.map((event) => event.id)).size).toBe(55)
    expect(new Set(lumaEvents.map((event) => event.href)).size).toBe(55)
    for (const event of lumaEvents) {
      expect(event.href).toMatch(/^https:\/\/luma\.com\/[a-z0-9-]+$/)
      expect(event.hosts.length).toBeGreaterThan(0)
      expect(event.timezone.length).toBeGreaterThan(0)
    }

    const devday = lumaEvents.find(
      (event) => event.href === "https://luma.com/0vam8okf"
    )
    expect(devday?.name).toBe("DevDay Exchange Community: San Salvador")
    expect(devday?.hosts).toEqual(["Walter Morales", "Daniela Huezo"])
    expect(formatLumaPlace(devday!, "es")).toBe(
      "Biblioteca Nacional de El Salvador (BINAES), San Salvador, El Salvador"
    )
    expect(formatLumaPlace(devday!, "en")).toContain("National Library")
    expect(formatLumaWhen(devday!, "es")).toMatch(/2026/)
    expect(formatLumaWhen(devday!, "es")).toMatch(/octubre/i)
    expect(formatLumaWhen(devday!, "en")).toMatch(/October/)

    const guatemala = lumaEvents.find(
      (event) => event.href === "https://luma.com/hrf7a7di"
    )
    expect(formatLumaPlace(guatemala!, "es")).toBe(
      "Tec, Ciudad de Guatemala, Guatemala"
    )

    const githubLab = lumaEvents.find(
      (event) => event.href === "https://luma.com/7qz86dry"
    )
    expect(githubLab?.name).toBe("Github Essentials Lab")
    expect(githubLab?.hosts).toEqual([
      "IEEE UEES SB",
      "Walter Morales",
      "Daniela Huezo",
    ])
    expect(formatLumaPlace(githubLab!, "es")).toBe(
      "Universidad Evangélica de El Salvador, San Salvador, El Salvador"
    )
    expect(formatLumaPlace(githubLab!, "en")).toContain(
      "Evangelical University of El Salvador"
    )

    const hiddenPlace = lumaEvents.find(
      (event) => event.href === "https://luma.com/uf2mpfis"
    )
    expect(hiddenPlace?.name).toBe("Cursor Workshop El Salvador")
    expect(hiddenPlace?.place).toBeUndefined()
    expect(formatLumaPlace(hiddenPlace!, "es")).toBeNull()

    expect(JSON.stringify(lumaEvents)).not.toMatch(
      /por confirmar|unconfirmed|la página dice|share\.google/i
    )
    expect(`${es.events.intro} ${en.events.intro}`).not.toMatch(
      /por confirmar|unconfirmed|la página dice/i
    )
  })

  it("sorts upcoming events before past events", () => {
    const { upcoming, past } = splitLumaEvents(fetchedAt)
    expect(upcoming.map((event) => event.href)).toEqual([
      "https://luma.com/q0l9hdwo",
      "https://luma.com/0vam8okf",
      "https://luma.com/7qz86dry",
    ])
    expect(past[0]?.href).toBe("https://luma.com/spacexai-ikz6")
    expect(past).toHaveLength(52)
    for (let index = 1; index < past.length; index += 1) {
      expect(past[index - 1].startAt >= past[index].startAt).toBe(true)
    }
  })

  it("keeps the current month, with upcoming events first", () => {
    const october = splitCurrentMonthEvents(fetchedAt)
    expect(october.upcoming.map((event) => event.href)).toEqual([
      "https://luma.com/q0l9hdwo",
      "https://luma.com/0vam8okf",
      "https://luma.com/7qz86dry",
    ])
    expect(october.past.map((event) => event.href)).toEqual([
      "https://luma.com/spacexai-ikz6",
      "https://luma.com/x36xff8j",
      "https://luma.com/hrf7a7di",
    ])

    const stillOctober = splitCurrentMonthEvents(
      new Date("2026-11-01T05:30:00.000Z")
    )
    expect(stillOctober.upcoming).toHaveLength(0)
    expect(stillOctober.past).toHaveLength(6)

    const november = splitCurrentMonthEvents(
      new Date("2026-11-15T18:00:00.000Z")
    )
    expect(november.upcoming).toHaveLength(0)
    expect(november.past).toHaveLength(0)
    expect(walterEventsCalendarUrl).toBe("https://luma.com/user/wmoralesdev")
  })

  it("uses the community photos sent for the events page", () => {
    expect(es.events.photos.map((photo) => photo.src)).toEqual(
      en.events.photos.map((photo) => photo.src)
    )
    expect(es.events.photos).toHaveLength(18)
    expect(new Set(es.events.photos.map((photo) => photo.src)).size).toBe(18)
    expect(es.events.photos.map((photo) => photo.alt)).not.toEqual(
      en.events.photos.map((photo) => photo.alt)
    )
    expect(es.events.photosCaption).toBe(
      "Crédito: Ai Labs. Fotos de nuestros eventos en San Salvador."
    )
    expect(en.events.photosCaption).toBe(
      "Credit: Ai Labs. Photos from our events in San Salvador."
    )
    for (const photo of es.events.photos) {
      expect(photo.alt.startsWith("Evento de Ai Labs en San Salvador. ")).toBe(
        true
      )
      expect(photo.alt).not.toMatch(/Tribe|GDG/)
    }
    for (const photo of en.events.photos) {
      expect(photo.alt.startsWith("Ai Labs event in San Salvador. ")).toBe(true)
      expect(photo.alt).not.toMatch(/Tribe|GDG/)
    }
    for (const photo of [...es.events.photos, ...en.events.photos]) {
      expect(photo.alt.trim().length).toBeGreaterThan(20)
      expect(photo.src.startsWith("/events/community/")).toBe(true)
      expect(photo.src.endsWith(".webp")).toBe(true)
      expect(existsSync(`public${photo.src}`)).toBe(true)
    }
  })

  it("renders one index for both languages, with no bot-specific copy", () => {
    const route = readFileSync("src/routes/_site/events/index.tsx", "utf8")
    expect(route).toContain("buildEventsIndexHead")
    expect(route).toContain("<EventsIndex")
    expect(route).not.toMatch(
      /googlebot|user-agent|noindex|FAQPage|buildFaqJsonLd/i
    )
  })

  it("describes the Spanish page and the events it renders", () => {
    const head = buildEventsIndexHead({
      locale: "es",
      events: es.events,
      now: fetchedAt,
    })
    const title = head.meta.find((tag) => tag.title)?.title
    const description = head.meta.find(
      (tag) => tag.name === "description"
    )?.content
    const document = JSON.parse(head.scripts[0]?.children ?? "{}") as {
      "@graph": Array<{
        "@type": string
        name?: string
        description?: string
        areaServed?: { "@type": string; name?: string }
        itemListElement?: Array<{
          name?: string
          item?: {
            "@type": string
            name?: string
            startDate?: string
            timezone?: string
            url?: string
            organizer?: { "@type"?: string; name?: string; url?: string }
            location?: {
              name?: string
              address?: { addressLocality?: string; addressCountry?: string }
            }
          }
        }>
      }>
    }
    const types = document["@graph"].map((node) => node["@type"])
    const list = document["@graph"].find((node) => node["@type"] === "ItemList")
    const events = list?.itemListElement?.map((entry) => entry.item) ?? []
    const guatemala = events.find((event) => event?.name?.includes("Guatemala"))

    expect(title).toBe("Eventos de IA de Ai Labs en San Salvador, El Salvador")
    expect(description).toBe(es.events.metaDescription)
    expect(description).toMatch(/San Salvador/)
    expect(description).toMatch(/Luma/)
    expect(description).toMatch(/este mes/)
    expect(head.links).toEqual([
      { rel: "canonical", href: "https://www.ailabs.sv/events" },
      {
        rel: "alternate",
        href: "https://www.ailabs.sv/events",
        hrefLang: "es",
      },
      {
        rel: "alternate",
        href: "https://www.ailabs.sv/en/events",
        hrefLang: "en",
      },
      {
        rel: "alternate",
        href: "https://www.ailabs.sv/events",
        hrefLang: "x-default",
      },
    ])
    expect(head.meta.find((tag) => tag.property === "og:image")?.content).toBe(
      "https://www.ailabs.sv/events/community/01-group-hall.webp"
    )
    expect(head.meta.find((tag) => tag.name === "twitter:card")?.content).toBe(
      "summary_large_image"
    )
    expect(types).toEqual(["BreadcrumbList", "ItemList", "ImageGallery"])
    const gallery = document["@graph"].find(
      (node) => node["@type"] === "ImageGallery"
    ) as {
      description?: string
      image?: Array<{
        caption?: string
        creditText?: string
        creator?: { name?: string }
      }>
    }
    expect(gallery.description).toBe(es.events.photosCaption)
    expect(gallery.description).toMatch(/Crédito: Ai Labs/)
    expect(gallery.image).toHaveLength(es.events.photos.length)
    for (const image of gallery.image ?? []) {
      expect(image.caption).toMatch(/^Evento de Ai Labs en San Salvador\./)
      expect(image.caption).not.toMatch(/Tribe|GDG/)
      expect(image.creditText).toBe("Ai Labs")
      expect(image.creator?.name).toBe("Ai Labs")
    }
    expect(
      head.meta.find((tag) => tag.property === "og:image:alt")?.content
    ).toBe(es.events.photos[0]?.alt)
    expect(JSON.stringify(document["@graph"][0])).toContain('"name":"Inicio"')
    expect(JSON.stringify(document["@graph"][0])).toContain('"name":"Eventos"')
    expect(JSON.stringify(document)).not.toMatch(/FAQPage/)
    expect(list?.description).toBe(es.events.intro)
    expect(list?.areaServed).toEqual({
      "@type": "Country",
      name: "El Salvador",
    })
    expect(events.map((event) => event?.name)).toEqual([
      "ElevenCreative Workshop",
      "DevDay Exchange Community: San Salvador",
      "Github Essentials Lab",
      "Grok Bot Workshop San Salvador",
      "Grok Bot Meetup San Salvador",
      "Ciudad de Guatemala - Clerk Meetup",
    ])
    expect(events[0]?.startDate).toBe("2026-10-23T14:00:00-06:00")
    expect(events[0]?.timezone).toBe("America/El_Salvador")
    expect(guatemala?.startDate).toBe("2026-10-09T14:00:00-06:00")
    expect(guatemala?.timezone).toBe("America/Guatemala")
    expect(guatemala?.location).toMatchObject({
      name: "Tec",
      address: {
        addressLocality: "Ciudad de Guatemala",
        addressCountry: "Guatemala",
      },
    })
    expect(guatemala?.organizer).toEqual({
      "@type": "Organization",
      name: "Ai Labs",
      url: "https://www.ailabs.sv",
    })
    expect(guatemala?.url).toBe("https://luma.com/hrf7a7di")
    expect(JSON.stringify(guatemala)).not.toMatch(/El Salvador/)
    expect(JSON.stringify(document)).not.toMatch(
      /latinoam[eé]rica|latin america|centroam[eé]rica|central america|attendeeCount|eventAttendance/i
    )
  })
})
