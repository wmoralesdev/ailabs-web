import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"

function walk(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    return statSync(path).isDirectory() ? walk(path) : [path]
  })
}

describe("performance guards", () => {
  it("resolves the locale without a server round trip on client navigation", () => {
    const root = readFileSync("src/routes/__root.tsx", "utf8")
    const locale = readFileSync("src/lib/locale-preference.ts", "utf8")
    expect(root).toContain(
      "beforeLoad: ({ location }) => resolveLocaleContext(location.pathname)"
    )
    expect(locale).toMatch(/const resolveLocale = createIsomorphicFn\(\)/)
    expect(locale).not.toMatch(/resolveLocaleContext = createServerFn/)
  })

  it("ships no WebGL: bands print with the 2D halftone field", () => {
    const banner = readFileSync(
      "src/components/ui/canvas-reveal-banner.tsx",
      "utf8"
    )
    expect(banner).toContain("<HalftoneCanvas")
    const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
      dependencies: Record<string, string>
    }
    expect(pkg.dependencies.three).toBeUndefined()
  })

  it("ships a static services site: no auth, database or payment client", () => {
    const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
      scripts: Record<string, string>
    }
    const names = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies })
    expect(names.filter((name) => /clerk|prisma|neon|^pg$/.test(name))).toEqual(
      []
    )
    expect(pkg.scripts.build).toBe("vite build")
    expect(pkg.scripts.postinstall).toBeUndefined()
    const root = readFileSync("src/routes/__root.tsx", "utf8")
    expect(root).not.toContain("ClerkProvider")
    expect(root).not.toContain("Toaster")
    const start = readFileSync("src/start.ts", "utf8")
    expect(start).not.toMatch(/clerk/i)
  })

  it("loads carousel photos one slide ahead and prints logos without images", () => {
    const carousel = readFileSync(
      "src/components/home/home-media-carousel.tsx",
      "utf8"
    )
    expect(carousel).toContain("slideIndex <= loadedThrough")
    // Ambassador marks are inline halftone dots: no image requests at all.
    const trust = readFileSync("src/components/home/home-trust.tsx", "utf8")
    expect(trust).toContain("<HalftoneLogo")
    expect(trust).not.toContain("<img")
  })

  it("lazy-loads event photos below the hero", () => {
    const photo = readFileSync(
      "src/components/halftone/halftone-lens.tsx",
      "utf8"
    )
    expect(photo).toContain('loading={priority ? "eager" : "lazy"}')
  })

  it("keeps each carousel photo under 400 KB", () => {
    // Photos are resized to 1920px on the long edge before they are added.
    for (const path of walk("public/carousel")) {
      expect(statSync(path).size, path).toBeLessThan(400 * 1024)
    }
  })
})
