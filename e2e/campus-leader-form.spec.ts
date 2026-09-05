import { expect, test } from "@playwright/test"
import type { Locator, Page } from "@playwright/test"

const CRASH_COPY = /The form hit an error|El formulario falló|Algo salió mal/i
const STEP_1 = /Step\s*1\s*of\s*3/i
const STEP_2 = /Step\s*2\s*of\s*3/i
const STEP_3 = /Step\s*3\s*of\s*3/i

async function openApplyDialog(page: Page) {
  await page.goto("/campus-leader", { waitUntil: "domcontentloaded" })
  // SSR HTML shows Apply before React hydrates — a too-early click is a no-op.
  await page.waitForLoadState("networkidle")
  const apply = page.getByRole("button", { name: /^Apply$/ }).first()
  await expect(apply).toBeVisible()

  const dialog = page.getByRole("dialog")
  await expect(async () => {
    if ((await dialog.count()) === 0) {
      await apply.click({ force: true })
    }
    await expect(dialog).toBeVisible({ timeout: 2_000 })
  }).toPass({ timeout: 15_000 })

  await expect(dialog.getByText(STEP_1)).toBeVisible()
  return dialog
}

async function fillStep1(dialog: Locator, page: Page) {
  await dialog.locator("#cl-name").fill("Walter Morales")
  await dialog.locator("#cl-email").fill("walter@example.com")
  await dialog.locator("#cl-whatsapp").fill("78452310")
  await dialog.getByLabel("Year").selectOption("3")
  await dialog
    .locator("#cl-instagram")
    .fill("https://www.instagram.com/wmoralesdev")
  await dialog.locator("#cl-campus").fill("UCA")
  await dialog.getByLabel("Career").selectOption("sistemas")
  // Leave LinkedIn/X empty — common applicant path.
  await dialog.getByRole("button", { name: "Continue" }).click()
  await expect(dialog.getByText(STEP_2)).toBeVisible()
  await expect(page.getByText(CRASH_COPY)).toHaveCount(0)
}

async function fillStep2AndAdvance(dialog: Locator, page: Page) {
  await dialog.locator("#cl-bio").fill("I organize campus events.")
  await dialog.locator("#cl-reach").fill("Class WhatsApp groups.")
  await dialog.locator("#cl-aiToday").fill("Daily ChatGPT user.")
  const whyLeader = dialog.locator("#cl-whyLeader")
  await whyLeader.fill("I want to bring sessions to campus.")
  // Keep focus on the unmounting field — Dialog focus-trap crash class.
  await whyLeader.focus()
  await dialog.getByRole("button", { name: "Continue" }).click()
  await expect(dialog.getByText(STEP_3)).toBeVisible()
  await expect(page.getByText(CRASH_COPY)).toHaveCount(0)
}

async function fillStep3(dialog: Locator) {
  await dialog.locator("#cl-quietRoom").fill("I start with a phone exercise.")
  await dialog
    .locator("#cl-inviteMessage")
    .fill("Saturday 9am in B-12. Bring a laptop.")
  await dialog
    .locator("#cl-roomPlan")
    .fill("Ask for the lab and post in three chats.")
}

test.describe("Campus Leader apply dialog", () => {
  test("survives step 2→3 with focused field and session prefs", async ({
    page,
  }) => {
    const dialog = await openApplyDialog(page)
    await fillStep1(dialog, page)
    await fillStep2AndAdvance(dialog, page)

    const cursorLabs = dialog.getByRole("button", { name: "Cursor Labs" })
    await cursorLabs.click()
    await expect(cursorLabs).toHaveAttribute("aria-pressed", "true")
    await expect(page.getByText(CRASH_COPY)).toHaveCount(0)

    await cursorLabs.click()
    await expect(cursorLabs).toHaveAttribute("aria-pressed", "false")
    await expect(dialog.getByText(STEP_3)).toBeVisible()
    await expect(page.getByText(CRASH_COPY)).toHaveCount(0)
  })

  test("submits a complete application without crashing", async ({ page }) => {
    // TanStack Start server-fn POSTs vary by build; stub any write that
    // carries the application payload so e2e does not need a live DB.
    await page.route("**/*", async (route) => {
      const request = route.request()
      if (request.method() !== "POST") {
        await route.continue()
        return
      }
      const body = request.postData() ?? ""
      if (
        !body.includes("quietRoom") &&
        !body.includes("sessionPrefs") &&
        !body.includes("walter@example.com")
      ) {
        await route.continue()
        return
      }
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          result: { status: "ok" },
        }),
      })
    })

    const dialog = await openApplyDialog(page)
    await fillStep1(dialog, page)
    await fillStep2AndAdvance(dialog, page)
    await fillStep3(dialog)
    await dialog.getByRole("button", { name: "Cursor Labs" }).click()
    await dialog.getByRole("button", { name: "Send application" }).click()

    await expect(page.getByText(CRASH_COPY)).toHaveCount(0)
    await expect(
      dialog.getByText(
        /Got it\.\s*We’ll review for Cohort Aster and reply on WhatsApp\./i
      )
    ).toBeVisible({ timeout: 15_000 })
  })
})
