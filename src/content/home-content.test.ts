import { describe, expect, it } from "vitest"
import { en } from "@/content/en"
import { es } from "@/content/es"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"

describe("public home content", () => {
  it("keeps services, events and booking destinations consistent across languages", () => {
    for (const content of [en, es]) {
      const nav = getChromeNavItems(content.chrome.nav, content.locale)
      const prefix = content.locale === "en" ? "/en" : ""
      expect(nav.services.href).toBe("#services")
      expect(nav.events.to).toBe(`${prefix}/events`)
      expect(nav.contact.to).toBe(`${prefix}/agendar`)
      const footerHrefs = content.chrome.footer.columns
        .flatMap(({ links }) => links)
        .map(({ href }) => href)
      expect(footerHrefs).toEqual(
        expect.arrayContaining([
          "#services",
          "/capacitacion-ia-el-salvador",
          "/automatizacion-ia-el-salvador",
          "#about",
          "/agendar",
          "/events",
        ])
      )
      for (const retired of ["#contact", "/community", "/campus-leader"]) {
        expect(footerHrefs).not.toContain(retired)
      }
      expect(content.home.hero.primaryCta.href).toBe("/agendar")
      for (const item of content.home.services.items) {
        expect(item.cta.length).toBeGreaterThan(0)
      }
    }
  })

  for (const content of [en, es]) {
    it(`does not publish consulting prices in ${content.locale} home copy`, () => {
      expect(
        JSON.stringify({
          meta: content.meta,
          chrome: content.chrome,
          home: content.home,
        })
      ).not.toMatch(/\$|\bUSD\b/iu)
    })
  }
})
