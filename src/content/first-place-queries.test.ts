import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { buildEventsIndexHead } from "@/lib/events-index-head"
import { buildFaqJsonLd, buildServicePageJsonLd } from "@/lib/seo"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"

const SITE = "https://www.ailabs.sv"

/**
 * Each page keeps one query in four slots: title, meta description, H1 and
 * the first FAQ. Everything else on the page is written for the buyer, not
 * for the search engine.
 */
const QUERIES = {
  consulting: {
    query: "consultoría de IA en El Salvador",
    title: "Consultoría de IA en El Salvador | Ai Labs",
    h1: "Consultoría de IA en El Salvador",
    firstQuestion: "¿Qué hace un consultor de IA?",
  },
  automation: {
    query: "software a medida para empresas en El Salvador",
    title: "Automatización con IA para empresas en El Salvador | Ai Labs",
    h1: "Automatización de procesos y software a medida",
    firstQuestion: "¿Qué es la automatización de procesos con IA?",
  },
  training: {
    query: "capacitación y cursos de IA para equipos en El Salvador",
    title: "Capacitación en IA para equipos en El Salvador | Ai Labs",
    h1: "Capacitación en IA para equipos",
    firstQuestion: "¿Qué es una capacitación práctica en IA?",
  },
} as const

const EVENTS_TITLE = "Talleres y eventos de IA en San Salvador | Ai Labs"

describe("search queries, one per page", () => {
  it("keeps the query in the title, the description and the first FAQ", () => {
    for (const [id, slot] of Object.entries(QUERIES) as Array<
      [keyof typeof QUERIES, (typeof QUERIES)[keyof typeof QUERIES]]
    >) {
      const page = es.servicePages[id]
      expect(page.metaTitle).toBe(slot.title)
      expect(page.metaTitle.length).toBeLessThanOrEqual(60)
      expect(page.title).toBe(slot.h1)
      expect(page.metaDescription.toLowerCase()).toContain(
        slot.query.toLowerCase()
      )
      expect(page.metaDescription.length).toBeGreaterThanOrEqual(110)
      expect(page.metaDescription.length).toBeLessThanOrEqual(160)
      expect(page.faq[0].question).toBe(slot.firstQuestion)
      expect(page.faq.length).toBeLessThanOrEqual(5)
    }
    expect(es.events.metaTitle).toBe(EVENTS_TITLE)
    expect(es.events.metaDescription).toContain("San Salvador")
    expect(en.servicePages.consulting.title).toBe(
      "AI consulting in El Salvador"
    )
    expect(en.servicePages.automation.title).toBe(
      "AI process automation and custom software"
    )
  })

  it("drops the agency query and every query-shaped sentence", () => {
    // Legal texts are rewritten in their own change; everything else is live copy.
    const text = JSON.stringify({
      es: { ...es, legal: undefined },
      en: { ...en, legal: undefined },
    })
    expect(text).not.toMatch(/agencia nacional|national agency/i)
    expect(text).not.toMatch(/se presenta como l[ií]der|presents itself as/i)
    expect(text).not.toMatch(/\bAcademy\b|\bAgentic\b|\bAperture\b/)
    expect(text).not.toMatch(/campus leader/i)
    expect(text).not.toMatch(/centroam[eé]rica|central america/i)
    expect(text).not.toMatch(/\$|\bUSD\b/)
  })

  it("names one place per block, not per sentence", () => {
    for (const content of [es, en]) {
      expect(content.home.hero.lead.match(/El Salvador/g)?.length ?? 0).toBe(1)
      expect(content.home.hero.headline).not.toMatch(/Salvador/)
      for (const item of content.home.faq.items) {
        expect(item.answer).not.toMatch(/San Salvador, El Salvador/)
      }
    }
  })

  it("mirrors the first FAQ in JSON-LD and keeps the service URLs in llms.txt", () => {
    for (const id of Object.keys(QUERIES) as Array<keyof typeof QUERIES>) {
      const page = es.servicePages[id]
      const faq = buildFaqJsonLd(page.faq).children
      expect(faq).toContain(page.faq[0]?.answer)
      const ld = buildServicePageJsonLd({
        locale: "es",
        path: SERVICE_PAGE_PATHS[id],
        title: page.metaTitle,
        description: page.metaDescription,
        serviceName: page.serviceName,
        homeLabel: es.servicePages.homeLabel,
      }).children
      expect(ld).toContain(`${SITE}${SERVICE_PAGE_PATHS[id]}`)
      expect(ld).toContain(page.serviceName)
    }

    const eventsHead = buildEventsIndexHead({
      locale: "es",
      events: es.events,
      now: new Date("2026-10-18T12:00:00.000Z"),
    })
    expect(
      eventsHead.meta.find((tag) => tag.name === "description")?.content
    ).toBe(es.events.metaDescription)

    const llms = readFileSync("public/llms.txt", "utf8")
    for (const path of Object.values(SERVICE_PAGE_PATHS)) {
      expect(llms).toContain(`${SITE}${path}`)
      expect(llms).toContain(`${SITE}/en${path}`)
    }
    expect(llms).toContain(`${SITE}/events`)
    expect(llms).toContain(`${SITE}/en/events`)
    expect(llms).toContain(`${SITE}/agendar`)
    for (const id of Object.keys(QUERIES) as Array<keyof typeof QUERIES>) {
      expect(llms).toContain(es.servicePages[id].faq[0].question)
    }
    expect(llms).not.toMatch(/agencia nacional|campus leader|aperture/i)
  })
})
