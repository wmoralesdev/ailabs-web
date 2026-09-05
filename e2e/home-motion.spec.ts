import { mkdir, writeFile } from "node:fs/promises"
import path from "node:path"

import { expect, test } from "@playwright/test"
import type { BrowserContext, Locator, Page } from "@playwright/test"

const BASE_URL = "http://localhost:3000"
const evidenceDir = () => test.info().outputPath("evidence")
const headlines = {
  es: "Consultoría en IA, automatización de procesos y formación práctica.",
  en: "AI consulting, business automation and practical education.",
} as const
const brands = [
  "SpaceXAI",
  "Codex",
  "OpenAI",
  "Claude",
  "Mistral",
  "ElevenLabs",
  "Notion",
]

test.use({
  baseURL: BASE_URL,
  colorScheme: "light",
  trace: "retain-on-failure",
  video: { mode: "on", size: { width: 1440, height: 900 } },
})

async function protectNetwork(context: BrowserContext) {
  const writes: string[] = []
  await context.route("**/*", async (route) => {
    const request = route.request()
    const url = new URL(request.url())
    if (!["127.0.0.1", "localhost"].includes(url.hostname)) {
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

async function openHome(
  page: Page,
  locale: keyof typeof headlines,
  hydrate = true
) {
  await page
    .context()
    .addCookies([{ name: "ailabs-locale", value: locale, url: BASE_URL }])
  await page.goto("/", { waitUntil: "domcontentloaded" })
  await expect(page.locator("html")).toHaveAttribute("lang", locale)
  await expect(page.getByRole("heading", { level: 1 })).toHaveAccessibleName(
    headlines[locale]
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
    if ((page.viewportSize()?.width ?? 0) >= 1024) {
      await expect(
        page.locator("[data-home-spiral] canvas").first()
      ).toBeAttached()
    }
  }
  await page.evaluate(() => document.fonts.ready)
}

async function saveScreenshot(page: Page, filename: string, fullPage = false) {
  await mkdir(evidenceDir(), { recursive: true })
  await page.screenshot({ path: path.join(evidenceDir(), filename), fullPage })
}

async function noOverflow(page: Page) {
  const measured = await page.evaluate(() => ({
    page: document.documentElement.scrollWidth - window.innerWidth,
    headings: [
      ...document.querySelectorAll<HTMLElement>("main h1, main h2, main h3"),
    ]
      .filter((el) => el.scrollWidth > el.clientWidth + 1)
      .map((el) => el.textContent),
  }))
  expect(measured.page).toBeLessThanOrEqual(1)
  expect(measured.headings).toEqual([])
}

async function settledWords(page: Page) {
  const words = page.locator("h1 [data-home-word]")
  await expect(words.last()).toHaveCSS("opacity", "1")
  await expect(words.last()).toHaveCSS("transform", "none")
  const metrics = await words.evaluateAll((elements) =>
    elements.map((el) => {
      const style = getComputedStyle(el)
      const box = el.getBoundingClientRect()
      return {
        text: el.textContent,
        opacity: Number(style.opacity),
        left: box.left,
        right: box.right,
        viewport: window.innerWidth,
      }
    })
  )
  expect(metrics.length).toBeGreaterThan(5)
  for (const word of metrics) {
    expect(word.opacity).toBe(1)
    expect(word.left).toBeGreaterThanOrEqual(0)
    expect(word.right).toBeLessThanOrEqual(word.viewport + 1)
  }
}

async function accessibleBrands(page: Page) {
  const trust = page.locator("#trust")
  await expect(trust.getByRole("list")).toHaveCount(1)
  await expect(trust.getByRole("listitem")).toHaveCount(7)
  const tree = await trust.ariaSnapshot()
  for (const brand of brands)
    expect(tree.split(brand).length - 1, brand).toBe(1)
}

async function trackSpeed(track: Locator, duration = 1000) {
  return track.evaluate(async (element, milliseconds) => {
    // CSS pause is applied asynchronously by the compositor. Wait for the
    // actual Animation readiness instead of sampling its pending pause frame.
    await Promise.all(
      element.getAnimations().map((animation) => animation.ready)
    )
    await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
    const read = () =>
      new DOMMatrixReadOnly(getComputedStyle(element).transform).m41
    const from = read()
    const start = performance.now()
    await new Promise<void>((resolve) => {
      const frame = () =>
        performance.now() - start >= milliseconds
          ? resolve()
          : requestAnimationFrame(frame)
      requestAnimationFrame(frame)
    })
    const elapsed = performance.now() - start
    const to = read()
    return {
      from,
      to,
      elapsed,
      pixelsPerSecond: (Math.abs(to - from) / elapsed) * 1000,
    }
  }, duration)
}

async function sampleNodes(nodes: Locator, duration: number) {
  return nodes.evaluateAll(async (elements, milliseconds) => {
    const frames: Array<{
      elapsed: number
      nodes: Array<{ opacity: number; transform: string; visible: boolean }>
    }> = []
    const start = performance.now()
    await new Promise<void>((resolve) => {
      const frame = () => {
        frames.push({
          elapsed: performance.now() - start,
          nodes: elements.map((el) => {
            const style = getComputedStyle(el)
            const rect = el.getBoundingClientRect()
            return {
              opacity: Number(style.opacity),
              transform: style.transform,
              visible: rect.bottom > 0 && rect.top < window.innerHeight,
            }
          }),
        })
        if (performance.now() - start >= milliseconds) resolve()
        else requestAnimationFrame(frame)
      }
      frame()
    })
    return frames
  }, duration)
}

for (const locale of ["es", "en"] as const) {
  for (const width of [360, 768, 1024, 1440]) {
    test(`motion: ${locale} word headline and trust accessibility at ${width}px`, async ({
      page,
      context,
    }) => {
      const writes = await protectNetwork(context)
      await page.setViewportSize({ width, height: 900 })
      await openHome(page, locale)
      await settledWords(page)
      await noOverflow(page)
      await accessibleBrands(page)
      await saveScreenshot(page, `hero-${locale}-${width}.png`)
      expect(writes).toEqual([])
    })
  }
}

test("motion: marquee measures 42 px/s and preserves position through pause and offscreen", async ({
  page,
  context,
}) => {
  const writes = await protectNetwork(context)
  await page.setViewportSize({ width: 1440, height: 900 })
  await openHome(page, "es")
  const trust = page.locator("#trust")
  const track = trust.locator(".home-trust-marquee-track")
  await trust.scrollIntoViewIfNeeded()
  await expect(track).toHaveCSS("animation-play-state", "running")
  const configured = await track.evaluate((element) => {
    const half = element.querySelector(".home-trust-marquee-half")
    return (
      (half?.getBoundingClientRect().width ?? 0) /
      Number.parseFloat(getComputedStyle(element).animationDuration)
    )
  })
  expect(configured).toBeCloseTo(42, 1)
  const running = await trackSpeed(track)
  expect(running.pixelsPerSecond).toBeGreaterThan(36)
  expect(running.pixelsPerSecond).toBeLessThan(48)
  await trust.getByRole("button", { name: "Pausar logos", exact: true }).click()
  await expect(track).toHaveCSS("animation-play-state", "paused")
  const paused = await trackSpeed(track, 350)
  expect(Math.abs(paused.to - paused.from)).toBeLessThan(0.1)
  expect(Math.abs(paused.from)).toBeGreaterThan(5)
  await saveScreenshot(page, "marquee-paused-es-1440.png")
  await trust
    .getByRole("button", { name: "Reanudar logos", exact: true })
    .click()
  await expect(track).toHaveCSS("animation-play-state", "running")
  const resumed = await trackSpeed(track)
  expect(resumed.pixelsPerSecond).toBeGreaterThan(36)
  expect(resumed.pixelsPerSecond).toBeLessThan(48)
  await page.locator("#contact").scrollIntoViewIfNeeded()
  await expect(track).toHaveCSS("animation-play-state", "paused")
  const offscreen = await trackSpeed(track, 350)
  expect(Math.abs(offscreen.to - offscreen.from)).toBeLessThan(0.1)
  await trust.scrollIntoViewIfNeeded()
  await expect(track).toHaveCSS("animation-play-state", "running")
  await page.setViewportSize({ width: 360, height: 900 })
  await trust.scrollIntoViewIfNeeded()
  await expect(track).toHaveCSS("animation-play-state", "running")
  const mobile = await trackSpeed(track)
  expect(mobile.pixelsPerSecond).toBeGreaterThan(36)
  expect(mobile.pixelsPerSecond).toBeLessThan(48)
  await noOverflow(page)
  await saveScreenshot(page, "marquee-es-360.png")
  await writeFile(
    path.join(evidenceDir(), "marquee-measurements.json"),
    JSON.stringify(
      { configured, running, paused, resumed, offscreen, mobile },
      null,
      2
    )
  )
  expect(writes).toEqual([])
})

for (const width of [360, 1440]) {
  test(`motion: diagrams enter in their viewport once and method/contact remain usable at ${width}px`, async ({
    page,
    context,
  }) => {
    const writes = await protectNetwork(context)
    await page.setViewportSize({ width, height: 900 })
    await openHome(page, "es")
    await settledWords(page)
    const groups =
      width >= 1024
        ? ["[data-home-visual]"]
        : ['[data-home-visual="academy"]', '[data-home-visual="agentic"]']
    for (const selector of groups) {
      const visuals = page.locator(selector)
      const nodes = visuals.locator(
        "[data-visual-node], [data-visual-connector]"
      )
      await visuals.first().evaluate((element) =>
        window.scrollTo({
          top:
            element.getBoundingClientRect().top +
            window.scrollY -
            window.innerHeight -
            90,
          behavior: "instant",
        })
      )
      const outside = await sampleNodes(nodes, 800)
      expect(
        outside.every((frame) =>
          frame.nodes.every(
            (node) => node.opacity === 1 && node.transform === "none"
          )
        )
      ).toBe(true)
      await visuals.first().evaluate((element) =>
        window.scrollTo({
          top:
            element.getBoundingClientRect().top +
            window.scrollY -
            window.innerHeight / 2,
          behavior: "instant",
        })
      )
      const entering = await sampleNodes(nodes, 1200)
      const count = await nodes.count()
      for (let index = 0; index < count; index += 1) {
        expect(
          entering.some(
            (frame) =>
              frame.nodes[index].visible && frame.nodes[index].opacity < 0.9
          ),
          `Node ${index} must visibly enter`
        ).toBe(true)
      }
      expect(
        entering
          .at(-1)
          ?.nodes.every(
            (node) => node.opacity === 1 && node.transform === "none"
          )
      ).toBe(true)
      await saveScreenshot(
        page,
        `services-${width}-${selector.includes("academy") ? "academy" : selector.includes("agentic") ? "agentic" : "both"}.png`
      )
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" })
      )
      await visuals.first().evaluate((element) =>
        window.scrollTo({
          top:
            element.getBoundingClientRect().top +
            window.scrollY -
            window.innerHeight / 2,
          behavior: "instant",
        })
      )
      const revisit = await sampleNodes(nodes, 500)
      expect(
        revisit.every((frame) =>
          frame.nodes.every(
            (node) => node.opacity === 1 && node.transform === "none"
          )
        )
      ).toBe(true)
    }
    if (width === 1440) {
      await page.setViewportSize({ width: 1280, height: 900 })
      const visuals = page.locator("[data-home-visual]")
      await visuals.first().scrollIntoViewIfNeeded()
      const alignment = await visuals.evaluateAll((elements) =>
        elements.map((element) => element.getBoundingClientRect().top)
      )
      expect(Math.abs(alignment[0] - alignment[1])).toBeLessThanOrEqual(1)
      await noOverflow(page)
      await saveScreenshot(page, "services-aligned-1280.png")
      await writeFile(
        path.join(evidenceDir(), "services-alignment-1280.json"),
        JSON.stringify(
          {
            viewport: 1280,
            diagramTop: alignment,
            difference: Math.abs(alignment[0] - alignment[1]),
          },
          null,
          2
        )
      )
      await page.setViewportSize({ width, height: 900 })
    }
    const method = page.locator("#method")
    await method.scrollIntoViewIfNeeded()
    await expect(method.locator("[data-method-step] h3 svg")).toHaveCount(3)
    await expect(
      method.getByRole("heading", { name: "Entender", exact: true })
    ).toBeVisible()
    await noOverflow(page)
    await saveScreenshot(page, `method-es-${width}.png`)
    const cta = page
      .locator("#contact")
      .getByRole("button", { name: "Hablemos", exact: true })
    await cta.click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(
      page.locator('input[name="interest"][value="discovery"]')
    ).toBeChecked()
    await page.keyboard.press("Escape")
    await expect(page.getByRole("dialog")).toHaveCount(0)
    await expect(cta).toBeFocused()
    expect(writes).toEqual([])
  })
}

test.describe("motion: reduced preference", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } })
  test("keeps words and diagrams still with one scrollable logo list", async ({
    page,
    context,
  }) => {
    const writes = await protectNetwork(context)
    await page.setViewportSize({ width: 360, height: 900 })
    await openHome(page, "es")
    expect(
      await page.evaluate(
        () => matchMedia("(prefers-reduced-motion: reduce)").matches
      )
    ).toBe(true)
    await settledWords(page)
    await accessibleBrands(page)
    const trust = page.locator("#trust")
    await trust.scrollIntoViewIfNeeded()
    await expect(trust.getByRole("button")).toHaveCount(0)
    await expect(trust.locator(".home-trust-marquee-track")).toHaveCSS(
      "display",
      "none"
    )
    const list = trust.getByRole("list")
    await expect(list).toHaveCSS("overflow-x", "auto")
    await list.focus()
    await page.keyboard.press("End")
    await list.evaluate((element) => {
      element.scrollLeft = element.scrollWidth
    })
    expect(
      await list.evaluate((element) => element.scrollLeft)
    ).toBeGreaterThan(0)
    await saveScreenshot(page, "marquee-reduced-motion-360.png")
    for (const id of ["academy", "agentic"]) {
      const visual = page.locator(`[data-home-visual="${id}"]`)
      await visual.scrollIntoViewIfNeeded()
      const frames = await sampleNodes(
        visual.locator("[data-visual-node]"),
        400
      )
      expect(
        frames.every((frame) =>
          frame.nodes.every(
            (node) => node.opacity === 1 && node.transform === "none"
          )
        )
      ).toBe(true)
    }
    await noOverflow(page)
    expect(writes).toEqual([])
  })
})

test.describe("motion: no JavaScript", () => {
  test.use({ javaScriptEnabled: false })
  test("server content and logo names remain visible without animation", async ({
    page,
    context,
  }) => {
    const writes = await protectNetwork(context)
    await page.setViewportSize({ width: 360, height: 900 })
    await openHome(page, "en", false)
    await settledWords(page)
    await accessibleBrands(page)
    await expect(page.locator("#trust").getByRole("button")).toHaveCount(0)
    await expect(page.locator(".home-trust-marquee-track")).toHaveCSS(
      "display",
      "none"
    )
    await expect(page.locator(".home-trust-marquee-static")).toHaveCSS(
      "overflow-x",
      "auto"
    )
    await noOverflow(page)
    await saveScreenshot(page, "home-en-no-js-360.png", true)
    expect(writes).toEqual([])
  })
})

test("motion-story: normal-speed hero, marquee, service sequences, method and contact", async ({
  page,
  context,
}) => {
  const writes = await protectNetwork(context)
  await page.setViewportSize({ width: 1440, height: 900 })
  await openHome(page, "es")
  await settledWords(page)
  await saveScreenshot(page, "story-01-hero.png")
  // Presentation holds below let the normal-speed video show each sequence.
  // No app timelines or playback rates are altered for this recording.
  await page.waitForTimeout(500)
  await page
    .locator("#trust")
    .evaluate((element) =>
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    )
  await page.waitForTimeout(1200)
  await saveScreenshot(page, "story-02-marquee.png")
  await page
    .locator("#services")
    .evaluate((element) =>
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    )
  await page.waitForTimeout(1100)
  await page
    .locator('[data-home-visual="academy"]')
    .evaluate((element) =>
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    )
  await page.waitForTimeout(1600)
  await saveScreenshot(page, "story-03-services.png")
  await page
    .locator("#method")
    .evaluate((element) =>
      element.scrollIntoView({ behavior: "smooth", block: "center" })
    )
  await page.waitForTimeout(1000)
  await saveScreenshot(page, "story-04-method.png")
  const learn = page
    .locator("#academy")
    .getByRole("button", { name: "Quiero aprender", exact: true })
  await learn.click()
  await expect(page.getByRole("dialog")).toHaveCSS("opacity", "1")
  await expect(
    page.locator('input[name="interest"][value="enablement"]')
  ).toBeChecked()
  await saveScreenshot(page, "story-05-contact.png")
  await page.waitForTimeout(900)
  await page.keyboard.press("Escape")
  await expect(page.getByRole("dialog")).toHaveCount(0)
  expect(writes).toEqual([])
})
