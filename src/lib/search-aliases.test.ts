import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import {
  PUBLIC_PAGE_PATHS,
  SEARCH_ALIASES,
  aliasRedirectHref,
  searchAliasDestination,
} from "@/lib/search-aliases"

const HOME_ALIASES = [
  "/consultoria-ia-el-salvador",
  "/consultoria-de-ia-el-salvador",
  "/consultoria-el-salvador",
  "/agencia-ia-el-salvador",
  "/agencia-de-inteligencia-artificial-el-salvador",
  "/ia-el-salvador",
  "/inteligencia-artificial-el-salvador",
  "/ai-consulting-el-salvador",
  "/ai-agency-el-salvador",
  "/ai-el-salvador",
]

const OTHER_COUNTRY =
  /centroam[eé]rica|central-america|guatemala|honduras|nicaragua|costa-rica|panam[aá]|m[eé]xico|mexico|latinoam[eé]rica|latin-america|colombia|argentina|chile|peru|españa|spain/

describe("search aliases", () => {
  const entries = Object.entries(SEARCH_ALIASES)

  it("301s each alias to an existing public page and keeps the query", () => {
    expect(entries.length).toBeGreaterThan(0)
    expect(entries.length).toBeLessThanOrEqual(40)
    for (const [alias, destination] of entries) {
      expect(alias).toMatch(/^\/[a-z0-9-]+$/)
      expect(PUBLIC_PAGE_PATHS).toContain(destination)
      expect(alias).not.toBe(destination)
      expect(searchAliasDestination(alias)).toBe(destination)
      expect(searchAliasDestination(`${alias}/`)).toBe(destination)
      expect(searchAliasDestination(alias.toUpperCase())).toBe(destination)
      expect(aliasRedirectHref(alias, "?utm=search", "#services")).toBe(
        `${destination}?utm=search#services`
      )
    }
    expect(aliasRedirectHref("/consultoria-ia-el-salvador")).toBe("/")
    expect(
      searchAliasDestination("/consultoria-ia-el-salvador?utm=search")
    ).toBe("/")
    expect(searchAliasDestination("/consultores-el-salvador")).toBeNull()
    expect(searchAliasDestination("/community")).toBeNull()
    expect(searchAliasDestination("/en")).toBeNull()
    expect(searchAliasDestination("/es")).toBeNull()
  })

  it("uses the home, community, and event slugs Daniela named", () => {
    for (const alias of HOME_ALIASES) {
      expect(SEARCH_ALIASES[alias]).toBe("/")
    }
    expect(SEARCH_ALIASES["/comunidad-de-ia-el-salvador"]).toBe("/community")
    expect(SEARCH_ALIASES["/ai-community-el-salvador"]).toBe("/community")
    expect(SEARCH_ALIASES["/eventos-tech-el-salvador"]).toBe(
      "/events/modo-fundador"
    )
    expect(SEARCH_ALIASES["/tech-events-el-salvador"]).toBe(
      "/events/modo-fundador"
    )
    expect(SEARCH_ALIASES["/consultores-el-salvador"]).toBeUndefined()
  })

  it("does not invent another country, or a country the page does not name", () => {
    for (const alias of Object.keys(SEARCH_ALIASES)) {
      expect(alias).not.toMatch(OTHER_COUNTRY)
      expect(alias).not.toMatch(/consultores/)
    }
    for (const [alias, destination] of entries) {
      if (
        destination === "/aperture" ||
        destination === "/events/get-competitive-quick"
      ) {
        expect(alias).not.toMatch(/el-salvador|san-salvador/)
      }
    }
  })

  it("stays out of the sitemap, llms.txt, nav, and footer", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8")
    const llms = readFileSync("public/llms.txt", "utf8")
    const robots = readFileSync("public/robots.txt", "utf8")
    const published = `${sitemap}\n${llms}\n${robots}`
    const linked = [es, en].flatMap((content) => [
      content.chrome.nav.services.href,
      ...content.chrome.nav.community.items.map((item) => item.href),
      content.chrome.nav.contact.href,
      ...content.chrome.footer.columns.flatMap((column) =>
        column.links.map((link) => link.href)
      ),
      ...content.chrome.footer.legalLinks.map((link) => link.href),
    ])
    for (const alias of Object.keys(SEARCH_ALIASES)) {
      const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
      expect(published).not.toMatch(
        new RegExp(`(?<![a-z0-9-])${escaped}(?![a-z0-9-])`)
      )
      expect(linked).not.toContain(alias)
    }
  })

  it("is a server 301 on the existing locale matcher, not a second page", () => {
    const localeRoute = readFileSync("src/routes/$locale.tsx", "utf8")
    const start = readFileSync("src/start.ts", "utf8")
    const routeTree = readFileSync("src/routeTree.gen.ts", "utf8")
    expect(localeRoute).toContain("statusCode: 301")
    expect(localeRoute).toContain("aliasRedirectHref")
    expect(start).toContain("status: 301")
    expect(start).toContain("aliasRedirectHref")
    expect(`${localeRoute}\n${start}`).not.toMatch(/googlebot|user-agent/i)
    for (const alias of Object.keys(SEARCH_ALIASES)) {
      const segment = alias.slice(1)
      expect(routeTree).not.toContain(`path: '${segment}'`)
      expect(routeTree).not.toContain(`path: "${segment}"`)
    }
  })
})
