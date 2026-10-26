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
        "/events",
        "/campus-leader",
        "/aperture",
      ])
      expect(
        content.chrome.footer.columns
          .flatMap(({ links }) => links)
          .map(({ href }) => href)
      ).toEqual(
        expect.arrayContaining([
          "#services",
          "/capacitacion-ia-el-salvador",
          "/automatizacion-ia-el-salvador",
          "#about",
          "#contact",
          "/community",
          "/events",
          "/campus-leader",
          "/aperture",
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

  it("places El Salvador next to AI in the home title and headline", () => {
    expect(es.meta.title).toBe(
      "Ai Labs | Consultoría en IA en El Salvador, automatización y formación práctica"
    )
    expect(es.home.hero.headline).toBe(
      "Consultoría en IA en El Salvador, automatización de procesos y formación práctica."
    )
    expect(en.meta.title).toBe(
      "Ai Labs | AI consulting in El Salvador, automation and practical education"
    )
    expect(en.home.hero.headline).toBe(
      "AI consulting in El Salvador, business automation and practical education."
    )
  })

  it("keeps the ambassador sentence and names Cursor, Codex, and El Salvador", () => {
    expect(es.home.trust.label).toBe(
      "Somos parte de programas de embajadores de Cursor y Codex en El Salvador"
    )
    expect(en.home.trust.label).toBe(
      "Part of ambassador programs for Cursor and Codex in El Salvador"
    )
    expect(es.home.trust.logos.map(({ id, name }) => [id, name])).toEqual([
      ["spacexai", "SpaceXAI"],
      ["codex", "Codex"],
      ["openai", "OpenAI"],
      ["claude", "Claude"],
      ["mistral", "Mistral"],
      ["elevenlabs", "ElevenLabs"],
      ["notion", "Notion"],
    ])
    expect(en.home.trust.logos).toEqual(es.home.trust.logos)
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
