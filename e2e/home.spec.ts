import { mkdir } from "node:fs/promises"
import path from "node:path"

import { expect, test } from "@playwright/test"
import type { BrowserContext, Locator, Page } from "@playwright/test"

const BASE_URL = "http://localhost:3000"
const evidenceDir = () => test.info().outputPath("evidence")

const copy = {
  es: {
    headline:
      "Consultoría en IA, automatización de procesos y formación práctica.",
    services: "Servicios",
    servicesTitle: "Consultoría en IA",
    community: "Comunidad",
    join: "Unirme a la comunidad",
    talk: "Hablemos",
    menuOpen: "Abrir menú",
    menuClose: "Cerrar menú",
    primaryNav: "Navegación principal",
    learn: "Quiero aprender",
    implement: "Quiero mejorar un proceso",
    partnership: "Explorar una alianza",
    explore: "Explorar servicios",
    submit: "Enviar consulta",
    spiral: "Animar la espiral de texto",
  },
  en: {
    headline: "AI consulting, business automation and practical education.",
    services: "Services",
    servicesTitle: "AI consulting",
    community: "Community",
    join: "Join the community",
    talk: "Let’s talk",
    menuOpen: "Open menu",
    menuClose: "Close menu",
    primaryNav: "Primary navigation",
    learn: "I want to learn",
    implement: "Improve a process",
    partnership: "Explore a partnership",
    explore: "Explore services",
    submit: "Send inquiry",
    spiral: "Animate the text spiral",
  },
} as const

type Locale = keyof typeof copy

test.use({
  baseURL: BASE_URL,
  colorScheme: "light",
  trace: "retain-on-failure",
  video: { mode: "on", size: { width: 1440, height: 900 } },
})

/** Local UI tests never submit lead data or contact external services. */
async function guardNetwork(context: BrowserContext) {
  const blockedMutations: string[] = []
  await context.route("**/*", async (route) => {
    const request = route.request()
    const url = new URL(request.url())
    if (!["127.0.0.1", "localhost"].includes(url.hostname)) {
      await route.abort("blockedbyclient")
      return
    }
    if (!["GET", "HEAD", "OPTIONS"].includes(request.method())) {
      if (url.pathname === "/__tsd/console-pipe") {
        // Development console forwarding is neither lead submission nor part
        // of the product flow. Keep it blocked without counting it as a lead.
        await route.abort("blockedbyclient")
        return
      }
      // Locale preference is the only authorized POST. A contact submission
      // always includes submissionId and therefore cannot pass this guard.
      const body = request.postData() ?? ""
      const localeOnly =
        body.includes('"locale"') &&
        !/"(?:submissionId|name|email|message|interest)"/.test(body)
      if (!localeOnly) {
        blockedMutations.push(`${request.method()} ${url.pathname}`)
        await route.abort("blockedbyclient")
        return
      }
    }
    await route.continue()
  })
  return blockedMutations
}

async function chooseLocale(context: BrowserContext, locale: Locale) {
  await context.addCookies([
    { name: "ailabs-locale", value: locale, url: BASE_URL },
  ])
}

async function openHome(page: Page, locale: Locale) {
  await chooseLocale(page.context(), locale)
  await page.goto("/", { waitUntil: "domcontentloaded" })
  await expect(page.locator("html")).toHaveAttribute("lang", locale)
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    copy[locale].headline
  )
  // The logo measurement is a hydration effect at every breakpoint, including
  // reduced motion. The hero canvas intentionally exists only on desktop.
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
  await page.evaluate(() => document.fonts.ready)
  await expect(page.getByRole("heading", { level: 1 })).toHaveCSS(
    "opacity",
    "1"
  )
}

async function assertNoOverflow(page: Page) {
  const overflow = await page.evaluate(() => ({
    page: document.documentElement.scrollWidth - window.innerWidth,
    headings: [
      ...document.querySelectorAll<HTMLElement>("main h1, main h2, main h3"),
    ]
      .filter((element) => element.scrollWidth > element.clientWidth + 1)
      .map((element) => element.textContent),
  }))
  expect(
    overflow.page,
    "The page must fit the viewport horizontally"
  ).toBeLessThanOrEqual(1)
  expect(
    overflow.headings,
    "All headings must wrap inside their container"
  ).toEqual([])
}

async function screenshot(page: Page, name: string, fullPage = false) {
  const menu = page.getByRole("menu")
  if ((await menu.count()) > 0) {
    await expect(menu).toHaveCSS("opacity", "1")
  }
  const dialog = page.getByRole("dialog")
  if ((await dialog.count()) > 0) {
    await expect(dialog).toHaveCSS("opacity", "1")
  }
  await mkdir(evidenceDir(), { recursive: true })
  await page.screenshot({ path: path.join(evidenceDir(), name), fullPage })
}

async function dismissAndRestoreFocus(page: Page, trigger: Locator) {
  await page.keyboard.press("Escape")
  await expect(page.getByRole("dialog")).toHaveCount(0)
  await expect(trigger).toBeFocused()
}

async function assertDialogFitsViewport(page: Page) {
  const dialog = page.getByRole("dialog")
  await expect(dialog).toBeVisible()
  const geometry = await dialog.evaluate((element) => {
    const bounds = element.getBoundingClientRect()
    return {
      left: bounds.left,
      right: bounds.right,
      top: bounds.top,
      bottom: bounds.bottom,
      width: window.innerWidth,
      height: window.innerHeight,
      overflow: element.scrollWidth - element.clientWidth,
      overflowingLabels: [...element.querySelectorAll("label, legend")]
        .filter((label) => label.scrollWidth > label.clientWidth + 1)
        .map((label) => label.textContent),
    }
  })
  expect(geometry.left).toBeGreaterThanOrEqual(0)
  expect(geometry.top).toBeGreaterThanOrEqual(0)
  expect(geometry.right).toBeLessThanOrEqual(geometry.width + 1)
  expect(geometry.bottom).toBeLessThanOrEqual(geometry.height + 1)
  expect(geometry.overflow).toBeLessThanOrEqual(1)
  expect(geometry.overflowingLabels).toEqual([])
}

test("focused QA: system theme follows media changes and mobile dark remains usable", async ({
  page,
  context,
}) => {
  const writes = await guardNetwork(context)
  await page.setViewportSize({ width: 360, height: 900 })
  await openHome(page, "es")
  const root = page.locator("html")
  await expect(root).toHaveClass(/\blight\b/)
  await page.emulateMedia({ colorScheme: "dark" })
  await expect(root).toHaveClass(/\bdark\b/)
  await page
    .getByRole("button", { name: "Cambiar a tema claro", exact: true })
    .click()
  await expect(root).toHaveClass(/\blight\b/)
  await page
    .getByRole("button", { name: "Cambiar a tema oscuro", exact: true })
    .click()
  await expect(root).toHaveClass(/\bdark\b/)
  await page
    .getByRole("button", { name: "Cambiar a tema del sistema", exact: true })
    .click()
  expect(await page.evaluate(() => localStorage.getItem("ailabs-theme"))).toBe(
    "system"
  )
  await page.emulateMedia({ colorScheme: "light" })
  await expect(root).toHaveClass(/\blight\b/)
  await page.emulateMedia({ colorScheme: "dark" })
  await expect(root).toHaveClass(/\bdark\b/)
  await assertNoOverflow(page)
  await screenshot(page, "home-es-dark-360.png", true)
  const trigger = page
    .locator("#academy")
    .getByRole("button", { name: copy.es.learn, exact: true })
  await trigger.click()
  await assertDialogFitsViewport(page)
  const selected = page
    .getByRole("dialog")
    .locator('input[name="interest"][value="enablement"]')
  await expect(selected).toBeVisible()
  await selected.focus()
  await page.keyboard.press("ArrowRight")
  await expect(
    page.locator('input[name="interest"][value="implementation"]')
  ).toBeChecked()
  await screenshot(page, "contact-es-dark-360.png")
  await dismissAndRestoreFocus(page, trigger)
  expect(writes).toEqual([])
})

for (const locale of ["es", "en"] as const) {
  test(`focused QA: ${locale} long contact text remains reachable at 200 percent reflow equivalent`, async ({
    page,
    context,
  }) => {
    const writes = await guardNetwork(context)
    // A 720×450 CSS viewport exercises the reflow of a 1440×900 viewport
    // at 200% browser zoom. This is not native browser zoom or pinch zoom.
    await page.setViewportSize({ width: 720, height: 450 })
    await openHome(page, locale)
    await assertNoOverflow(page)
    await screenshot(page, `home-${locale}-200-percent-reflow-equivalent.png`)
    const trigger = page
      .locator("#academy")
      .getByRole("button", { name: copy[locale].learn, exact: true })
    await trigger.click()
    const dialog = page.getByRole("dialog")
    await dialog
      .locator('input[name="name"]')
      .fill("Nombre de prueba visual ".repeat(5).slice(0, 120))
    await dialog
      .locator('input[name="company"]')
      .fill("Organización para pruebas de interfaz ".repeat(5).slice(0, 160))
    // Keep email empty, and never submit. These inputs are synthetic UI data.
    const message =
      "Texto de prueba para evaluar saltos de línea y desplazamiento. ".repeat(
        70
      )
    const textarea = dialog.locator('textarea[name="message"]')
    await textarea.fill(message)
    await expect(textarea).toHaveValue(message)
    await expect(textarea).toBeInViewport()
    expect(
      await textarea.evaluate(
        (element) => element.scrollWidth - element.clientWidth
      )
    ).toBeLessThanOrEqual(1)
    for (const field of ["name", "email", "company"]) {
      const input = dialog.locator(`input[name="${field}"]`)
      await input.focus()
      await expect(input).toBeInViewport()
    }
    const partnership = dialog.locator(
      'input[name="interest"][value="partnership"]'
    )
    await partnership.focus()
    await page.keyboard.press("Space")
    await expect(partnership).toBeChecked()
    await expect(partnership).toBeInViewport()
    await textarea.focus()
    await page.keyboard.press("ControlOrMeta+End")
    await expect(textarea).toBeInViewport()
    await expect(
      dialog.getByRole("button", { name: copy[locale].submit, exact: true })
    ).toBeInViewport()
    await assertDialogFitsViewport(page)
    await screenshot(
      page,
      `contact-${locale}-long-text-200-percent-reflow-equivalent.png`
    )
    await dismissAndRestoreFocus(page, trigger)
    expect(writes).toEqual([])
  })
}

for (const width of [360, 1440]) {
  test(`focused QA: rapid menu and dialog cycles restore focus at ${width}px`, async ({
    page,
    context,
  }) => {
    const writes = await guardNetwork(context)
    const errors: string[] = []
    page.on("pageerror", (error) => errors.push(error.message))
    await page.setViewportSize({ width, height: 900 })
    await openHome(page, "es")
    const nav = page.getByRole("navigation", { name: copy.es.primaryNav })
    const menuTrigger =
      width < 1024
        ? page.getByRole("button", { name: copy.es.menuOpen, exact: true })
        : nav.getByRole("button", { name: copy.es.community, exact: true })
    for (let cycle = 0; cycle < 3; cycle += 1) {
      // Close as soon as the menu is attached, without waiting for its
      // entrance animation, and reopen immediately after removal.
      await menuTrigger.click()
      await expect(page.getByRole("menu")).toHaveCount(1)
      await page.keyboard.press("Escape")
      await expect(page.getByRole("menu")).toHaveCount(0)
      await expect(menuTrigger).toBeFocused()
      if (width < 1024) {
        await menuTrigger.click()
        await page
          .getByRole("menuitem", { name: copy.es.talk, exact: true })
          .click()
      } else {
        await nav
          .getByRole("button", { name: copy.es.talk, exact: true })
          .click()
      }
      await expect(page.getByRole("dialog")).toHaveCount(1)
      const finalFocus =
        width < 1024
          ? menuTrigger
          : nav.getByRole("button", { name: copy.es.talk, exact: true })
      await dismissAndRestoreFocus(page, finalFocus)
    }
    await expect(page.locator("body")).not.toHaveCSS("pointer-events", "none")
    await page.locator("#method").scrollIntoViewIfNeeded()
    await expect(page.locator("#method")).toBeInViewport()
    expect(errors).toEqual([])
    expect(writes).toEqual([])
  })
}

for (const locale of ["es", "en"] as const) {
  for (const width of [360, 768, 1024, 1440]) {
    test(`${locale} home at ${width}px preserves headings and grouped navigation`, async ({
      page,
      context,
    }) => {
      await guardNetwork(context)
      await page.setViewportSize({ width, height: 900 })
      await openHome(page, locale)
      const spiral = page.getByRole("button", {
        name: copy[locale].spiral,
        exact: true,
      })
      if (width >= 1024) {
        await expect(spiral).toBeVisible()
      } else {
        await expect(spiral).toHaveCount(0)
        await expect(page.locator("[data-home-spiral] canvas")).toHaveCount(0)
      }
      if (locale === "es" && width === 1440) {
        await page.keyboard.press("Tab")
        await spiral.focus()
        await expect(spiral).toBeFocused()
        await expect(spiral).toHaveCSS("box-shadow", /inset/)
        await screenshot(page, "spiral-focus-es-1440.png")
      }
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1)
      await expect(page.locator("#services")).toBeVisible()
      await expect(page.locator("#method")).toBeVisible()
      await expect(page.locator("#contact")).toBeVisible()
      await assertNoOverflow(page)

      const labels = copy[locale]
      if (width >= 1024) {
        const nav = page.getByRole("navigation", { name: labels.primaryNav })
        await expect(
          nav.getByRole("link", { name: labels.services, exact: true })
        ).toBeVisible()
        await expect(
          nav.getByRole("button", { name: labels.talk, exact: true })
        ).toBeVisible()
        const trigger = nav.getByRole("button", {
          name: labels.community,
          exact: true,
        })
        await trigger.click()
        await expect(
          page.getByRole("menuitem", { name: labels.join, exact: true })
        ).toBeVisible()
        await expect(
          page.getByRole("menuitem", { name: "Campus Leaders", exact: true })
        ).toBeVisible()
        if (locale === "es" && width === 1440) {
          await screenshot(page, "menu-es-1440.png")
        }
        await page.keyboard.press("Escape")
        await expect(page.getByRole("menu")).toHaveCount(0)
        await expect(trigger).toBeFocused()
      } else {
        const trigger = page.getByRole("button", {
          name: labels.menuOpen,
          exact: true,
        })
        await trigger.click()
        await expect(
          page.getByRole("menuitem", { name: labels.services, exact: true })
        ).toBeVisible()
        await expect(
          page.getByRole("menuitem", { name: labels.join, exact: true })
        ).toBeVisible()
        await expect(
          page.getByRole("menuitem", { name: "Campus Leaders", exact: true })
        ).toBeVisible()
        await expect(
          page.getByRole("menuitem", { name: labels.talk, exact: true })
        ).toBeVisible()
        if (locale === "es" && width === 360) {
          await screenshot(page, "menu-es-360.png")
        }
        await page.keyboard.press("Escape")
        await expect(page.getByRole("menu")).toHaveCount(0)
        await expect(trigger).toBeFocused()
      }
      await screenshot(page, `home-${locale}-${width}.png`, true)
      if (locale === "es" && width === 1440) {
        await page.emulateMedia({ colorScheme: "dark" })
        await expect(page.locator("html")).toHaveClass(/\bdark\b/)
        await assertNoOverflow(page)
        await screenshot(page, "home-es-dark-1440.png", true)
      }
    })
  }
}

for (const width of [360, 1440]) {
  test(`contact intent, Escape and empty validation at ${width}px`, async ({
    page,
    context,
  }) => {
    const blockedMutations = await guardNetwork(context)
    await page.setViewportSize({ width, height: 900 })
    await openHome(page, "es")

    for (const entry of [
      { container: "#academy", label: copy.es.learn, interest: "enablement" },
      {
        container: "#agentic",
        label: copy.es.implement,
        interest: "implementation",
      },
      {
        container: "footer",
        label: copy.es.partnership,
        interest: "partnership",
      },
    ]) {
      const trigger = page
        .locator(entry.container)
        .getByRole("button", { name: entry.label, exact: true })
      await trigger.click()
      const dialog = page.getByRole("dialog")
      await expect(dialog).toBeVisible()
      await expect(
        dialog.locator(`input[name="interest"][value="${entry.interest}"]`)
      ).toBeChecked()
      await dismissAndRestoreFocus(page, trigger)
    }

    const heroTrigger = page
      .locator("main > div > section")
      .first()
      .getByRole("button", { name: copy.es.talk, exact: true })
    await heroTrigger.click()
    const dialog = page.getByRole("dialog")
    await expect(
      dialog.locator('input[name="interest"][value="discovery"]')
    ).toBeChecked()
    await dialog
      .getByRole("button", { name: copy.es.submit, exact: true })
      .click()
    await expect(dialog.locator('input[name="name"]')).toBeFocused()
    await expect(dialog.locator("form")).toHaveAttribute("aria-busy", "false")
    expect(
      await dialog
        .locator("form")
        .evaluate((form: HTMLFormElement) => form.checkValidity())
    ).toBe(false)
    expect(
      blockedMutations,
      "Empty details must not attempt a server write"
    ).toEqual([])
    await screenshot(page, `contact-es-${width}.png`)
    await dismissAndRestoreFocus(page, heroTrigger)

    if (width < 1024) {
      const menuTrigger = page.getByRole("button", {
        name: copy.es.menuOpen,
        exact: true,
      })
      await menuTrigger.click()
      await page
        .getByRole("menuitem", { name: copy.es.talk, exact: true })
        .click()
      await expect(page.getByRole("dialog")).toBeVisible()
      // The menuitem unmounts as the dialog opens; closing must focus the
      // visible hamburger rather than a detached element or document body.
      await dismissAndRestoreFocus(page, menuTrigger)
    } else {
      const headerTrigger = page
        .getByRole("navigation", { name: copy.es.primaryNav })
        .getByRole("button", { name: copy.es.talk, exact: true })
      await headerTrigger.click()
      await expect(page.getByRole("dialog")).toBeVisible()
      await dismissAndRestoreFocus(page, headerTrigger)
    }
  })
}

test("language preference survives cross-page navigation and Services returns to the section", async ({
  page,
  context,
}) => {
  const blockedMutations = await guardNetwork(context)
  await page.setViewportSize({ width: 1440, height: 900 })
  await openHome(page, "es")
  await page.getByRole("button", { name: "EN", exact: true }).click()
  await expect(page.locator("html")).toHaveAttribute("lang", "en")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    copy.en.headline
  )
  expect(
    (await context.cookies()).find((cookie) => cookie.name === "ailabs-locale")
      ?.value
  ).toBe("en")
  await expect(page).toHaveURL(`${BASE_URL}/`)

  const nav = page.getByRole("navigation", { name: copy.en.primaryNav })
  await nav
    .getByRole("button", { name: copy.en.community, exact: true })
    .click()
  await page.getByRole("menuitem", { name: copy.en.join, exact: true }).click()
  await expect(page).toHaveURL(`${BASE_URL}/community`)
  await expect(page.locator("html")).toHaveAttribute("lang", "en")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Join the Ai Labs WhatsApp community"
  )
  await expect(
    page.getByRole("button", { name: copy.en.spiral, exact: true })
  ).toBeVisible()
  await page
    .getByRole("navigation", { name: copy.en.primaryNav })
    .getByRole("link", { name: copy.en.services, exact: true })
    .click()
  await expect(page).toHaveURL(`${BASE_URL}/#services`)
  await expect(page.locator("#services")).toBeInViewport()
  await expect(
    page.locator("#services").getByRole("heading", { level: 2 })
  ).toHaveText(copy.en.servicesTitle)
  expect(blockedMutations).toEqual([])
})

test("legacy locale URL preserves language, query and section", async ({
  page,
  context,
}) => {
  await guardNetwork(context)
  await page.goto("/es?source=qa#services", { waitUntil: "domcontentloaded" })
  await expect(page).toHaveURL(`${BASE_URL}/?source=qa#services`)
  await expect(page.locator("html")).toHaveAttribute("lang", "es")
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    copy.es.headline
  )
  await expect(page.locator("#services")).toBeInViewport()

  await page.goto("/es/community?source=qa#main", {
    waitUntil: "domcontentloaded",
  })
  await expect(page).toHaveURL(`${BASE_URL}/community?source=qa#main`)
  await expect(page.locator("html")).toHaveAttribute("lang", "es")
  await expect(
    page.locator("main").getByRole("heading", { level: 1 })
  ).toBeVisible()
})

test.describe("reduced motion", () => {
  test.use({ contextOptions: { reducedMotion: "reduce" } })
  test("copy is visible without entry motion and the spiral does not spin", async ({
    page,
    context,
  }) => {
    const hydrationErrors: string[] = []
    page.on("console", (message) => {
      if (/hydrat|server rendered.*match/i.test(message.text())) {
        hydrationErrors.push(message.text())
      }
    })
    page.on("pageerror", (error) => {
      if (/hydrat|server rendered.*match/i.test(error.message)) {
        hydrationErrors.push(error.message)
      }
    })
    await guardNetwork(context)
    await openHome(page, "es")
    expect(
      await page.evaluate(
        () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
    ).toBe(true)
    expect(
      hydrationErrors,
      "Reduced motion must hydrate without mismatched markup"
    ).toEqual([])
    const heading = page.getByRole("heading", { level: 1 })
    await expect(heading).toHaveCSS("transform", "none")
    await expect(heading).toHaveCSS("opacity", "1")
    await page.locator("#services").scrollIntoViewIfNeeded()
    await expect(page.locator("#academy")).toHaveCSS("transform", "none")
    await expect(page.locator("#academy")).toHaveCSS("opacity", "1")
    const spinning = await page
      .locator("[data-home-spiral] canvas")
      .evaluateAll(
        (canvases) =>
          canvases.filter((canvas) => {
            const shell = canvas.parentElement
            return shell && getComputedStyle(shell).animationName !== "none"
          }).length
      )
    expect(spinning).toBe(0)
    await screenshot(page, "home-es-reduced-motion.png", true)
  })
})

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false })
  for (const locale of ["es", "en"] as const) {
    test(`${locale} server-rendered copy remains visible`, async ({
      page,
      context,
    }) => {
      await guardNetwork(context)
      await chooseLocale(context, locale)
      await page.setViewportSize({ width: 360, height: 900 })
      await page.goto("/", { waitUntil: "domcontentloaded" })
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(
        copy[locale].headline
      )
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible()
      await expect(page.locator("#services")).toBeVisible()
      await expect(page.locator("#method")).toBeVisible()
      await expect(page.locator("#contact")).toBeVisible()
      await assertNoOverflow(page)
      await screenshot(page, `home-${locale}-no-js.png`, true)
    })
  }
})

test.describe("recorded desktop walkthrough", () => {
  test.use({
    viewport: { width: 1440, height: 900 },
  })
  test("desktop-story: hero, services, community menu and contact", async ({
    page,
    context,
  }) => {
    await guardNetwork(context)
    await openHome(page, "es")
    await screenshot(page, "desktop-story-01-hero.png")
    // Short presentation holds make the exported video readable; assertions
    // elsewhere synchronize with UI state, rather than arbitrary delays.
    await page.waitForTimeout(650)
    await page.getByRole("link", { name: copy.es.explore, exact: true }).click()
    await expect(page.locator("#services")).toBeInViewport()
    await expect(page.locator("#academy")).toHaveCSS("opacity", "1")
    await screenshot(page, "desktop-story-02-services.png")
    await page.waitForTimeout(650)
    const community = page
      .getByRole("navigation", { name: copy.es.primaryNav })
      .getByRole("button", { name: copy.es.community, exact: true })
    await community.click()
    await expect(
      page.getByRole("menuitem", { name: copy.es.join, exact: true })
    ).toBeVisible()
    await screenshot(page, "desktop-story-03-community-menu.png")
    await page.waitForTimeout(650)
    await page.keyboard.press("Escape")
    const learn = page
      .locator("#academy")
      .getByRole("button", { name: copy.es.learn, exact: true })
    await learn.click()
    await expect(page.getByRole("dialog")).toBeVisible()
    await expect(
      page.locator('input[name="interest"][value="enablement"]')
    ).toBeChecked()
    await screenshot(page, "desktop-story-04-contact.png")
    await page.waitForTimeout(900)
    await dismissAndRestoreFocus(page, learn)
    await page.locator("#method").scrollIntoViewIfNeeded()
    await screenshot(page, "desktop-story-05-method.png")
    await page.waitForTimeout(650)
    await page.locator("footer").scrollIntoViewIfNeeded()
    await screenshot(page, "desktop-story-06-footer.png")
    await page.waitForTimeout(650)
  })
})
