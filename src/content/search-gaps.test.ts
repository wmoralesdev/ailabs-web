import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { buildEventsIndexHead } from "@/lib/events-index-head"
import { buildFaqJsonLd, buildServicePageJsonLd } from "@/lib/seo"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"

const CONSULTING = "/consultoria-de-ia-el-salvador"
const TRAINING = "/capacitacion-ia-el-salvador"
const AUTOMATION = "/automatizacion-ia-el-salvador"
const EVENTS = "/events"

const CONSULTING_INTELLIGENCE =
  "Hacemos consultoría de inteligencia artificial en El Salvador, desde San Salvador: revisamos tu proceso, elegimos una mejora y te ayudamos a aplicarla."
const COMPANY =
  "Somos una empresa de IA en El Salvador: una empresa privada de consultoría en San Salvador."
const AGENCY =
  "Si buscás una agencia de inteligencia artificial en El Salvador, somos una firma privada de consultoría en San Salvador. No somos la Agencia Nacional de Inteligencia Artificial."
const COURSES =
  "Los cursos de IA en El Salvador que damos son prácticos, sobre las tareas reales de tu trabajo, presenciales en San Salvador, y podés venir sin una empresa."
const WORKSHOPS =
  "Los talleres de inteligencia artificial en San Salvador son presenciales: practicás con tu propio trabajo y podés venir a aprender sin una empresa."
const LEARN =
  "En Ai Labs podés aprender IA en El Salvador con talleres prácticos en San Salvador; Campus Leaders es para estudiantes, y podés venir a aprender sin una empresa."
const AUTOMATION_COMPANIES =
  "Hacemos automatización con IA para empresas en El Salvador: diseñamos el flujo con tu equipo en San Salvador, con revisión humana y documentación."
const AUTOMATION_PROCESSES =
  "La automatización de procesos con IA en San Salvador la armamos con tus herramientas, y las decisiones importantes siguen en tus manos."
const AUTOMATION_WHO =
  "Somos Ai Labs, en San Salvador, El Salvador, y automatizamos procesos con IA para empresas: diseñamos el flujo con tu equipo, con revisión humana y documentación."
const EVENTS_SENTENCE =
  "Publicamos los eventos de IA en El Salvador de Ai Labs en Luma para este mes, en San Salvador; no son todos los eventos del país."

const KEPT_LEAD =
  "Somos Ai Labs, una empresa de consultoría de IA en San Salvador, El Salvador. Revisamos un proceso con tu equipo, elegimos una mejora y te ayudamos a aplicarla."

function faqAnswer(
  items: ReadonlyArray<{ question: string; answer: string }>,
  question: string
) {
  return items.find((item) => item.question === question)?.answer
}

describe("search gaps", () => {
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

  it("keeps the queries that already rank first", () => {
    expect(es.consulting.headline).toBe("Consultoría de IA en El Salvador")
    expect(es.consulting.lead).toBe(KEPT_LEAD)
    expect(es.consulting.metaDescription).toBe(KEPT_LEAD)
    expect(es.consulting.faqs[0]?.answer).toBe(KEPT_LEAD)
    expect(en.consulting.headline).toBe("AI consulting in El Salvador")
    expect(en.consulting.lead).toBe(
      "We are Ai Labs, an AI consulting company in San Salvador, El Salvador. We review a process with your team, choose one improvement, and help you put it to work."
    )
    expect(es.community.metaTitle).toBe("Comunidad de IA en El Salvador")
    expect(es.home.faq.items[0]?.question).toBe("¿Qué hace un consultor de IA?")
    expect(es.home.faq.items[0]?.answer).toBe(
      "Revisa cómo trabaja un equipo, encuentra dónde puede ayudar la IA y decide por dónde empezar. En Ai Labs, después de elegir una oportunidad, preparamos al equipo (Academy) o implementamos el flujo con ustedes (Agentic)."
    )
  })

  it("puts one sentence per gap on the matching page and in its FAQ", () => {
    expect(es.consulting.claims).toEqual([
      CONSULTING_INTELLIGENCE,
      COMPANY,
      AGENCY,
    ])
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
        "¿Buscás una agencia de inteligencia artificial en San Salvador?"
      )
    ).toBe(AGENCY)

    const training = es.servicePages.training
    expect(training.claims).toEqual([COURSES, WORKSHOPS, LEARN])
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
    expect(training.metaDescription).toContain("cursos de IA en El Salvador")
    expect(training.metaDescription).toContain(
      "talleres de inteligencia artificial en San Salvador"
    )

    const automation = es.servicePages.automation
    expect(automation.claims).toEqual([
      AUTOMATION_COMPANIES,
      AUTOMATION_PROCESSES,
      AUTOMATION_WHO,
    ])
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
    expect(automation.metaDescription).toContain(
      "automatización con IA para empresas en El Salvador"
    )
    expect(automation.metaDescription).toContain(
      "automatización de procesos con IA en San Salvador"
    )

    expect(es.events.intro).toBe(EVENTS_SENTENCE)
    expect(es.events.metaDescription).toBe(EVENTS_SENTENCE)
    expect(es.events.headline).toBe("Eventos de Ai Labs en El Salvador")

    expect(en.consulting.claims).toHaveLength(es.consulting.claims.length)
    expect(en.servicePages.training.claims).toHaveLength(training.claims.length)
    expect(en.servicePages.training.faq).toHaveLength(training.faq.length)
    expect(en.servicePages.automation.claims).toHaveLength(
      automation.claims.length
    )
    expect(en.servicePages.automation.faq).toHaveLength(automation.faq.length)
    expect(en.consulting.faqs).toHaveLength(es.consulting.faqs.length)
  })

  it("renders the sentences beside the opening and in the existing JSON-LD", () => {
    const consultingPage = readFileSync(
      "src/components/consulting/consulting-page.tsx",
      "utf8"
    )
    const servicePage = readFileSync(
      "src/components/marketing/service-page.tsx",
      "utf8"
    )
    expect(consultingPage).toContain("content.claims.map")
    expect(servicePage).toContain("page.claims.map")

    const consultingFaq = buildFaqJsonLd(es.consulting.faqs).children
    expect(consultingFaq).toContain(COMPANY)
    expect(consultingFaq).toContain(AGENCY)
    expect(consultingFaq).toContain(CONSULTING_INTELLIGENCE)

    const trainingFaq = buildFaqJsonLd(es.servicePages.training.faq).children
    expect(trainingFaq).toContain(LEARN)
    expect(trainingFaq).toContain(COURSES)
    expect(trainingFaq).toContain(WORKSHOPS)

    const automationFaq = buildFaqJsonLd(
      es.servicePages.automation.faq
    ).children
    expect(automationFaq).toContain(AUTOMATION_WHO)
    expect(automationFaq).toContain("San Salvador")
    expect(automationFaq).toContain("El Salvador")

    const trainingLd = buildServicePageJsonLd({
      locale: "es",
      path: SERVICE_PAGE_PATHS.training,
      title: es.servicePages.training.metaTitle,
      description: es.servicePages.training.metaDescription,
      serviceName: es.servicePages.training.serviceName,
      homeLabel: es.servicePages.homeLabel,
    }).children
    expect(trainingLd).toContain("cursos de IA en El Salvador")
    expect(trainingLd).toContain(TRAINING)

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
    expect(automationLd).toContain(AUTOMATION)

    const eventsHead = buildEventsIndexHead({
      locale: "es",
      events: es.events,
      now: new Date("2026-10-18T12:00:00.000Z"),
    })
    const description = eventsHead.meta.find(
      (tag) => tag.name === "description"
    )?.content
    expect(description).toBe(EVENTS_SENTENCE)
    expect(eventsHead.scripts[0]?.children).toContain(EVENTS_SENTENCE)

    expect(CONSULTING).toBe("/consultoria-de-ia-el-salvador")
    expect(EVENTS).toBe("/events")
  })

  it("repeats the phrases in llms.txt and stays factual", () => {
    const llms = readFileSync("public/llms.txt", "utf8")
    for (const phrase of [
      "consultoría de inteligencia artificial en El Salvador",
      "empresa de IA en El Salvador",
      "agencia de inteligencia artificial en El Salvador",
      "No es la Agencia Nacional de Inteligencia Artificial.",
      "cursos de IA en El Salvador",
      "talleres de inteligencia artificial en San Salvador",
      "aprender IA en El Salvador",
      "Campus Leaders",
      "automatización con IA para empresas en El Salvador",
      "automatización de procesos con IA en San Salvador",
      "¿Qué empresa automatiza procesos con IA en El Salvador?",
      "eventos de IA en El Salvador",
      "https://www.ailabs.sv/consultoria-de-ia-el-salvador",
      "https://www.ailabs.sv/capacitacion-ia-el-salvador",
      "https://www.ailabs.sv/automatizacion-ia-el-salvador",
      "https://www.ailabs.sv/events",
    ]) {
      expect(llms).toContain(phrase)
    }

    const fresh = added.join("\n")
    expect(AGENCY).toContain(
      "No somos la Agencia Nacional de Inteligencia Artificial."
    )
    expect(fresh).not.toMatch(
      /walter|daniela|somos los primeros|agencia l[ií]der|#1|\bANIA\b|gobierno/i
    )
    expect(fresh).not.toMatch(/centroam[eé]rica/i)
  })
})
