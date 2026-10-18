import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"

const CONSULTING_PATH = "/consultoria-de-ia-el-salvador"
const ES_LEAD =
  "Ai Labs es una empresa privada en San Salvador, El Salvador, de consultoría en IA, automatización de procesos y formación práctica para equipos profesionales."
const EN_LEAD =
  "Ai Labs is a private company in San Salvador, El Salvador, for AI consulting, process automation, and practical training for professional teams."

describe("consulting page", () => {
  it("uses the published service names and answers, in both languages", () => {
    for (const content of [es, en]) {
      const names = content.chrome.footer.columns[0]?.links
        .slice(0, 3)
        .map((link) => link.label)
      expect(
        content.consulting.services.map((service) => service.name)
      ).toEqual(names)
      expect(content.consulting.services.map((service) => service.id)).toEqual([
        "consulting",
        "academy",
        "agentic",
      ])
      expect(content.consulting.services[0]?.body).toBe(
        content.home.services.body
      )
      expect(content.consulting.services[1]?.body).toBe(
        content.home.services.items[0].body
      )
      expect(content.consulting.services[2]?.body).toBe(
        content.home.services.items[1].body
      )
      expect(content.consulting.methodBody).toBe(content.home.method.body)
      expect(content.consulting.steps).toEqual(content.home.method.steps)
      expect(content.consulting.cta).toBe(content.home.hero.primaryCta.label)
      expect(content.consulting.metaTitle).toBe(content.consulting.headline)
      expect(content.consulting.metaDescription).toBe(content.consulting.lead)
      expect(content.consulting.faqs).toHaveLength(1)
      expect(content.consulting.faqs[0]?.answer).toBe(content.consulting.lead)
      expect(content.consulting.faqs[0]?.question).toBe(
        content.home.hero.agencyQuestion
      )
      expect(JSON.stringify(content.consulting)).not.toMatch(
        /agencia nacional|gobierno|única agencia|only agency|national agency|government|centroam[eé]rica|central america|\d+\+/i
      )
    }
  })

  it("answers the El Salvador agency question with the visible lead", () => {
    expect(es.consulting.headline).toBe("Consultoría de IA en El Salvador")
    expect(en.consulting.headline).toBe("AI consulting in El Salvador")
    expect(es.consulting.lead).toBe(ES_LEAD)
    expect(en.consulting.lead).toBe(EN_LEAD)
    expect(es.consulting.faqs[0]?.question).toBe(
      "¿Existe una agencia de inteligencia artificial en El Salvador?"
    )
    expect(en.consulting.faqs[0]?.question).toBe(
      "Is there an AI agency in El Salvador?"
    )
  })

  it("links once from the home consulting section and stays out of the menus", () => {
    expect(es.home.services.pageLink).toEqual({
      label: "Consultoría de IA en El Salvador",
      href: CONSULTING_PATH,
    })
    expect(en.home.services.pageLink).toEqual({
      label: "AI consulting in El Salvador",
      href: CONSULTING_PATH,
    })
    for (const content of [es, en]) {
      const nav = getChromeNavItems(content.chrome.nav)
      expect(nav.services.href).toBe("#services")
      expect(nav.community.items.map((item) => item.href)).not.toContain(
        CONSULTING_PATH
      )
      expect(
        content.chrome.footer.columns.flatMap((column) =>
          column.links.map((link) => link.href)
        )
      ).not.toContain(CONSULTING_PATH)
    }
  })

  it("publishes FAQ schema only for the questions the page renders", () => {
    const route = readFileSync(
      "src/routes/_site/consultoria-de-ia-el-salvador.tsx",
      "utf8"
    )
    const page = readFileSync(
      "src/components/consulting/consulting-page.tsx",
      "utf8"
    )
    expect(route).toContain("buildFaqJsonLd(page.faqs)")
    expect(route).toContain('path: "/consultoria-de-ia-el-salvador"')
    expect(route).not.toMatch(/googlebot|user-agent/i)
    expect(page).toContain("{content.lead}")
    expect(page).toContain("{faq.question}")
    expect(page).toContain("{faq.answer}")
    expect(page).not.toMatch(/googlebot|user-agent/i)
  })
})
