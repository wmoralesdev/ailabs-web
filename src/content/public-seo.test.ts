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
    expect(sitemap).toContain("https://www.ailabs.sv/community")
    expect(sitemap).toContain("https://www.ailabs.sv/campus-leader")
    expect(sitemap).toContain("https://www.ailabs.sv/aperture")
    expect(sitemap).toContain("<loc>https://www.ailabs.sv/events</loc>")
    expect(sitemap).toContain("https://www.ailabs.sv/events/modo-fundador")
    expect(sitemap).toContain(
      "https://www.ailabs.sv/events/get-competitive-quick"
    )
    expect(sitemap).not.toContain("hreflang")
    expect(sitemap).not.toContain("https://ailabs.sv/")
    expect(llms).toContain("https://www.linkedin.com/company/ai-labs-sv")
    expect(llms).toContain("https://x.com/ailabs_sv")
    expect(llms).toContain("https://www.instagram.com/ailabs_sv/")
    expect(llms).toContain("San Salvador")
    expect(llms).toContain(
      "https://www.ailabs.sv/events. Estos son los eventos de Ai Labs publicados en Luma para este mes. La sede está en San Salvador; no son todos los eventos del país."
    )
    expect(llms).toMatch(/no describen un área de servicio de centroamérica/i)
    expect(llms).not.toMatch(/cubre centroamérica|covers central america/i)
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
  it("opens the home, community, campus, and member pages with a direct answer", () => {
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
      expect(content.aperture.directory.headline).toMatch(/\?$/)
      expect(content.aperture.directory.body).toBe(
        content.aperture.directory.metaDescription
      )
    }
    expect(es.home.hero.body).toMatch(/San Salvador/)
    expect(en.home.hero.body).toMatch(/San Salvador/)
    expect(es.home.hero.directAnswer).toBe(
      "Ai Labs es una empresa privada en San Salvador, El Salvador: consultoría en IA, automatización y formación práctica."
    )
    expect(en.home.hero.directAnswer).toBe(
      "Ai Labs is a private company in San Salvador, El Salvador, for AI consulting, automation, and practical education."
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
    expect(hero).toContain("{hero.directAnswer}")
  })
})
