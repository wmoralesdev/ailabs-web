import { existsSync, readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { buildServicePageJsonLd } from "@/lib/seo"
import { SERVICE_PAGE_IDS, SERVICE_PAGE_PATHS } from "@/lib/service-pages"

describe("service pages", () => {
  it("has a route, sitemap entry, and llms.txt link for each page", () => {
    const sitemap = readFileSync("public/sitemap.xml", "utf8")
    const llms = readFileSync("public/llms.txt", "utf8")
    for (const id of SERVICE_PAGE_IDS) {
      const path = SERVICE_PAGE_PATHS[id]
      expect(existsSync(`src/routes/_site${path}.tsx`)).toBe(true)
      expect(sitemap).toContain(`https://www.ailabs.sv${path}</loc>`)
      expect(llms).toContain(`https://www.ailabs.sv${path}`)
    }
  })

  it("keeps both languages in parity", () => {
    for (const id of SERVICE_PAGE_IDS) {
      const pageEs = es.servicePages[id]
      const pageEn = en.servicePages[id]
      expect(pageEs.faq.length).toBe(pageEn.faq.length)
      expect(pageEs.includes.length).toBe(pageEn.includes.length)
      expect(pageEs.steps.length).toBe(pageEn.steps.length)
      expect(pageEs.interest).toBe(pageEn.interest)
    }
  })

  it("follows the search template without prices, metrics, or other countries", () => {
    for (const content of [es, en]) {
      for (const id of SERVICE_PAGE_IDS) {
        const page = content.servicePages[id]
        expect(page.metaTitle.length).toBeLessThanOrEqual(72)
        expect(page.metaTitle).toMatch(/El Salvador/)
        expect(page.metaTitle).toMatch(/\| Ai Labs$/)
        expect(page.metaDescription.length).toBeGreaterThanOrEqual(110)
        expect(page.metaDescription.length).toBeLessThanOrEqual(160)
        expect(page.title).toMatch(/El Salvador/)
        expect(page.faq[0]?.answer).toBe(page.definition)
        for (const item of page.faq) {
          expect(item.question).toMatch(/\?$/)
          expect(item.answer.split(/\s+/).length).toBeLessThanOrEqual(70)
        }
        const text = JSON.stringify(page)
        expect(text).not.toMatch(/\$|\bUSD\b|\d+\+/)
        expect(text).not.toMatch(
          /centroam[eé]rica|central america|latinoam|latin america/i
        )
        expect(text).not.toMatch(/revolucion|revolutionary|empower|unlock/i)
      }
    }
  })

  it("is linked from the footer and the home services section", () => {
    for (const content of [es, en]) {
      const footer = content.chrome.footer.columns.flatMap((column) =>
        column.links.map((link) => link.href)
      )
      for (const path of Object.values(SERVICE_PAGE_PATHS)) {
        expect(footer).toContain(path)
      }
    }
    const services = readFileSync(
      "src/components/home/home-services.tsx",
      "utf8"
    )
    expect(services).toContain("servicePagePath[service.id]")
  })

  it("publishes Service and breadcrumb JSON-LD on the canonical URL", () => {
    const script = buildServicePageJsonLd({
      locale: "es",
      path: SERVICE_PAGE_PATHS.training,
      title: es.servicePages.training.metaTitle,
      description: es.servicePages.training.metaDescription,
      serviceName: es.servicePages.training.serviceName,
      homeLabel: es.servicePages.homeLabel,
    })
    const graph = JSON.parse(script.children)["@graph"] as Array<{
      "@type": string
      url?: string
      provider?: { "@id": string }
      itemListElement?: unknown[]
    }>
    const service = graph.find((node) => node["@type"] === "Service")
    expect(service?.url).toBe(
      "https://www.ailabs.sv/capacitacion-ia-el-salvador"
    )
    expect(service?.provider?.["@id"]).toBe(
      "https://www.ailabs.sv/#organization"
    )
    const crumbs = graph.find((node) => node["@type"] === "BreadcrumbList")
    expect(crumbs?.itemListElement).toHaveLength(2)
  })
})
