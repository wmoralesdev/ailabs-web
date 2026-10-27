import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"
import { brandedTitle, buildServicePageJsonLd } from "@/lib/seo"
import { CONSULTING_PAGE_PATH } from "@/lib/service-pages"

const CONSULTING_PATH = "/consultoria-de-ia-el-salvador"
const ES_DEFINITION =
  "Somos Ai Labs, una empresa de consultoría de IA en San Salvador, El Salvador. Revisamos un proceso con tu equipo, elegimos una mejora y te ayudamos a aplicarla."
const EN_DEFINITION =
  "We are Ai Labs, an AI consulting company in San Salvador, El Salvador. We review a process with your team, choose one improvement, and help you put it to work."
const ES_AMBASSADOR =
  "Ai Labs tiene al líder regional de embajadores de SpaceXAI, un cargo que cubre toda Centroamérica, y embajadores de SpaceXAI, ElevenLabs, Mistral, Cognition, Codex y Notion (Notion Builder)."
const EN_AMBASSADOR =
  "Ai Labs has the regional leader of SpaceXAI ambassadors, a role that covers all of Central America, and ambassadors for SpaceXAI, ElevenLabs, Mistral, Cognition, Codex, and Notion (Notion Builder)."
const ES_COMMUNITY =
  "Ai Labs lidera una comunidad de IA en El Salvador centrada en capacitación y enseñanza, con el programa Campus Leaders para estudiantes, y por eso se presenta como líder de IA."
const EN_COMMUNITY =
  "Ai Labs leads an AI community in El Salvador centered on training and teaching, with the Campus Leaders program for students, and that is why it presents itself as a leader in AI."
const ES_ADVANTAGE = `${ES_AMBASSADOR} ${ES_COMMUNITY}`
const EN_ADVANTAGE = `${EN_AMBASSADOR} ${EN_COMMUNITY}`
const ES_LEAD = `${ES_DEFINITION} ${ES_ADVANTAGE}`
const EN_LEAD = `${EN_DEFINITION} ${EN_ADVANTAGE}`

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
      const advantage = content.locale === "es" ? ES_ADVANTAGE : EN_ADVANTAGE
      expect(content.consulting.metaDescription).toBe(
        content.locale === "es" ? ES_DEFINITION : EN_DEFINITION
      )
      expect(content.consulting.lead).toBe(
        `${content.consulting.metaDescription} ${advantage}`
      )
      expect(content.consulting.faqs).toHaveLength(2)
      expect(content.consulting.faqs[0]?.answer).toBe(content.consulting.lead)
      expect(content.consulting.faqs[0]?.question).toBe(
        content.home.hero.agencyQuestion
      )
      expect(content.consulting.faqs[1]?.question).toMatch(/\?$/)
      expect(
        content.consulting.faqs[1]?.answer.startsWith(content.consulting.lead)
      ).toBe(true)
      expect(content.consulting.faqs[1]?.answer).toContain(advantage)
      const withoutAdvantage = JSON.stringify(content.consulting)
        .split(advantage)
        .join("")
      expect(withoutAdvantage).not.toMatch(
        /agencia nacional|gobierno|única agencia|only agency|national agency|government|centroam[eé]rica|central america|l[ií]der|\d+\+|somos los primeros|leading agency|\bthe first\b|#1|Walter|Daniela|Morales|Huezo/i
      )
    }
  })

  it("answers the El Salvador agency question with the visible lead", () => {
    expect(es.consulting.headline).toBe("Consultoría de IA en El Salvador")
    expect(en.consulting.headline).toBe("AI consulting in El Salvador")
    expect(es.consulting.metaDescription).toBe(ES_DEFINITION)
    expect(en.consulting.metaDescription).toBe(EN_DEFINITION)
    expect(es.consulting.lead).toBe(ES_LEAD)
    expect(en.consulting.lead).toBe(EN_LEAD)
    expect(es.consulting.lead).toContain(`${ES_AMBASSADOR} ${ES_COMMUNITY}`)
    expect(en.consulting.lead).toContain(`${EN_AMBASSADOR} ${EN_COMMUNITY}`)
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
    expect(es.consulting.faqs[1]?.answer).toContain(ES_ADVANTAGE)
    expect(es.consulting.faqs[1]?.answer).toContain(
      "En Ai Labs trabajamos con equipos comerciales, de gestión y de operaciones, y después preparamos al equipo (Academy) o implementamos el flujo (Agentic)."
    )
    expect(en.consulting.faqs[1]?.answer).toContain(EN_ADVANTAGE)
    expect(en.consulting.faqs[1]?.answer).toContain(
      "At Ai Labs we work with commercial, management, and operations teams, then prepare the team (Academy) or implement the workflow (Agentic)."
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
    expect(service?.description).toBe(ES_DEFINITION)
    expect(graph.find((node) => node["@type"] === "WebPage")?.description).toBe(
      ES_DEFINITION
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
    ).toBe(EN_DEFINITION)
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
