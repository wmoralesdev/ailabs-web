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

const RETIRED_PAGES = [
  "https://www.ailabs.sv/campus-leader",
  "https://www.ailabs.sv/en/campus-leader",
  "https://www.ailabs.sv/events/modo-fundador",
  "https://www.ailabs.sv/events/get-competitive-quick",
  "https://www.ailabs.sv/redeem",
  "https://www.ailabs.sv/aperture",
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

  it("lists only real pages on the www host, in both languages", () => {
    const pages = [
      "",
      "/consultoria-de-ia-el-salvador",
      "/capacitacion-ia-el-salvador",
      "/automatizacion-ia-el-salvador",
      "/events",
      "/agendar",
      "/community",
    ]
    for (const path of pages) {
      expect(sitemap).toContain(
        `<loc>https://www.ailabs.sv${path || "/"}</loc>`
      )
      expect(sitemap).toContain(`<loc>https://www.ailabs.sv/en${path}</loc>`)
    }
    expect(sitemap).toMatch(
      /<loc>https:\/\/www\.ailabs\.sv\/<\/loc>\s*<lastmod>2026-11-01<\/lastmod>/
    )
    expect(sitemap).toContain('hreflang="es"')
    expect(sitemap).toContain('hreflang="en"')
    expect(sitemap).toContain('hreflang="x-default"')
    expect(sitemap).toContain('xmlns:xhtml="http://www.w3.org/1999/xhtml"')
    expect(sitemap).not.toContain("https://ailabs.sv/")
    for (const retired of RETIRED_PAGES) {
      expect(containsPath(sitemap, retired)).toBe(false)
      expect(containsPath(llms, retired)).toBe(false)
    }
  })

  it("describes the company for machines in the third person, without hype", () => {
    expect(llms).toContain(
      "Ai Labs es una empresa privada en San Salvador, El Salvador."
    )
    expect(llms).toContain(
      "Ai Labs is a private company in San Salvador, El Salvador."
    )
    expect(llms).toContain("https://www.linkedin.com/company/ai-labs-sv")
    expect(llms).toContain("https://x.com/ailabs_sv")
    expect(llms).toContain("https://www.instagram.com/ailabs_sv/")
    expect(llms).toContain("https://www.ailabs.sv/#faq")
    expect(llms).toContain("https://www.ailabs.sv/#metodo")
    expect(llms).toContain("No publica precios")
    expect(llms).not.toMatch(
      /agencia nacional|campus leader|aperture|academy|agentic/i
    )
    expect(llms).not.toMatch(/\bsomos\b|\bwe are\b/i)
    expect(llms).not.toMatch(/[–—]/)
    expect(llms).toContain("## Preguntas frecuentes")
    expect(llms).toContain("¿Cuánto cuesta?")
    expect(llms).toContain("¿Qué hace un consultor de IA?")
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

describe("home copy", () => {
  it("speaks to the buyer in one headline and one lead, with no disclaimers", () => {
    for (const content of [es, en]) {
      const { hero } = content.home
      expect(hero.headline.length).toBeLessThanOrEqual(55)
      expect(hero.lead.length).toBeLessThanOrEqual(160)
      expect(hero.lead).toMatch(/El Salvador/)
      expect(JSON.stringify(content.home)).not.toMatch(
        /agencia nacional|national agency|gobierno|government|centroam[eé]rica|central america/i
      )
      expect(content.meta.title.length).toBeLessThanOrEqual(60)
      expect(content.meta.description.length).toBeGreaterThanOrEqual(110)
      expect(content.meta.description.length).toBeLessThanOrEqual(160)
    }
    expect(es.meta.title).toBe(
      "Ai Labs · Automatización, software e IA para empresas"
    )
    expect(es.home.hero.headline).toBe(
      "Menos trabajo manual en tu empresa. Más control."
    )
    expect(en.home.hero.headline).toBe(
      "Less manual work in your company. More control."
    )
    const hero = readFileSync("src/components/home/home-hero.tsx", "utf8")
    expect(hero).toContain("{hero.lead}")
    expect(hero).toContain("hero.headline")
    expect(hero).not.toContain("agencyAnswer")
  })

  it("keeps the FAQ to five visible answers, mirrored in JSON-LD and llms.txt", () => {
    expect(es.home.faq.items.length).toBe(en.home.faq.items.length)
    expect(es.home.faq.items.length).toBeLessThanOrEqual(5)
    for (const content of [es, en]) {
      for (const item of content.home.faq.items) {
        expect(item.question).toMatch(/\?$/)
        expect(item.answer.length).toBeLessThanOrEqual(220)
        expect(item.answer).not.toMatch(/US\$|USD|\$\d/)
      }
    }
    const homeRoute = readFileSync("src/routes/_site/index.tsx", "utf8")
    expect(homeRoute).toContain("<HomeFaq faq={home.faq} />")
    expect(homeRoute).toContain("buildFaqJsonLd([...home.faq.items])")
    const faq = readFileSync("src/components/home/home-faq.tsx", "utf8")
    expect(faq).toContain("{item.answer}")
    expect(faq).not.toMatch(/<details|aria-expanded/)
  })
})
