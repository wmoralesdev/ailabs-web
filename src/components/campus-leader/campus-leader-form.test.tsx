import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { UserEvent } from "@testing-library/user-event"

import { en } from "@/content/en"
import { submitCampusLeaderApplication } from "@/server/campus-leader"
import { CampusLeaderForm } from "./campus-leader-form"

vi.mock("@/server/campus-leader", () => ({
  submitCampusLeaderApplication: vi.fn(),
}))

const submitMock = vi.mocked(submitCampusLeaderApplication)
const content = en.campusLeader

/** Base UI Input is not always treated as labelable by Testing Library. */
function field(dialog: HTMLElement, id: string) {
  const el = dialog.querySelector(`#${id}`)
  if (!(el instanceof HTMLElement)) {
    throw new Error(`Missing field #${id}`)
  }
  return el
}

function getDialog() {
  return screen.getByRole("dialog")
}

async function fillStep1(
  user: UserEvent,
  dialog: HTMLElement,
  options?: { skipInstagram?: boolean; linkedin?: string }
) {
  await user.type(field(dialog, "cl-name"), "Walter Morales")
  await user.type(field(dialog, "cl-email"), "walter@example.com")
  await user.type(field(dialog, "cl-whatsapp"), "78452310")
  await user.selectOptions(
    within(dialog).getByRole("combobox", { name: "Year" }),
    "3"
  )

  if (options?.skipInstagram) {
    await user.click(
      within(dialog).getByRole("checkbox", {
        name: content.fields.instagram.skipLabel,
      })
    )
  } else {
    await user.type(
      field(dialog, "cl-instagram"),
      "https://www.instagram.com/wmoralesdev"
    )
  }

  if (options?.linkedin) {
    await user.type(field(dialog, "cl-linkedin"), options.linkedin)
  }

  await user.type(field(dialog, "cl-campus"), "UCA")
  await user.selectOptions(
    within(dialog).getByRole("combobox", { name: "Career" }),
    "sistemas"
  )
}

async function fillStep2(user: UserEvent, dialog: HTMLElement) {
  await user.type(field(dialog, "cl-bio"), "I organize campus events.")
  await user.type(field(dialog, "cl-reach"), "Class WhatsApp groups.")
  await user.type(field(dialog, "cl-aiToday"), "Daily ChatGPT user.")
  await user.type(
    field(dialog, "cl-whyLeader"),
    "I want to bring sessions to campus."
  )
}

async function fillStep3(user: UserEvent, dialog: HTMLElement) {
  await user.type(field(dialog, "cl-quietRoom"), "I start with a phone exercise.")
  await user.type(
    field(dialog, "cl-inviteMessage"),
    "Saturday 9am in B-12. Bring a laptop."
  )
  await user.type(
    field(dialog, "cl-roomPlan"),
    "Ask for the lab and post in three chats."
  )
}

async function goToStep3(user: UserEvent, dialog: HTMLElement) {
  await fillStep1(user, dialog)
  await user.click(within(dialog).getByRole("button", { name: /Continue/i }))
  await fillStep2(user, dialog)
  await user.click(within(dialog).getByRole("button", { name: /Continue/i }))
  expect(within(dialog).getByText("Step 3 of 3", { exact: false })).toBeTruthy()
}

describe("CampusLeaderForm", () => {
  beforeEach(() => {
    submitMock.mockReset()
  })

  afterEach(() => {
    cleanup()
  })

  it("advances through all steps and toggles session prefs without crashing", async () => {
    const user = userEvent.setup()
    render(
      <CampusLeaderForm content={content} open onOpenChange={vi.fn()} />
    )
    const dialog = getDialog()

    await goToStep3(user, dialog)
    expect(screen.queryByText(content.formCrashTitle)).toBeNull()

    const cursorLabs = within(dialog).getByRole("button", {
      name: "Cursor Labs",
    })
    await user.click(cursorLabs)
    expect(cursorLabs).toHaveAttribute("aria-pressed", "true")

    await user.click(cursorLabs)
    expect(cursorLabs).toHaveAttribute("aria-pressed", "false")
    expect(screen.queryByText(content.formCrashTitle)).toBeNull()
  })

  it("blocks incomplete step 1 with the incomplete message", async () => {
    const user = userEvent.setup()
    render(
      <CampusLeaderForm content={content} open onOpenChange={vi.fn()} />
    )
    const dialog = getDialog()

    await user.click(within(dialog).getByRole("button", { name: /Continue/i }))

    expect(within(dialog).getByRole("alert")).toHaveTextContent(
      content.stepIncomplete
    )
    expect(
      within(dialog).getByText("Step 1 of 3", { exact: false })
    ).toBeTruthy()
    expect(submitMock).not.toHaveBeenCalled()
  })

  it("blocks invalid LinkedIn with the invalid-link message", async () => {
    const user = userEvent.setup()
    render(
      <CampusLeaderForm content={content} open onOpenChange={vi.fn()} />
    )
    const dialog = getDialog()

    await fillStep1(user, dialog, { linkedin: "not-a-url" })
    await user.click(within(dialog).getByRole("button", { name: /Continue/i }))

    expect(within(dialog).getByRole("alert")).toHaveTextContent(
      content.invalidLink
    )
    expect(
      within(dialog).getByText("Step 1 of 3", { exact: false })
    ).toBeTruthy()
  })

  it("allows step 1 when Instagram is skipped and LinkedIn/X stay empty", async () => {
    const user = userEvent.setup()
    render(
      <CampusLeaderForm content={content} open onOpenChange={vi.fn()} />
    )
    const dialog = getDialog()

    await fillStep1(user, dialog, { skipInstagram: true })
    await user.click(within(dialog).getByRole("button", { name: /Continue/i }))

    expect(
      within(dialog).getByText("Step 2 of 3", { exact: false })
    ).toBeTruthy()
    expect(field(dialog, "cl-bio")).toBeTruthy()
    expect(screen.queryByText(content.formCrashTitle)).toBeNull()
  })

  it("keeps step 1 values when going back from step 2", async () => {
    const user = userEvent.setup()
    render(
      <CampusLeaderForm content={content} open onOpenChange={vi.fn()} />
    )
    const dialog = getDialog()

    await fillStep1(user, dialog)
    await user.click(within(dialog).getByRole("button", { name: /Continue/i }))
    expect(
      within(dialog).getByText("Step 2 of 3", { exact: false })
    ).toBeTruthy()

    await user.click(within(dialog).getByRole("button", { name: /Back/i }))

    expect(
      within(dialog).getByText("Step 1 of 3", { exact: false })
    ).toBeTruthy()
    expect(field(dialog, "cl-name")).toHaveValue("Walter Morales")
    expect(field(dialog, "cl-email")).toHaveValue("walter@example.com")
    expect(field(dialog, "cl-campus")).toHaveValue("UCA")
  })

  it("blocks incomplete final submit on step 3", async () => {
    const user = userEvent.setup()
    render(
      <CampusLeaderForm content={content} open onOpenChange={vi.fn()} />
    )
    const dialog = getDialog()

    await goToStep3(user, dialog)
    await user.click(
      within(dialog).getByRole("button", { name: content.submit })
    )

    expect(within(dialog).getByRole("alert")).toHaveTextContent(
      content.stepIncomplete
    )
    expect(submitMock).not.toHaveBeenCalled()
  })

  it("submits a valid application and shows success", async () => {
    submitMock.mockResolvedValue({ status: "ok" })
    const user = userEvent.setup()
    render(
      <CampusLeaderForm content={content} open onOpenChange={vi.fn()} />
    )
    const dialog = getDialog()

    await goToStep3(user, dialog)
    await fillStep3(user, dialog)
    await user.click(
      within(dialog).getByRole("button", { name: "Cursor Labs" })
    )
    await user.click(
      within(dialog).getByRole("button", { name: content.submit })
    )

    expect(submitMock).toHaveBeenCalledTimes(1)
    const payload = submitMock.mock.calls[0]?.[0]?.data
    expect(payload).toMatchObject({
      cohort: content.cohort,
      name: "Walter Morales",
      email: "walter@example.com",
      whatsapp: "+50378452310",
      instagram: "https://www.instagram.com/wmoralesdev",
      campus: "UCA",
      career: "sistemas",
      year: "3",
      sessionPrefs: ["cursor-labs"],
      applicationsOpen: true,
    })

    expect(await within(dialog).findByText(content.success)).toBeTruthy()
    expect(screen.queryByText(content.formCrashTitle)).toBeNull()
  })

  it("shows the form error when the server rejects the submit", async () => {
    submitMock.mockResolvedValue({ status: "error" })
    const user = userEvent.setup()
    render(
      <CampusLeaderForm content={content} open onOpenChange={vi.fn()} />
    )
    const dialog = getDialog()

    await goToStep3(user, dialog)
    await fillStep3(user, dialog)
    await user.click(
      within(dialog).getByRole("button", { name: content.submit })
    )

    expect(await within(dialog).findByRole("alert")).toHaveTextContent(
      content.error
    )
    expect(
      within(dialog).getByText("Step 3 of 3", { exact: false })
    ).toBeTruthy()
  })

  it("omits Instagram from the payload when the skip checkbox is used", async () => {
    submitMock.mockResolvedValue({ status: "ok" })
    const user = userEvent.setup()
    render(
      <CampusLeaderForm content={content} open onOpenChange={vi.fn()} />
    )
    const dialog = getDialog()

    await fillStep1(user, dialog, { skipInstagram: true })
    await user.click(within(dialog).getByRole("button", { name: /Continue/i }))
    await fillStep2(user, dialog)
    await user.click(within(dialog).getByRole("button", { name: /Continue/i }))
    await fillStep3(user, dialog)
    await user.click(
      within(dialog).getByRole("button", { name: content.submit })
    )

    const payload = submitMock.mock.calls[0]?.[0]?.data
    expect(payload?.instagram).toBeUndefined()
    expect(await within(dialog).findByText(content.success)).toBeTruthy()
  })
})
