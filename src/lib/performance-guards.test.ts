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
  it("keeps server-only modules out of the router chunk every request boots", () => {
    // API route files are bundled into the router. A static import of a
    // `.server` module (satori, resvg, Prisma) loads it on every page request.
    for (const path of walk("src/routes/api")) {
      const source = readFileSync(path, "utf8")
      expect(source, path).not.toMatch(/^import .* from "[^"]+\.server"/m)
    }
  })

  it("resolves the locale without a server round trip on client navigation", () => {
    const root = readFileSync("src/routes/__root.tsx", "utf8")
    const locale = readFileSync("src/lib/locale-preference.ts", "utf8")
    expect(root).toContain("beforeLoad: () => resolveLocaleContext()")
    expect(locale).toMatch(/const resolveLocale = createIsomorphicFn\(\)/)
    expect(locale).not.toMatch(/resolveLocaleContext = createServerFn/)
  })

  it("loads three.js only when the canvas band is needed", () => {
    const banner = readFileSync(
      "src/components/ui/canvas-reveal-banner.tsx",
      "utf8"
    )
    expect(banner).not.toMatch(/^import .*canvas-reveal-effect/m)
    expect(banner).toContain('import("@/components/ui/canvas-reveal-effect")')
  })
})
