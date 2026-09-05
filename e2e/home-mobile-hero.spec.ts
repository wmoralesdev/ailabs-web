import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { expect, test } from "@playwright/test"
import type { BrowserContext, Page } from "@playwright/test"

const BASE_URL = "http://localhost:3000"
const evidenceDir = () => test.info().outputPath("evidence")
const copy = {
  es: {
    headline:
      "Consultoría en IA, automatización de procesos y formación práctica.",
    talk: "Hablemos",
    explore: "Explorar servicios",
    spiral: "Animar la espiral de texto",
  },
  en: {
    headline: "AI consulting, business automation and practical education.",
    talk: "Let’s talk",
    explore: "Explore services",
    spiral: "Animate the text spiral",
  },
} as const
type Locale = keyof typeof copy

const viewports = [
  { width: 320, height: 900 },
  { width: 360, height: 900 },
  { width: 390, height: 844 },
  { width: 768, height: 900 },
  { width: 1024, height: 900 },
  { width: 1440, height: 900 },
]

test.use({
  baseURL: BASE_URL,
  colorScheme: "light",
  trace: "retain-on-failure",
})

async function blockWrites(context: BrowserContext) {
  const writes: string[] = []
  await context.route("**/*", async (route) => {
    const request = route.request()
    const url = new URL(request.url())
    if (!["localhost", "127.0.0.1"].includes(url.hostname)) {
      await route.abort("blockedbyclient")
    } else if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      if (url.pathname !== "/__tsd/console-pipe")
        writes.push(`${request.method()} ${url.pathname}`)
      await route.abort("blockedbyclient")
    } else {
      await route.continue()
    }
  })
  return writes
}

async function openHome(page: Page, locale: Locale, hydrate = true) {
  await page
    .context()
    .addCookies([{ name: "ailabs-locale", value: locale, url: BASE_URL }])
  await page.goto("/", { waitUntil: "domcontentloaded" })
  await expect(page.locator("html")).toHaveAttribute("lang", locale)
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    copy[locale].headline
  )
  if (hydrate) {
    await page.waitForFunction(() => {
      const track = document.querySelector<HTMLElement>(
        ".home-trust-marquee-track"
      )
      return (
        track &&
        Number.parseFloat(track.style.getPropertyValue("--trust-duration")) > 0
      )
    })
  }
  await page.evaluate(() => document.fonts.ready)
  const words = page.locator("h1 [data-home-word]")
  if (await words.count()) {
    await expect(words.last()).toHaveCSS("opacity", "1")
    await expect(words.last()).toHaveCSS("transform", "none")
  }
}

async function screenshot(page: Page, name: string) {
  await mkdir(evidenceDir(), { recursive: true })
  await page.screenshot({ path: path.join(evidenceDir(), name) })
}

async function noOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    page: document.documentElement.scrollWidth - window.innerWidth,
    headings: [
      ...document.querySelectorAll<HTMLElement>("main h1, main h2, main h3"),
    ]
      .filter((element) => element.scrollWidth > element.clientWidth + 1)
      .map((element) => element.textContent),
  }))
  expect(dimensions.page).toBeLessThanOrEqual(1)
  expect(dimensions.headings).toEqual([])
}

async function mobileHero(page: Page, locale: Locale) {
  const hero = page.locator("main section").first()
  await expect(
    hero.getByRole("link", { name: "Ai Labs", exact: true })
  ).toBeInViewport({ ratio: 1 })
  await expect(page.locator("[data-home-spiral] canvas")).toHaveCount(0)
  await expect(
    page.getByRole("button", { name: copy[locale].spiral, exact: true })
  ).toHaveCount(0)
  await expect(hero.getByRole("heading", { level: 1 })).toBeInViewport({
    ratio: 1,
  })
  await expect(
    hero.getByRole("button", { name: copy[locale].talk, exact: true })
  ).toBeInViewport({ ratio: 1 })
  const secondary = hero.getByRole("link", {
    name: copy[locale].explore,
    exact: true,
  })
  await expect(secondary).toBeInViewport({ ratio: 1 })
  await expect(secondary).toHaveAttribute("href", /^\/?#services$/)
  const metrics = await hero.evaluate((element) => {
    const box = element.getBoundingClientRect()
    return {
      height: box.height,
      viewport: window.innerHeight,
      bottom: box.bottom,
    }
  })
  expect(
    metrics.height,
    "Mobile hero should use natural height, leaving the next section reachable"
  ).toBeLessThan(metrics.viewport)
  return metrics
}

for (const locale of ["es", "en"] as const) {
  for (const viewport of viewports) {
    test(`mobile hero: ${locale} at ${viewport.width}x${viewport.height}`, async ({
      page,
      context,
    }) => {
      const writes = await blockWrites(context)
      const errors: string[] = []
      page.on("pageerror", (error) => errors.push(error.message))
      await page.setViewportSize(viewport)
      await openHome(page, locale)
      await noOverflow(page)
      if (viewport.width < 1024) {
        const metrics = await mobileHero(page, locale)
        await mkdir(evidenceDir(), { recursive: true })
        await writeFile(
          path.join(evidenceDir(), `metrics-${locale}-${viewport.width}.json`),
          JSON.stringify(metrics, null, 2)
        )
      } else {
        await expect(
          page.locator("[data-home-spiral] canvas").first()
        ).toBeAttached()
        await expect(
          page.getByRole("button", { name: copy[locale].spiral, exact: true })
        ).toBeVisible()
      }
      await screenshot(
        page,
        `hero-${locale}-${viewport.width}x${viewport.height}.png`
      )
      if (viewport.width === 390) {
        const hero = page.locator("main section").first()
        const talk = hero.getByRole("button", {
          name: copy[locale].talk,
          exact: true,
        })
        await talk.click()
        await expect(page.getByRole("dialog")).toBeVisible()
        await expect(
          page.locator('input[name="interest"][value="discovery"]')
        ).toBeChecked()
        await page.keyboard.press("Escape")
        await expect(page.getByRole("dialog")).toHaveCount(0)
        await expect(talk).toBeFocused()
        await hero
          .getByRole("link", { name: copy[locale].explore, exact: true })
          .click()
        await expect(page).toHaveURL(/#services$/)
        await expect(page.locator("#services")).toBeInViewport()
      }
      expect(errors).toEqual([])
      expect(writes).toEqual([])
    })
  }
}

test("mobile hero: desktop engine stops below breakpoint and restarts without duplicate canvases", async ({
  page,
  context,
}) => {
  const writes = await blockWrites(context)
  const errors: string[] = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.setViewportSize({ width: 1440, height: 900 })
  await openHome(page, "es")
  const canvases = page.locator("[data-home-spiral] canvas")
  await expect(canvases.first()).toBeAttached()
  const originalCount = await canvases.count()
  expect(originalCount).toBeGreaterThan(0)
  for (const viewport of [
    { width: 390, height: 844 },
    { width: 1024, height: 900 },
    { width: 768, height: 900 },
    { width: 1440, height: 900 },
  ]) {
    await page.setViewportSize(viewport)
    if (viewport.width < 1024) {
      await mobileHero(page, "es")
    } else {
      await expect(canvases.first()).toBeAttached()
      const spiral = page.getByRole("button", {
        name: copy.es.spiral,
        exact: true,
      })
      await expect(spiral).toBeVisible()
      await spiral.click()
      if (viewport.width === 1440)
        await expect(canvases).toHaveCount(originalCount)
    }
    await noOverflow(page)
  }
  await screenshot(page, "breakpoint-return-desktop-1440.png")
  await page.setViewportSize({ width: 390, height: 844 })
  await mobileHero(page, "es")
  await screenshot(page, "breakpoint-return-mobile-390.png")
  expect(errors).toEqual([])
  expect(writes).toEqual([])
})

test.describe("mobile hero: reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } })
  for (const locale of ["es", "en"] as const) {
    test(`${locale} stays legible on mobile and static on desktop`, async ({
      page,
      context,
    }) => {
      const writes = await blockWrites(context)
      await page.setViewportSize({ width: 390, height: 844 })
      await openHome(page, locale)
      await mobileHero(page, locale)
      await noOverflow(page)
      await screenshot(page, `hero-${locale}-reduced-390.png`)
      await page.setViewportSize({ width: 1440, height: 900 })
      await expect(
        page.locator("[data-home-spiral] canvas").first()
      ).toBeAttached()
      const moving = await page
        .locator("[data-home-spiral] canvas")
        .evaluateAll(
          (elements) =>
            elements.filter(
              (element) =>
                element.parentElement &&
                getComputedStyle(element.parentElement).animationName !== "none"
            ).length
        )
      expect(moving).toBe(0)
      await noOverflow(page)
      expect(writes).toEqual([])
    })
  }
})

test.describe("mobile hero: no JavaScript", () => {
  test.use({ javaScriptEnabled: false })
  for (const locale of ["es", "en"] as const) {
    test(`${locale} mobile SSR shows copy and links without the dark panel`, async ({
      page,
      context,
    }) => {
      const writes = await blockWrites(context)
      await page.setViewportSize({ width: 390, height: 844 })
      await openHome(page, locale, false)
      await mobileHero(page, locale)
      await noOverflow(page)
      await screenshot(page, `hero-${locale}-no-js-390.png`)
      expect(writes).toEqual([])
    })
  }
})
