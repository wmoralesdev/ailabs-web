import { describe, expect, it } from "vitest"
import { en } from "@/content/en"
import { es } from "@/content/es"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"

describe("public home content", () => {
  it("keeps services and grouped community destinations consistent across languages", () => {
    for (const content of [en, es]) {
      const nav = getChromeNavItems(content.chrome.nav)
      expect(nav.services.href).toBe("#services")
    }

    expect(
      getChromeNavItems(es.chrome.nav).community.items.map(({ to }) => to)
    ).toEqual([
      "/comunidad-de-ia-el-salvador",
      "/eventos",
      "/comunidad-de-ia-centroamerica",
      "/eventos-tech-centroamerica",
      "/consultoria-de-ia-centroamerica",
      "/community",
      "/campus-leader",
      "/aperture",
    ])
    expect(
      getChromeNavItems(en.chrome.nav).community.items.map(({ to }) => to)
    ).toEqual([
      "/ai-community-el-salvador",
      "/tech-events-el-salvador",
      "/ai-community-central-america",
      "/tech-events-central-america",
      "/ai-consulting-central-america",
      "/community",
      "/campus-leader",
      "/aperture",
    ])

    const hrefs = (content: typeof es) =>
      content.chrome.footer.columns
        .flatMap(({ links }) => links)
        .map(({ href }) => href)

    expect(hrefs(es)).toEqual(
      expect.arrayContaining([
        "/consultoria-de-ia",
        "/capacitacion-ia",
        "/automatizacion-con-ia",
        "/consultoria-de-ia-centroamerica",
        "/comunidad-de-ia-el-salvador",
        "/eventos",
        "/eventos-tech-centroamerica",
        "/enlaces",
        "#about",
        "#contact",
        "/community",
        "/campus-leader",
        "/aperture",
      ])
    )
    expect(hrefs(en)).toEqual(
      expect.arrayContaining([
        "/ai-consulting-el-salvador",
        "/ai-training-el-salvador",
        "/ai-automation-el-salvador",
        "/ai-consulting-central-america",
        "/ai-community-el-salvador",
        "/tech-events-el-salvador",
        "/tech-events-central-america",
        "/enlaces",
        "#about",
        "#contact",
        "/community",
        "/campus-leader",
        "/aperture",
      ])
    )
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
