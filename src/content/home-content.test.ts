import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"

describe("public home content", () => {
  it("keeps the services menu, events and booking destinations consistent across languages", () => {
    for (const content of [en, es]) {
      const nav = getChromeNavItems(content.chrome.nav, content.locale)
      const prefix = content.locale === "en" ? "/en" : ""
      expect(nav.services.items.map((item) => item.to)).toEqual(
        [
          SERVICE_PAGE_PATHS.automation,
          SERVICE_PAGE_PATHS.consulting,
          SERVICE_PAGE_PATHS.training,
        ].map((path) => `${prefix}${path}`)
      )
      expect(nav.events.to).toBe(`${prefix}/events`)
      expect(nav.contact.to).toBe(`${prefix}/agendar`)
      const footerHrefs = content.chrome.footer.columns
        .flatMap(({ links }) => links)
        .map(({ href }) => href)
      expect(footerHrefs).toEqual(
        expect.arrayContaining([
          ...Object.values(SERVICE_PAGE_PATHS),
          "#metodo",
          "/agendar",
          "/events",
        ])
      )
      for (const retired of [
        "#contact",
        "#services",
        "#about",
        "/community",
        "/campus-leader",
        "/redeem",
      ]) {
        expect(footerHrefs).not.toContain(retired)
      }
      expect(content.home.hero.primaryCta.href).toBe("/agendar")
      expect(content.home.hero.secondaryCta.href).toBe("#metodo")
    }
  })

  it("renders six sections in order and publishes offers and FAQ as JSON-LD", () => {
    const route = readFileSync("src/routes/_site/index.tsx", "utf8")
    const order = [
      "<HomeHero",
      "<HomeAmbassadors",
      "<HomeOffers",
      "<HomeMethod",
      "<HomeFaq",
      "<HomeBooking",
    ]
    const positions = order.map((tag) => route.indexOf(tag))
    expect(positions.every((position) => position >= 0)).toBe(true)
    expect([...positions].sort((a, b) => a - b)).toEqual(positions)
    expect(route).toContain("organizationDescription: home.hero.lead")
    expect(route).toContain("buildFaqJsonLd([...home.faq.items])")
    for (const path of Object.values(SERVICE_PAGE_PATHS)) {
      const key = Object.entries(SERVICE_PAGE_PATHS).find(
        ([, value]) => value === path
      )?.[0]
      expect(route).toContain(`path: SERVICE_PAGE_PATHS.${key}`)
    }
    const method = readFileSync("src/components/home/home-method.tsx", "utf8")
    expect(method).toContain('id="metodo"')
  })

  it("lists the ambassador programs apart from the tools we only work with", () => {
    for (const content of [en, es]) {
      const { ambassadors } = content.home
      expect(ambassadors.logos.map((logo) => logo.id)).not.toContain("claude")
      expect(ambassadors.partners.map((logo) => logo.id)).toEqual(["claude"])
      expect(ambassadors.stat.value).toMatch(/60/)
      expect(ambassadors.body).not.toMatch(/client|cliente/i)
    }
  })

  for (const content of [en, es]) {
    it(`keeps ${content.locale} home copy short, priced nowhere, and in first person`, () => {
      const text = JSON.stringify({
        meta: content.meta,
        chrome: content.chrome,
        home: content.home,
      })
      expect(text).not.toMatch(/\$|\bUSD\b/iu)
      expect(text).not.toMatch(/\bAi Labs (?:es|hace|is|does)\b/)
      expect(content.home.hero.headline.length).toBeLessThanOrEqual(55)
      expect(content.home.hero.lead.length).toBeLessThanOrEqual(160)
      expect(content.home.faq.items).toHaveLength(5)
      for (const item of content.home.faq.items) {
        expect(item.question).toMatch(/\?$/)
        expect(item.answer.length).toBeLessThanOrEqual(220)
      }
    })
  }
})
