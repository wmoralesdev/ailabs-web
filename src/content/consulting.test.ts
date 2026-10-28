import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { getChromeNavItems } from "@/components/chrome/chrome-nav-items"
import { brandedTitle, buildServicePageJsonLd } from "@/lib/seo"
import { CONSULTING_PAGE_PATH } from "@/lib/service-pages"

const CONSULTING_PATH = "/consultoria-de-ia-el-salvador"
const ES_LEAD =
  "En Ai Labs hacemos consultoría de inteligencia artificial en El Salvador, desde San Salvador: tenemos al líder regional de embajadores de SpaceXAI, un cargo que cubre toda Centroamérica, y embajadores de SpaceXAI, ElevenLabs, Mistral, Cognition, Codex y Notion (Notion Builder)."
const EN_LEAD =
  "We are Ai Labs, an AI consulting company in San Salvador, El Salvador. We review a process with your team, choose one improvement, and help you put it to work."
const ES_KEPT =
  "Somos Ai Labs, una empresa de consultoría de IA en San Salvador, El Salvador. Revisamos un proceso con tu equipo, elegimos una mejora y te ayudamos a aplicarla."
const ES_META =
  "En Ai Labs hacemos consultoría de inteligencia artificial en El Salvador, desde San Salvador: revisamos tu proceso y te ayudamos a aplicarla."

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
      expect(content.consulting.faqs).toHaveLength(5)
      expect(content.consulting.claims).toHaveLength(3)
      for (const faq of content.consulting.faqs) {
        expect(faq.question).toMatch(/\?$/)
      }
      const withoutFacts = [
        content.consulting.lead,
        ...content.consulting.claims,
        ...content.consulting.faqs.map((faq) => faq.answer),
      ]
        .join("\n")
        .replaceAll(ES_LEAD, "")
        .replaceAll(
          "We do artificial intelligence consulting in El Salvador, from San Salvador: we have the regional leader of SpaceXAI ambassadors, a role that covers all of Central America, and ambassadors for SpaceXAI, ElevenLabs, Mistral, Cognition, Codex, and Notion (Notion Builder).",
          ""
        )
        .replaceAll(
          "Si buscás una agencia de inteligencia artificial en El Salvador, en Ai Labs somos una firma privada de consultoría en San Salvador y no somos la Agencia Nacional de Inteligencia Artificial.",
          ""
        )
        .replaceAll(
          "If you are looking for an artificial intelligence agency in El Salvador, at Ai Labs we are a private consulting firm in San Salvador. We are not the National Artificial Intelligence Agency.",
          ""
        )
        .replaceAll(
          "En Ai Labs podés aprender IA en El Salvador con talleres prácticos en San Salvador: lideramos una comunidad de capacitación y enseñanza, Campus Leaders es para estudiantes, y Ai Labs se presenta como líder de IA.",
          ""
        )
      expect(withoutFacts).not.toMatch(
        /gobierno|única agencia|only agency|government|\d+\+|somos los primeros|leading agency|\bthe first\b|#1|Walter|Daniela|Morales|Huezo/i
      )
    }
  })

  it("answers the El Salvador agency question with the visible lead", () => {
    expect(es.consulting.headline).toBe("Consultoría de IA en El Salvador")
    expect(en.consulting.headline).toBe("AI consulting in El Salvador")
    expect(es.consulting.lead).toBe(ES_LEAD)
    expect(en.consulting.lead).toBe(EN_LEAD)
    expect(es.consulting.metaDescription).toBe(ES_META)
    expect(en.consulting.metaDescription).toBe(EN_LEAD)
    expect(es.consulting.claims[0]).toBe(ES_KEPT)
    const esWhat = es.consulting.faqs.find(
      (faq) => faq.question === "¿Qué es la consultoría de IA en El Salvador?"
    )
    const enWhat = en.consulting.faqs.find(
      (faq) => faq.question === "What is AI consulting in El Salvador?"
    )
    expect(esWhat?.answer).toBe(
      "Es revisar con un equipo cómo trabaja hoy, elegir una mejora y aplicarla con IA. En Ai Labs trabajamos con equipos comerciales, de gestión y de operaciones, y después preparamos al equipo (Academy) o implementamos el flujo (Agentic). No publicamos tarifas de consultoría; los talleres públicos sí muestran su precio."
    )
    expect(enWhat?.answer).toBe(
      "It means reviewing how a team works today, choosing one improvement, and applying it with AI. At Ai Labs we work with commercial, management, and operations teams, then prepare the team (Academy) or implement the workflow (Agentic). We do not publish consulting prices; public workshops do list theirs."
    )
    expect(
      es.consulting.faqs.find(
        (faq) =>
          faq.question ===
          "¿Existe una agencia de inteligencia artificial en El Salvador?"
      )?.answer
    ).toBe(es.home.hero.agencyAnswer)
    expect(
      en.consulting.faqs.find(
        (faq) => faq.question === "Is there an AI agency in El Salvador?"
      )?.answer
    ).toBe(en.home.hero.agencyAnswer)
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
    expect(service?.description).toBe(ES_META)
    expect(graph.find((node) => node["@type"] === "WebPage")?.description).toBe(
      ES_META
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
