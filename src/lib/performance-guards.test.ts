import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

import { describe, expect, it } from "vitest"

import {
  CLERK_ROUTE_PREFIXES,
  isClerkPath,
  needsClerkMiddleware,
} from "@/lib/clerk-scope"

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

  it("runs Clerk only for server functions and auth routes", () => {
    for (const path of [
      "/",
      "/community",
      "/campus-leader",
      "/aperture",
      "/consultoria-ia-el-salvador",
      "/events/modo-fundador",
      "/media",
      "/redeemable",
    ]) {
      expect(needsClerkMiddleware(path, "router"), path).toBe(false)
    }
    for (const path of [
      "/redeem",
      "/me",
      "/aperture/join",
      "/sign-in/factor-one",
      "/sign-up",
    ]) {
      expect(isClerkPath(path), path).toBe(true)
    }
    expect(needsClerkMiddleware("/", "serverFn")).toBe(true)

    const root = readFileSync("src/routes/__root.tsx", "utf8")
    expect(root).not.toContain("ClerkProvider")
    expect(root).not.toContain("Toaster")
    for (const prefix of CLERK_ROUTE_PREFIXES) {
      const file = {
        "/redeem": "src/routes/_site/redeem.tsx",
        "/me": "src/routes/_site/me.tsx",
        "/aperture/join": "src/routes/_site/aperture/join.tsx",
        "/sign-in": "src/routes/sign-in.$.tsx",
        "/sign-up": "src/routes/sign-up.$.tsx",
      }[prefix]
      const source = readFileSync(file, "utf8")
      expect(source, file).toContain("beforeLoad: ensureClerkDocument")
      expect(source, file).toContain("<ClerkAuth>")
    }
  })

  it("keeps event pages, toasts, and Clerk out of entry-bundle code paths", () => {
    // Footer and route loaders ship in the entry bundle.
    const footer = readFileSync("src/components/chrome/site-footer.tsx", "utf8")
    expect(footer).toContain('from "@/events/catalog"')
    expect(footer).not.toContain("@/events/registry")
    const guard = readFileSync("src/lib/clerk-document.ts", "utf8")
    expect(guard).not.toMatch(/@clerk/)
    for (const path of [
      "src/routes/_site/events/$slug.index.tsx",
      "src/routes/_site/events/$slug.success.tsx",
    ]) {
      const source = readFileSync(path, "utf8")
      expect(source, path).toMatch(
        /await import\(\s*"@\/events\/registry"\s*\)/
      )
    }
  })

  it("loads carousel photos one slide ahead and never preloads marquee logos", () => {
    const carousel = readFileSync(
      "src/components/home/home-media-carousel.tsx",
      "utf8"
    )
    expect(carousel).toContain("slideIndex <= loadedThrough")
    const trust = readFileSync("src/components/home/home-trust.tsx", "utf8")
    expect(trust).toContain('loading="lazy"')
  })

  it("keeps each carousel photo under 400 KB", () => {
    // Photos are resized to 1920px on the long edge before they are added.
    for (const path of walk("public/carousel")) {
      expect(statSync(path).size, path).toBeLessThan(400 * 1024)
    }
  })
})
