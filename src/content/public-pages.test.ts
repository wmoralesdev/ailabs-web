import { describe, expect, it } from "vitest"

import { en } from "./en"
import { es } from "./es"
import { ORGANIZATION_SAME_AS } from "@/lib/seo"

describe("public pages", () => {
  it("puts El Salvador on the consulting page and skips a LatAm claim", () => {
    expect(es.pages.consulting.metaTitle).toBe(
      "Consultoría de IA en El Salvador | Ai Labs"
    )
    expect(es.pages.consulting.title).toMatch(/El Salvador/)
    expect(es.pages.consulting.lead).toMatch(/San Salvador/)
    expect(JSON.stringify(es.pages)).not.toMatch(
      /latinoam[eé]rica|centroam[eé]rica/i
    )
    expect(JSON.stringify(en.pages)).not.toMatch(
      /latin america|central america/i
    )
    expect(en.meta.title).not.toMatch(/Latin America/)
    expect(en.pages.consulting.metaTitle).toBe(
      "AI consulting in El Salvador | Ai Labs"
    )
  })

  it("lists published local proof without attendance figures", () => {
    const past = es.pages.events.past
      .map((event) => `${event.name} ${event.detail}`)
      .join("\n")
    expect(past).toMatch(/Universidad Francisco Gavidia/)
    expect(past).toMatch(/San Salvador/)
    expect(past).toMatch(/Guatemala/)
    expect(past).toMatch(/Zero to Agent/)
    expect(es.pages.events.upcoming[0]?.href).toBe("https://devday.ailabs.sv/")
    expect(JSON.stringify(es.pages.events)).not.toMatch(/208|800\+|140|145/)
  })

  it("keeps footer profiles aligned with organization sameAs", () => {
    for (const content of [en, es]) {
      expect(
        content.chrome.footer.socials.map((social) => social.href).sort()
      ).toEqual([...ORGANIZATION_SAME_AS].sort())
    }
  })
})
