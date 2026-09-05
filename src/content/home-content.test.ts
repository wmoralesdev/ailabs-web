import { describe, expect, it } from "vitest"
import { en } from "@/content/en"
import { es } from "@/content/es"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"

describe("public home content", () => {
  it("keeps services and grouped community destinations consistent across languages", () => {
    for (const content of [en, es]) {
      const nav = getChromeNavItems(content.chrome.nav)
      expect(nav.services.href).toBe("#services")
      expect(nav.community.items.map(({ to }) => to)).toEqual([
        "/community",
        "/campus-leader",
      ])
      expect(
        content.chrome.footer.columns
          .flatMap(({ links }) => links)
          .map(({ href }) => href)
      ).toEqual(
        expect.arrayContaining([
          "#services",
          "#academy",
          "#agentic",
          "#about",
          "#contact",
          "/community",
          "/campus-leader",
        ])
      )
    }
  })

  it("routes both delivery options to an existing inquiry interest", () => {
    for (const content of [en, es]) {
      const interests = content.home.contact.interestOptions.map(
        ({ value }) => value
      )
      expect(interests).toEqual([
        "discovery",
        "enablement",
        "implementation",
        "partnership",
      ])
      expect(
        content.home.services.items.map(({ id, interest }) => [id, interest])
      ).toEqual([
        ["academy", "enablement"],
        ["agentic", "implementation"],
      ])
      for (const item of content.home.services.items)
        expect(interests).toContain(item.interest)
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
      ).not.toMatch(/\$|\bUSD\b|\bprecios?\b/iu)
    })
  }
})
