import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { buildEventsIndexHead } from "@/lib/events-index-head"
import { buildFaqJsonLd, buildServicePageJsonLd } from "@/lib/seo"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"

const CONSULTING = "https://www.ailabs.sv/consultoria-de-ia-el-salvador"
const TRAINING = "https://www.ailabs.sv/capacitacion-ia-el-salvador"
const AUTOMATION = "https://www.ailabs.sv/automatizacion-ia-el-salvador"
const EVENTS = "https://www.ailabs.sv/events"

const CONSULTING_INTELLIGENCE =
  "En Ai Labs hacemos consultoría de inteligencia artificial en El Salvador, desde San Salvador: tenemos al líder regional de embajadores de SpaceXAI, un cargo que cubre toda Centroamérica, y embajadores de SpaceXAI, ElevenLabs, Mistral, Cognition, Codex y Notion (Notion Builder)."
const KEPT_CONSULTING =
  "Somos Ai Labs, una empresa de consultoría de IA en San Salvador, El Salvador. Revisamos un proceso con tu equipo, elegimos una mejora y te ayudamos a aplicarla."
const COMPANY =
  "Ai Labs, en San Salvador, es una empresa de IA en El Salvador: una empresa privada de consultoría para equipos y profesionales."
const AGENCY =
  "Si buscás una agencia de inteligencia artificial en El Salvador, en Ai Labs somos una firma privada de consultoría en San Salvador y no somos la Agencia Nacional de Inteligencia Artificial."
const COURSES =
  "Los cursos de IA en El Salvador que damos son prácticos, sobre las tareas reales de tu trabajo, presenciales en San Salvador, y podés venir sin una empresa."
const WORKSHOPS =
  "Los talleres de inteligencia artificial en San Salvador son presenciales y prácticos: practicás con tu propio trabajo, podés venir sin una empresa, y Campus Leaders es para estudiantes."
const LEARN =
  "En Ai Labs podés aprender IA en El Salvador con talleres prácticos en San Salvador: lideramos una comunidad de capacitación y enseñanza, Campus Leaders es para estudiantes, y Ai Labs se presenta como líder de IA."
const AUTOMATION_COMPANIES =
  "Hacemos automatización con IA para empresas en El Salvador: diseñamos el flujo con tu equipo en San Salvador, con revisión humana y documentación."
const AUTOMATION_PROCESSES =
  "La automatización de procesos con IA en San Salvador la armamos con tus herramientas, y las decisiones importantes siguen en tus manos."
const AUTOMATION_WHO =
  "Ai Labs, en San Salvador, El Salvador, automatiza procesos con IA para empresas: diseñamos el flujo con tu equipo, con revisión humana y documentación."
const EVENTS_SENTENCE =
  "Publicamos los eventos de IA en El Salvador de Ai Labs en Luma para este mes, en San Salvador; no son todos los eventos del país."
const CONSULTOR =
  "Revisa cómo trabaja un equipo, encuentra dónde puede ayudar la IA y decide por dónde empezar. En Ai Labs, después de elegir una oportunidad, preparamos al equipo (Academy) o implementamos el flujo con ustedes (Agentic)."
const COMMUNITY =
  "Nuestra comunidad en El Salvador es un grupo de WhatsApp para aprender IA: avisos de talleres y eventos, y el programa Campus Leaders para estudiantes."
const EN_CONSULTING =
  "We are Ai Labs, an AI consulting company in San Salvador, El Salvador. We review a process with your team, choose one improvement, and help you put it to work."

function faqAnswer(
  items: ReadonlyArray<{ question: string; answer: string }>,
  question: string
) {
  return items.find((item) => item.question === question)?.answer
}

describe("first place queries", () => {
  const added = [
    CONSULTING_INTELLIGENCE,
    COMPANY,
    AGENCY,
    COURSES,
    WORKSHOPS,
    LEARN,
    AUTOMATION_COMPANIES,
    AUTOMATION_PROCESSES,
    AUTOMATION_WHO,
    EVENTS_SENTENCE,
  ]

  it("leaves the queries that already rank first alone", () => {
    expect(es.home.faq.items[0]?.question).toBe("¿Qué hace un consultor de IA?")
    expect(es.home.faq.items[0]?.answer).toBe(CONSULTOR)
    expect(en.consulting.headline).toBe("AI consulting in El Salvador")
    expect(en.consulting.lead).toBe(EN_CONSULTING)
    expect(en.consulting.metaDescription).toBe(EN_CONSULTING)
    expect(es.community.metaTitle).toBe("Comunidad de IA en El Salvador")
    expect(es.community.body).toBe(COMMUNITY)
    expect(es.community.metaDescription).toBe(COMMUNITY)
    expect(es.consulting.claims[0]).toBe(KEPT_CONSULTING)
  })

  it("puts one sentence per gap on the page, in its FAQ, and in the opening", () => {
    expect(es.consulting.lead).toBe(CONSULTING_INTELLIGENCE)
    expect(es.consulting.claims).toEqual([KEPT_CONSULTING, COMPANY, AGENCY])
    expect(
      faqAnswer(
        es.consulting.faqs,
        "¿Hacen consultoría de inteligencia artificial en El Salvador?"
      )
    ).toBe(CONSULTING_INTELLIGENCE)
    expect(
      faqAnswer(es.consulting.faqs, "¿Son una empresa de IA en El Salvador?")
    ).toBe(COMPANY)
    expect(
      faqAnswer(
        es.consulting.faqs,
        "¿Existe una agencia de inteligencia artificial en El Salvador?"
      )
    ).toBe(AGENCY)
    expect(es.home.hero.agencyAnswer).toBe(AGENCY)
    expect(es.home.hero.directAnswer.startsWith("Somos Ai Labs")).toBe(true)

    const training = es.servicePages.training
    expect(training.lead).toBe(COURSES)
    expect(training.claims).toEqual([WORKSHOPS, LEARN])
    expect(
      faqAnswer(training.faq, "¿Qué cursos de IA hay en El Salvador?")
    ).toBe(COURSES)
    expect(
      faqAnswer(
        training.faq,
        "¿Dónde son los talleres de inteligencia artificial en San Salvador?"
      )
    ).toBe(WORKSHOPS)
    expect(
      faqAnswer(training.faq, "¿Dónde puedo aprender IA en El Salvador?")
    ).toBe(LEARN)

    const automation = es.servicePages.automation
    expect(automation.lead).toBe(AUTOMATION_COMPANIES)
    expect(automation.claims).toEqual([AUTOMATION_PROCESSES, AUTOMATION_WHO])
    expect(
      faqAnswer(
        automation.faq,
        "¿Hay automatización con IA para empresas en El Salvador?"
      )
    ).toBe(AUTOMATION_COMPANIES)
    expect(
      faqAnswer(
        automation.faq,
        "¿Hay automatización de procesos con IA en San Salvador?"
      )
    ).toBe(AUTOMATION_PROCESSES)
    expect(
      faqAnswer(
        automation.faq,
        "¿Qué empresa automatiza procesos con IA en El Salvador?"
      )
    ).toBe(AUTOMATION_WHO)
    expect(AUTOMATION_WHO.startsWith("Ai Labs")).toBe(true)
    expect(COMPANY.startsWith("Ai Labs")).toBe(true)

    expect(es.events.intro).toBe(EVENTS_SENTENCE)
    expect(es.events.metaDescription).toBe(EVENTS_SENTENCE)
  })

  it("names Ai Labs, San Salvador, and El Salvador in the titles and descriptions that can hold them", () => {
    expect((es.consulting.metaTitle + " | Ai Labs").length).toBeLessThanOrEqual(
      60
    )
    expect(es.consulting.metaDescription).toContain(
      "consultoría de inteligencia artificial en El Salvador"
    )
    expect(es.consulting.metaDescription).toContain("Ai Labs")
    expect(es.consulting.metaDescription).toContain("San Salvador")
    expect(es.consulting.metaDescription.length).toBeGreaterThanOrEqual(110)
    expect(es.consulting.metaDescription.length).toBeLessThanOrEqual(160)

    expect(es.servicePages.training.metaTitle).toBe(
      "Cursos de IA en El Salvador, San Salvador | Ai Labs"
    )
    expect(es.servicePages.training.metaDescription).toContain(
      "cursos de IA en El Salvador"
    )
    expect(es.servicePages.training.metaDescription).toContain(
      "talleres de inteligencia artificial en San Salvador"
    )
    expect(es.servicePages.automation.metaTitle).toBe(
      "Automatización con IA para empresas en El Salvador | Ai Labs"
    )
    expect(es.servicePages.automation.metaDescription).toContain(
      "automatización con IA para empresas en El Salvador"
    )
    expect(es.servicePages.automation.metaDescription).toContain(
      "automatización de procesos con IA en San Salvador"
    )
    expect(es.events.metaTitle).toBe(
      "Eventos de IA de Ai Labs en San Salvador, El Salvador"
    )
    for (const description of [
      es.servicePages.training.metaDescription,
      es.servicePages.automation.metaDescription,
      es.events.metaDescription,
    ]) {
      expect(description).toContain("Ai Labs")
      expect(description).toContain("San Salvador")
      expect(description).toContain("El Salvador")
      expect(description.length).toBeGreaterThanOrEqual(110)
      expect(description.length).toBeLessThanOrEqual(160)
    }
  })

  it("repeats the sentences in the existing JSON-LD and llms.txt", () => {
    expect(
      readFileSync("src/components/consulting/consulting-page.tsx", "utf8")
    ).toContain("content.claims.map")
    expect(
      readFileSync("src/components/marketing/service-page.tsx", "utf8")
    ).toContain("page.claims.map")

    const consultingFaq = buildFaqJsonLd(es.consulting.faqs).children
    expect(consultingFaq).toContain(CONSULTING_INTELLIGENCE)
    expect(consultingFaq).toContain(COMPANY)
    expect(consultingFaq).toContain(AGENCY)
    expect(consultingFaq).toContain(KEPT_CONSULTING)

    const trainingFaq = buildFaqJsonLd(es.servicePages.training.faq).children
    expect(trainingFaq).toContain(COURSES)
    expect(trainingFaq).toContain(WORKSHOPS)
    expect(trainingFaq).toContain(LEARN)

    const automationFaq = buildFaqJsonLd(
      es.servicePages.automation.faq
    ).children
    expect(automationFaq).toContain(AUTOMATION_WHO)
    expect(automationFaq).toContain(AUTOMATION_COMPANIES)
    expect(automationFaq).toContain(AUTOMATION_PROCESSES)

    const trainingLd = buildServicePageJsonLd({
      locale: "es",
      path: SERVICE_PAGE_PATHS.training,
      title: es.servicePages.training.metaTitle,
      description: es.servicePages.training.metaDescription,
      serviceName: es.servicePages.training.serviceName,
      homeLabel: es.servicePages.homeLabel,
    }).children
    expect(trainingLd).toContain("cursos de IA en El Salvador")
    expect(trainingLd).toContain(TRAINING.replace("https://www.ailabs.sv", ""))

    const automationLd = buildServicePageJsonLd({
      locale: "es",
      path: SERVICE_PAGE_PATHS.automation,
      title: es.servicePages.automation.metaTitle,
      description: es.servicePages.automation.metaDescription,
      serviceName: es.servicePages.automation.serviceName,
      homeLabel: es.servicePages.homeLabel,
    }).children
    expect(automationLd).toContain(
      "automatización con IA para empresas en El Salvador"
    )

    const eventsHead = buildEventsIndexHead({
      locale: "es",
      events: es.events,
      now: new Date("2026-10-18T12:00:00.000Z"),
    })
    expect(
      eventsHead.meta.find((tag) => tag.name === "description")?.content
    ).toBe(EVENTS_SENTENCE)
    expect(eventsHead.scripts[0]?.children).toContain(EVENTS_SENTENCE)

    const llms = readFileSync("public/llms.txt", "utf8")
    for (const sentence of added) {
      expect(llms).toContain(sentence)
    }
    expect(llms).toContain(CONSULTING)
    expect(llms).toContain(TRAINING)
    expect(llms).toContain(AUTOMATION)
    expect(llms).toContain(EVENTS)
    expect(llms).toContain(
      "no somos la Agencia Nacional de Inteligencia Artificial"
    )
  })

  it("stays factual", () => {
    const fresh = added.join("\n")
    expect(fresh).not.toMatch(
      /walter|daniela|somos los primeros|agencia l[ií]der|#1|\bANIA\b|gobierno/i
    )
    expect(CONSULTING_INTELLIGENCE).toContain("Centroamérica")
    expect(LEARN).not.toMatch(/centroam[eé]rica/i)
    expect(AUTOMATION_WHO).not.toMatch(/centroam[eé]rica/i)
    expect(AGENCY).toContain("Agencia Nacional de Inteligencia Artificial")
  })
})
