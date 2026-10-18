import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"

describe("events index", () => {
  it("uses the Spanish title on the Spanish render and English on the same URL", () => {
    expect(es.events.headline).toBe("Eventos de Ai Labs en El Salvador")
    expect(es.events.metaTitle).toBe(es.events.headline)
    expect(es.events.intro).toBe(
      "Estos son eventos de Ai Labs en El Salvador, no todos los eventos del país."
    )
    expect(es.events.metaDescription).toBe(es.events.intro)
    expect(en.events.headline).toBe("Ai Labs events in El Salvador")
    expect(en.events.metaTitle).toBe(en.events.headline)
    expect(en.events.intro).toBe(
      "These are Ai Labs events in El Salvador, not every event in the country."
    )
    expect(en.events.metaDescription).toBe(en.events.intro)
  })

  it("lists only events whose pages already exist, and does not invent a country", () => {
    for (const content of [es, en]) {
      expect(content.events.items.map((item) => item.href)).toEqual([
        "/events/modo-fundador",
        "/events/get-competitive-quick",
        "https://devday.ailabs.sv/",
      ])
      const competitive = content.events.items.find(
        (item) => item.id === "get-competitive-quick"
      )
      expect(competitive?.summary).not.toMatch(/el salvador|san salvador/i)
      expect(competitive?.summary).toMatch(/mid-ago|mid-august/i)
      const founder = content.events.items.find(
        (item) => item.id === "modo-fundador"
      )
      expect(founder?.summary).toMatch(/San Salvador/)
      expect(founder?.summary).toMatch(/15/)
      const devday = content.events.items.find((item) => item.id === "devday")
      expect(devday?.summary).toMatch(/San Salvador/)
      expect(devday?.summary).toMatch(/BINAES/)
      expect(devday?.external).toBe(true)
      expect(JSON.stringify(content.events.items)).not.toMatch(
        /attendance|asistentes|cupo lleno|\b208\b/i
      )
    }
    expect(es.community.eventsCta.href).toBe("/events")
    expect(en.community.eventsCta.href).toBe("/events")
    expect(es.home.aperture.eventsCta.href).toBe("/events")
    expect(en.home.aperture.eventsCta.href).toBe("/events")
  })

  it("renders one index for both languages, with no bot-specific copy", () => {
    const route = readFileSync("src/routes/_site/events/index.tsx", "utf8")
    expect(route).toContain("{events.headline}")
    expect(route).toContain("{events.intro}")
    expect(route).toContain('path: "/events"')
    expect(route).not.toMatch(/googlebot|user-agent|noindex/i)
  })
})
