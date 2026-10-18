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

const fetchedAt = new Date("2026-10-18T12:00:00.000Z")

describe("events index", () => {
  it("uses the Spanish title on the Spanish render and English on the same URL", () => {
    expect(es.events.headline).toBe("Eventos de Ai Labs en El Salvador")
    expect(es.events.metaTitle).toBe(es.events.headline)
    expect(es.events.intro).toBe(
      "Estos son los eventos de Ai Labs publicados en Luma para este mes, no todos los eventos del país."
    )
    expect(es.events.metaDescription).toBe(es.events.intro)
    expect(en.events.headline).toBe("Ai Labs events in El Salvador")
    expect(en.events.metaTitle).toBe(en.events.headline)
    expect(en.events.intro).toBe(
      "These are the Ai Labs events published on Luma for this month, not every event in the country."
    )
    expect(en.events.metaDescription).toBe(en.events.intro)
    expect(es.community.eventsCta.href).toBe("/events")
    expect(en.community.eventsCta.href).toBe("/events")
    expect(es.home.aperture.eventsCta.href).toBe("/events")
    expect(en.home.aperture.eventsCta.href).toBe("/events")
  })

  it("lists the public Luma events once, with only published fields", () => {
    expect(lumaEvents).toHaveLength(54)
    expect(new Set(lumaEvents.map((event) => event.id)).size).toBe(54)
    expect(new Set(lumaEvents.map((event) => event.href)).size).toBe(54)
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
    expect(stillOctober.past).toHaveLength(5)

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
    for (const photo of [...es.events.photos, ...en.events.photos]) {
      expect(photo.alt.trim().length).toBeGreaterThan(20)
      expect(photo.src.startsWith("/events/community/")).toBe(true)
      expect(photo.src.endsWith(".webp")).toBe(true)
      expect(existsSync(`public${photo.src}`)).toBe(true)
    }
  })

  it("renders one index for both languages, with no bot-specific copy", () => {
    const route = readFileSync("src/routes/_site/events/index.tsx", "utf8")
    expect(route).toContain("events.headline")
    expect(route).toContain("events.intro")
    expect(route).toContain('path: "/events"')
    expect(route).toContain("<EventsIndex")
    expect(route).not.toMatch(/googlebot|user-agent|noindex/i)
  })
})
