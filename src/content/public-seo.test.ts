import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { SEARCH_ALIASES } from "@/lib/search-aliases"

const REMOVED_PATHS = [
  "/comunidad-de-ia-el-salvador",
  "/comunidad-de-ia-centroamerica",
  "/eventos-tech-centroamerica",
  "/consultoria-de-ia-centroamerica",
  "/consultoria-de-ia",
  "/capacitacion-ia",
  "/automatizacion-con-ia",
  "/ai-community-el-salvador",
  "/tech-events-el-salvador",
  "/ai-community-central-america",
  "/tech-events-central-america",
  "/ai-consulting-central-america",
  "/ai-consulting-el-salvador",
  "/ai-training-el-salvador",
  "/ai-automation-el-salvador",
  "/eventos",
  "/enlaces",
]

const ANSWER_ENGINE_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "PerplexityBot",
  "ClaudeBot",
  "Google-Extended",
  "Googlebot",
]

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    if (statSync(path).isDirectory()) {
      return walk(path)
    }
    return path
  })
}

/**
 * Whole path only. `/eventos` does not match `/eventos-tech-el-salvador`,
 * and `/modo-fundador` does not match `/events/modo-fundador`.
 */
function containsPath(haystack: string, path: string): boolean {
  const escaped = path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
  return new RegExp(`(?<![a-z0-9-])${escaped}(?![a-z0-9-])`).test(haystack)
}

describe("public SEO files", () => {
  const sitemap = readFileSync("public/sitemap.xml", "utf8")
  const llms = readFileSync("public/llms.txt", "utf8")
  const robots = readFileSync("public/robots.txt", "utf8")

  it("does not publish the keyword landing URLs from PR 17", () => {
    const published = `${sitemap}\n${llms}\n${robots}`
    const pageSources = walk("src")
      .filter(
        (path) =>
          (path.endsWith(".ts") || path.endsWith(".tsx")) &&
          !path.endsWith("public-seo.test.ts") &&
          !path.endsWith("search-aliases.ts") &&
          !path.endsWith("search-aliases.test.ts")
      )
      .map((path) => readFileSync(path, "utf8"))
      .join("\n")
    for (const path of REMOVED_PATHS) {
      expect(containsPath(published, path)).toBe(false)
      expect(containsPath(pageSources, path)).toBe(false)
    }
    for (const alias of Object.keys(SEARCH_ALIASES)) {
      expect(containsPath(published, alias)).toBe(false)
      expect(containsPath(pageSources, alias)).toBe(false)
    }
  })

  it("lists only real pages on the www host", () => {
    expect(sitemap).toContain("https://www.ailabs.sv/")
    expect(sitemap).toContain(
      "https://www.ailabs.sv/consultoria-de-ia-el-salvador"
    )
    expect(sitemap).toContain("https://www.ailabs.sv/community")
    expect(sitemap).toContain("https://www.ailabs.sv/campus-leader")
    expect(sitemap).not.toContain("https://www.ailabs.sv/aperture")
    expect(sitemap).toContain("<loc>https://www.ailabs.sv/events</loc>")
    expect(sitemap).toMatch(
      /<loc>https:\/\/www\.ailabs\.sv\/<\/loc>\s*<lastmod>2026-10-28<\/lastmod>/
    )
    expect(sitemap).toMatch(
      /<loc>https:\/\/www\.ailabs\.sv\/consultoria-de-ia-el-salvador<\/loc>\s*<lastmod>2026-10-28<\/lastmod>/
    )
    expect(sitemap).toMatch(
      /<loc>https:\/\/www\.ailabs\.sv\/capacitacion-ia-el-salvador<\/loc>\s*<lastmod>2026-10-28<\/lastmod>/
    )
    expect(sitemap).toMatch(
      /<loc>https:\/\/www\.ailabs\.sv\/automatizacion-ia-el-salvador<\/loc>\s*<lastmod>2026-10-28<\/lastmod>/
    )
    expect(sitemap).toMatch(
      /<loc>https:\/\/www\.ailabs\.sv\/events<\/loc>\s*<lastmod>2026-10-28<\/lastmod>/
    )
    expect(sitemap).not.toContain("https://www.ailabs.sv/events/modo-fundador")
    expect(sitemap).not.toContain(
      "https://www.ailabs.sv/events/get-competitive-quick"
    )
    expect(llms).toContain(
      "Taller Modo Fundador (15 ago 2026, ya realizado): https://www.ailabs.sv/events/modo-fundador"
    )
    expect(llms).toContain(
      "Taller Get Competitive Quick (mid-agosto 2026; la fecha no se confirmó): https://www.ailabs.sv/events/get-competitive-quick"
    )
    expect(sitemap).toContain('hreflang="es"')
    expect(sitemap).toContain('hreflang="en"')
    expect(sitemap).toContain('hreflang="x-default"')
    expect(sitemap).toContain("<loc>https://www.ailabs.sv/en</loc>")
    expect(sitemap).toContain(
      "<loc>https://www.ailabs.sv/en/consultoria-de-ia-el-salvador</loc>"
    )
    expect(sitemap).toContain(
      'xmlns:xhtml="http://www.w3.org/1999/xhtml"'
    )
    expect(sitemap).not.toContain("https://ailabs.sv/")
    expect(llms).toContain("https://www.linkedin.com/company/ai-labs-sv")
    expect(llms).toContain("https://x.com/ailabs_sv")
    expect(llms).toContain("https://www.instagram.com/ailabs_sv/")
    expect(llms).toContain(
      "https://www.ailabs.sv/consultoria-de-ia-el-salvador"
    )
    expect(llms).toContain("San Salvador")
    expect(llms).toContain("https://www.ailabs.sv/events")
    expect(llms).toContain("https://www.ailabs.sv/en/events")
    expect(llms).toContain(
      "Publicamos los eventos de IA en El Salvador de Ai Labs en Luma para este mes, en San Salvador; no son todos los eventos del país."
    )
    expect(llms).toMatch(/no describen un área de servicio de centroamérica/i)
    const llmsWithoutRole = llms
      .replace(
        /Esa regla no aplica al cargo de líder regional de embajadores de SpaceXAI: ese cargo cubre toda Centroamérica\. /i,
        ""
      )
      .replace(
        /That rule does not apply to the SpaceXAI ambassador regional-lead role: that role covers all of Central America\. /i,
        ""
      )
    expect(llmsWithoutRole).not.toMatch(
      /cubre centroamérica|covers central america/i
    )
    expect(llms).toContain(
      "Ai Labs es una empresa privada en San Salvador, El Salvador."
    )
    expect(llms).toContain(
      "Ai Labs is a private company in San Salvador, El Salvador."
    )
    expect(llms).toContain(
      "Ai Labs es una empresa de consultoría de IA en San Salvador, El Salvador."
    )
    expect(llms).toContain(
      "Ai Labs is an AI consulting company in San Salvador, El Salvador."
    )
  })

  it("lets answer-engine crawlers fetch the public site", () => {
    const group = robots
      .split(/\n\s*\n/)
      .find((block) =>
        ANSWER_ENGINE_BOTS.every((bot) => block.includes(`User-agent: ${bot}`))
      )
    expect(group).toBeDefined()
    expect(group).toContain("Allow: /")
    expect(group).not.toContain("Disallow:")
    expect(robots).toContain("Sitemap: https://www.ailabs.sv/sitemap.xml")
  })
})

describe("existing page answers", () => {
  it("opens the home, community, and campus pages with a direct answer", () => {
    for (const content of [es, en]) {
      expect(content.home.hero.body.length).toBeGreaterThan(40)
      expect(content.home.services.title).toMatch(/\?$/)
      expect(content.home.method.title).toMatch(/\?$/)
      expect(content.community.headline).toMatch(/\?$/)
      expect(content.community.body).toBe(content.community.metaDescription)
      expect(content.campusLeader.headline).toMatch(/\?$/)
      expect(content.campusLeader.body).toBe(
        content.campusLeader.metaDescription
      )
    }
    expect(es.home.hero.body).toMatch(/San Salvador/)
    expect(en.home.hero.body).toMatch(/San Salvador/)
    expect(es.home.hero.directAnswer).toBe(
      "Somos Ai Labs, una empresa privada en San Salvador, El Salvador. Ayudamos a equipos comerciales, de gestión y de operaciones a mejorar procesos reales con IA."
    )
    expect(en.home.hero.directAnswer).toBe(
      "We are Ai Labs, a private company in San Salvador, El Salvador. We help commercial, management, and operations teams improve real processes with AI."
    )
    expect(es.home.hero.agencyQuestion).toBe(
      "¿Existe una agencia de inteligencia artificial en El Salvador?"
    )
    expect(es.home.hero.directAnswer).not.toMatch(
      /agencia nacional|gobierno|única agencia|only agency/i
    )
    expect(en.home.hero.directAnswer).not.toMatch(
      /national agency|government|only agency/i
    )
    expect(JSON.stringify(es.home)).not.toMatch(/centroam[eé]rica/i)
    expect(JSON.stringify(en.home)).not.toMatch(/central america/i)
    const homeRoute = readFileSync("src/routes/_site/index.tsx", "utf8")
    const hero = readFileSync("src/components/home/home-hero.tsx", "utf8")
    expect(homeRoute).toContain("home.hero.agencyQuestion")
    expect(homeRoute).toContain("home.hero.directAnswer")
    expect(homeRoute).toContain(
      "organizationDescription: home.hero.directAnswer"
    )
    expect(homeRoute).toContain("path: CONSULTING_PAGE_PATH")
    expect(homeRoute).toContain("path: SERVICE_PAGE_PATHS.training")
    expect(homeRoute).toContain("path: SERVICE_PAGE_PATHS.automation")
    expect(es.meta.title).toBe(
      "Consultoría en IA, automatización y formación práctica | Ai Labs"
    )
    expect(es.home.hero.headline).toBe(
      "Consultoría en IA, automatización de procesos y formación práctica."
    )
    expect(es.home.trust.label).toBe("Somos parte de programas de embajadores")
    expect(en.meta.title).toBe(
      "AI consulting, automation and practical education | Ai Labs"
    )
    expect(en.home.hero.headline).toBe(
      "AI consulting, business automation and practical education."
    )
    expect(en.home.trust.label).toBe("Part of ambassador programs")
    expect(hero).toContain("{hero.directAnswer}")
    expect(hero).toContain("hero.headline")
  })
})

describe("home FAQ", () => {
  it("keeps both languages in parity and quotable on their own", () => {
    expect(es.home.faq.items.length).toBe(en.home.faq.items.length)
    for (const content of [es, en]) {
      for (const item of content.home.faq.items) {
        expect(item.question).toMatch(/\?$/)
        expect(item.answer.split(/\s+/).length).toBeLessThanOrEqual(70)
        expect(item.answer).not.toMatch(/US\$|USD|\$\d/)
      }
      const text = JSON.stringify(content.home.faq)
      expect(text).not.toMatch(/centroam[eé]rica|central america/i)
    }
  })

  it("renders the FAQ visibly and mirrors it in the JSON-LD and llms.txt", () => {
    const homeRoute = readFileSync("src/routes/_site/index.tsx", "utf8")
    expect(homeRoute).toContain("<HomeFaq faq={home.faq} />")
    expect(homeRoute).toContain("...home.faq.items")
    const llms = readFileSync("public/llms.txt", "utf8")
    expect(llms).toContain("https://www.ailabs.sv/#faq")
    expect(llms).toContain(
      "Es el nombre de la comunidad de Ai Labs: talleres, eventos y el programa Campus Leaders para estudiantes. Unirse por WhatsApp es gratis."
    )
    expect(llms).toContain(
      "La comunidad de Ai Labs en El Salvador es un grupo de WhatsApp para aprender IA: avisos de talleres y eventos, y el programa Campus Leaders para estudiantes."
    )
    expect(llms).toContain(
      "Un Campus Leader es un estudiante, uno por universidad en El Salvador, que lleva los talleres de IA de Ai Labs a su campus y elige cuáles llegan."
    )
    expect(llms).toContain(
      "The Ai Labs community in El Salvador is a WhatsApp group for learning AI: notices of workshops and events, and the Campus Leaders program for students."
    )
    expect(llms).toContain(
      "A Campus Leader is a student, one per university in El Salvador, who brings Ai Labs AI workshops to campus and chooses which ones arrive."
    )
  })

  it("describes the community as training and teaching, in both languages", () => {
    expect(es.community.body).toBe(
      "Nuestra comunidad en El Salvador es un grupo de WhatsApp para aprender IA: avisos de talleres y eventos, y el programa Campus Leaders para estudiantes."
    )
    expect(en.community.body).toBe(
      "Our community in El Salvador is a WhatsApp group for learning AI: notices of workshops and events, and the Campus Leaders program for students."
    )
    expect(es.campusLeader.body).toBe(
      "Un Campus Leader es un estudiante, uno por universidad en El Salvador, que lleva nuestros talleres de IA a su campus y elige cuáles llegan."
    )
    expect(en.campusLeader.body).toBe(
      "A Campus Leader is a student, one per university in El Salvador, who brings our AI workshops to campus and chooses which ones arrive."
    )
    const apertureEs = es.home.faq.items.find((item) =>
      item.question.startsWith("¿Qué es Aperture")
    )
    const apertureEn = en.home.faq.items.find((item) =>
      item.question.startsWith("What is Aperture")
    )
    expect(apertureEs?.answer).toBe(
      "Aperture es el nombre de nuestra comunidad: talleres, eventos y el programa Campus Leaders para estudiantes. Unirse por WhatsApp es gratis."
    )
    expect(apertureEn?.answer).toBe(
      "Aperture is the name of our community: workshops, events, and the Campus Leaders program for students. Joining on WhatsApp is free."
    )
    for (const content of [es, en]) {
      const text = [
        content.community.body,
        content.campusLeader.body,
        ...content.home.faq.items.map((item) => item.answer),
      ].join("\n")
      expect(text).not.toMatch(/centroam[eé]rica|central america/i)
      expect(text).not.toMatch(/m[aá]s activ|ranking|number one|#1/i)
    }
  })
})
