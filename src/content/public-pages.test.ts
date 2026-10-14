import { describe, expect, it } from "vitest"

import { en } from "./en"
import { es } from "./es"
import { LANGUAGE_PAIRS } from "@/lib/language-pairs"
import { ORGANIZATION_SAME_AS } from "@/lib/seo"

const bannedPlace =
  /honduras|nicaragua|costa rica|panam[aá]|latinoam[eé]rica|latin america/i

function pageBody(page: object): string {
  const record = page as {
    metaTitle?: string
    metaDescription?: string
    title?: string
    lead?: string
    intro?: readonly string[]
    sections?: ReadonlyArray<{ heading: string; paragraphs: readonly string[] }>
  }
  return [
    record.metaTitle,
    record.metaDescription,
    record.title,
    record.lead,
    ...(record.intro ?? []),
    ...(record.sections ?? []).flatMap((section) => [
      section.heading,
      ...section.paragraphs,
    ]),
  ]
    .filter((part) => part !== undefined)
    .join("\n")
}

describe("public pages", () => {
  it("keeps El Salvador on the local consulting pages", () => {
    expect(es.pages.consulting.metaTitle).toBe(
      "Consultoría de IA en El Salvador | Ai Labs"
    )
    expect(es.pages.consulting.title).toMatch(/El Salvador/)
    expect(es.pages.consulting.lead).toMatch(/San Salvador/)
    expect(en.pages.consulting.metaTitle).toBe(
      "AI consulting in El Salvador | Ai Labs"
    )
    expect(en.pages.consulting.path).toBe("/ai-consulting-el-salvador")
    expect(en.meta.title).not.toMatch(/Latin America/)
    expect(pageBody(es.pages.consulting)).not.toMatch(/centroam[eé]rica/i)
    expect(pageBody(en.pages.consulting)).not.toMatch(/central america/i)
  })

  it("gives each search intent its own language URL", () => {
    for (const pair of LANGUAGE_PAIRS) {
      const spanish = Object.values(es.pages).find(
        (page) => "path" in page && page.path === pair.es
      )
      const english = Object.values(en.pages).find(
        (page) => "path" in page && page.path === pair.en
      )
      expect(spanish, pair.es).toBeDefined()
      expect(english, pair.en).toBeDefined()
      expect(pair.es).not.toBe(pair.en)
    }
  })

  it("names the community and the events without a bare comunidad title", () => {
    expect(es.pages.community.metaTitle).toMatch(/Comunidad de IA/)
    expect(es.pages.community.metaTitle).toMatch(/El Salvador/)
    expect(es.pages.community.title).not.toBe("Comunidad")
    expect(en.pages.community.metaTitle).toBe(
      "AI community in El Salvador | Ai Labs"
    )
    expect(es.pages.events.metaTitle).toBe(
      "Eventos tech en El Salvador | Ai Labs"
    )
    expect(es.pages.events.metaDescription).toMatch(/Eventos de IA/)
    expect(en.pages.events.metaTitle).toBe(
      "Tech events in El Salvador | Ai Labs"
    )
    expect(en.pages.events.path).toBe("/tech-events-el-salvador")
  })

  it("keeps Central America on the regional pages only", () => {
    for (const page of [
      es.pages.communityRegion,
      es.pages.eventsRegion,
      es.pages.consultingRegion,
    ]) {
      expect(page.areaName).toBe("Centroamérica")
      expect(page.metaTitle).toMatch(/Centroamérica/)
    }
    for (const page of [
      en.pages.communityRegion,
      en.pages.eventsRegion,
      en.pages.consultingRegion,
    ]) {
      expect(page.areaName).toBe("Central America")
      expect(page.metaTitle).toMatch(/Central America/)
      expect(page.metaTitle).not.toMatch(/Latin America/)
    }
    for (const page of [
      es.pages.consulting,
      es.pages.training,
      es.pages.automation,
      es.pages.events,
      es.pages.community,
    ]) {
      expect(page.areaName).toBe("El Salvador")
      expect(pageBody(page)).not.toMatch(/centroam[eé]rica/i)
    }
  })

  it("does not invent other countries, clients, or attendance", () => {
    const published = JSON.stringify({ es: es.pages, en: en.pages })
    expect(published).not.toMatch(bannedPlace)
    expect(published).not.toMatch(/top 3|#1|número uno/i)
    expect(published).not.toMatch(/208|800\+|140|145/)
    expect(JSON.stringify(es.pages.events)).toMatch(
      /Universidad Francisco Gavidia/
    )
    expect(JSON.stringify(es.pages.events)).toMatch(/Guatemala/)
    expect(es.pages.events.upcoming[0]?.href).toBe("https://devday.ailabs.sv/")
    expect(es.pages.eventsRegion.past.map((event) => event.name)).toContain(
      "Zero to Agent"
    )
  })

  it("keeps footer profiles aligned with organization sameAs", () => {
    for (const content of [en, es]) {
      expect(
        content.chrome.footer.socials.map((social) => social.href).sort()
      ).toEqual([...ORGANIZATION_SAME_AS].sort())
    }
  })
})
