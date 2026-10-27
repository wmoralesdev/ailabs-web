import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"
import { brandedTitle, buildServicePageJsonLd } from "@/lib/seo"
import { CONSULTING_PAGE_PATH } from "@/lib/service-pages"

const CONSULTING_PATH = "/consultoria-de-ia-el-salvador"
const ES_LEAD =
  "Ai Labs es una empresa de consultoría de IA en San Salvador, El Salvador."
const EN_LEAD =
  "Ai Labs is an AI consulting company in San Salvador, El Salvador."

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
      expect(content.consulting.faqs).toHaveLength(2)
      expect(content.consulting.faqs[0]?.answer).toBe(content.consulting.lead)
      expect(content.consulting.faqs[0]?.question).toBe(
        content.home.hero.agencyQuestion
      )
      expect(content.consulting.faqs[1]?.question).toMatch(/\?$/)
      expect(
        content.consulting.faqs[1]?.answer.startsWith(content.consulting.lead)
      ).toBe(true)
      expect(JSON.stringify(content.consulting)).not.toMatch(
        /agencia nacional|gobierno|única agencia|only agency|national agency|government|centroam[eé]rica|central america|l[ií]der|\d+\+/i
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
    expect(es.consulting.faqs[1]?.question).toBe(
      "¿Qué es la consultoría de IA en El Salvador?"
    )
    expect(en.consulting.faqs[1]?.question).toBe(
      "What is AI consulting in El Salvador?"
    )
    expect(es.consulting.faqs[1]?.answer).toContain(
      "Con equipos comerciales, de gestión y de operaciones revisamos el trabajo, elegimos una oportunidad y después preparamos al equipo (Academy) o implementamos el flujo (Agentic), con revisión humana y documentación."
    )
    expect(es.consulting.faqs[1]?.answer).toContain(
      "Podés venir directamente a aprender, sin una empresa ni una consultoría previa."
    )
    expect(es.consulting.faqs[1]?.answer).toContain(
      "Los talleres públicos que hemos publicado son presenciales en San Salvador."
    )
    expect(es.consulting.faqs[1]?.answer).toContain(
      "Ai Labs no publica tarifas de consultoría porque primero revisamos el proceso y acordamos qué conviene mejorar."
    )
    expect(es.consulting.faqs[1]?.answer).toContain(
      es.home.faq.items.find((item) =>
        item.question.startsWith("¿Cómo empiezo")
      )?.answer
    )
    expect(en.consulting.faqs[1]?.answer).toContain(
      "With commercial, management, and operations teams, we review the work, choose one opportunity, and then prepare the team (Academy) or implement the workflow (Agentic), with human review and documentation."
    )
    expect(en.consulting.faqs[1]?.answer).toContain(
      "You can come directly to learn, with no company or prior consulting required."
    )
    expect(en.consulting.faqs[1]?.answer).toContain(
      "The public workshops we have published are in person in San Salvador."
    )
    expect(en.consulting.faqs[1]?.answer).toContain(
      "Ai Labs does not publish consulting prices because we first review the process and agree on what is worth improving."
    )
    expect(en.consulting.faqs[1]?.answer).toContain(
      en.home.faq.items.find((item) =>
        item.question.startsWith("How do I start")
      )?.answer
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

  it("uses the query as the anchor on public pages that did not already have it", () => {
    const esAnchor = "Consultoría de IA en El Salvador"
    const enAnchor = "AI consulting in El Salvador"
    expect(es.servicePages.consultingLink).toBe(esAnchor)
    expect(en.servicePages.consultingLink).toBe(enAnchor)
    for (const [content, anchor] of [
      [es, esAnchor],
      [en, enAnchor],
    ] as const) {
      expect(content.community.consultingCta).toEqual({
        label: anchor,
        href: CONSULTING_PATH,
      })
      expect(content.campusLeader.consultingCta).toEqual({
        label: anchor,
        href: CONSULTING_PATH,
      })
      expect(content.events.consultingLink).toBe(anchor)
    }

    const community = readFileSync("src/routes/_site/community.tsx", "utf8")
    const campus = readFileSync("src/routes/_site/campus-leader.tsx", "utf8")
    const events = readFileSync(
      "src/components/events/events-index.tsx",
      "utf8"
    )
    for (const source of [community, campus, events]) {
      expect(source).toContain("CONSULTING_PAGE_PATH")
    }
    expect(community).toContain("{content.consultingCta.label}")
    expect(campus).toContain("{content.consultingCta.label}")
    expect(events).toContain("copy.consultingLink")
    expect(readFileSync("src/components/home/home-hero.tsx", "utf8")).toContain(
      "textLink?"
    )
  })

  it("publishes Service, breadcrumb, and FAQ schema for the questions the page renders", () => {
    const route = readFileSync(
      "src/routes/_site/consultoria-de-ia-el-salvador.tsx",
      "utf8"
    )
    const page = readFileSync(
      "src/components/consulting/consulting-page.tsx",
      "utf8"
    )
    expect(route).toContain("buildServicePageJsonLd({")
    expect(route).toContain("buildFaqJsonLd(page.faqs)")
    expect(route).toContain("brandedTitle(page.metaTitle)")
    expect(route).toContain("CONSULTING_PAGE_PATH")
    expect(route).not.toMatch(/googlebot|user-agent/i)
    expect(page).toContain("{content.lead}")
    expect(page).toContain("{faq.question}")
    expect(page).toContain("{faq.answer}")
    expect(page).not.toMatch(/googlebot|user-agent/i)

    const script = buildServicePageJsonLd({
      locale: "es",
      path: CONSULTING_PAGE_PATH,
      title: brandedTitle(es.consulting.metaTitle),
      description: es.consulting.metaDescription,
      serviceName: es.consulting.headline,
      homeLabel: es.servicePages.homeLabel,
    })
    const graph = JSON.parse(script.children)["@graph"] as Array<{
      "@type": string
      name?: string
      url?: string
      description?: string
      inLanguage?: string
    }>
    expect(graph.map((node) => node["@type"])).toEqual([
      "WebPage",
      "Service",
      "BreadcrumbList",
    ])
    const service = graph.find((node) => node["@type"] === "Service")
    expect(service?.url).toBe(`https://www.ailabs.sv${CONSULTING_PATH}`)
    expect(service?.name).toBe(es.consulting.headline)
    expect(service?.description).toBe(ES_LEAD)
    expect(graph.find((node) => node["@type"] === "WebPage")?.description).toBe(
      ES_LEAD
    )
    expect(graph.find((node) => node["@type"] === "WebPage")?.inLanguage).toBe(
      "es"
    )

    const english = JSON.parse(
      buildServicePageJsonLd({
        locale: "en",
        path: CONSULTING_PAGE_PATH,
        title: brandedTitle(en.consulting.metaTitle),
        description: en.consulting.metaDescription,
        serviceName: en.consulting.headline,
        homeLabel: en.servicePages.homeLabel,
      }).children
    )["@graph"] as Array<{ "@type": string; description?: string }>
    expect(
      english.find((node) => node["@type"] === "Service")?.description
    ).toBe(EN_LEAD)
    expect(JSON.stringify(graph)).not.toMatch(
      /centroam[eé]rica|central america|l[ií]der/i
    )
    expect(brandedTitle(es.consulting.metaTitle)).toBe(
      "Consultoría de IA en El Salvador | Ai Labs"
    )
    expect(brandedTitle(en.consulting.metaTitle)).toBe(
      "AI consulting in El Salvador | Ai Labs"
    )
  })
})
