import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import {
  getWorkshopMeta,
  isWorkshopPast,
  listWorkshopSlugs,
} from "@/events/catalog"

const NOW = new Date("2026-10-24T18:00:00.000Z")

describe("workshop catalog", () => {
  it("treats dated workshops as past after their day in El Salvador", () => {
    const modo = getWorkshopMeta("modo-fundador")
    expect(modo?.endsOn).toBe("2026-08-15")
    expect(isWorkshopPast(modo!, NOW)).toBe(true)
    expect(
      isWorkshopPast(modo!, new Date("2026-08-15T12:00:00.000-06:00"))
    ).toBe(false)
  })

  it("does not invent a date for Get Competitive Quick", () => {
    const workshop = getWorkshopMeta("get-competitive-quick")
    expect(workshop?.endsOn).toBeNull()
    expect(isWorkshopPast(workshop!, NOW)).toBe(false)
  })

  it("keeps past and unconfirmed-window workshops out of the sitemap", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8")
    for (const slug of listWorkshopSlugs()) {
      const workshop = getWorkshopMeta(slug)
      if (!workshop || isWorkshopPast(workshop, NOW) || !workshop.endsOn) {
        expect(sitemap).not.toContain(`https://www.ailabs.sv/events/${slug}`)
      }
    }
  })
})
