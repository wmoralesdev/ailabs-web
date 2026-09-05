import type { ReactNode } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import {
  cleanup,
  render,
  screen,
  within,
  waitFor,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { UserEvent } from "@testing-library/user-event"

import { en } from "@/content/en"
import { HomeContact } from "./home-contact"
import {
  ContactProvider,
  useContact,
} from "@/components/contact/contact-provider"
import { submitContact } from "@/server/contact"

vi.mock("@/server/contact", () => ({ submitContact: vi.fn() }))
const submit = vi.mocked(submitContact)

type BannerStubProps = {
  id?: string
  children: ReactNode
  action?: ReactNode
}

vi.mock("@/components/ui/canvas-reveal-banner", () => ({
  CanvasRevealBanner: ({ id, children, action }: BannerStubProps) => (
    <section id={id}>
      {children}
      {action}
    </section>
  ),
}))

const content = en.home.contact

function field(dialog: HTMLElement, id: string) {
  const element = dialog.querySelector(`#${id}`)
  if (
    !(element instanceof HTMLInputElement) &&
    !(element instanceof HTMLTextAreaElement)
  ) {
    throw new Error(`Missing contact field #${id}`)
  }
  return element
}

function interestOption(value: string) {
  const option = content.interestOptions.find((item) => item.value === value)
  if (!option) {
    throw new Error(`Missing contact interest ${value}`)
  }
  return option
}

async function openContactDialog(user: UserEvent) {
  render(
    <ContactProvider contact={content} locale="en">
      <HomeContact contact={content} />
    </ContactProvider>
  )
  await user.click(screen.getByRole("button", { name: content.cta }))
  return screen.findByRole("dialog")
}

async function fillRequiredFields(
  user: UserEvent,
  dialog: HTMLElement,
  message: string
) {
  await user.type(field(dialog, "contact-name"), "Walter Morales")
  await user.type(field(dialog, "contact-email"), "walter@example.com")
  await user.type(field(dialog, "contact-message"), message)
}

describe("HomeContact", () => {
  afterEach(() => {
    cleanup()
    vi.resetAllMocks()
  })

  it("opens with discovery selected and allows changing the interest", async () => {
    const user = userEvent.setup()
    const dialog = await openContactDialog(user)
    const discovery = interestOption("discovery")
    const implementation = interestOption("implementation")
    const discoveryRadio = within(dialog).getByRole("radio", {
      name: discovery.label,
    })
    const implementationRadio = within(dialog).getByRole("radio", {
      name: implementation.label,
    })

    expect(discoveryRadio).toHaveAttribute("value", "discovery")
    expect(discoveryRadio).toBeChecked()
    expect(implementationRadio).not.toBeChecked()

    await user.click(implementationRadio)

    expect(discoveryRadio).not.toBeChecked()
    expect(implementationRadio).toBeChecked()
  })

  it("confirms an inquiry after it is saved", async () => {
    submit.mockResolvedValue({ status: "received" })
    const user = userEvent.setup()
    const dialog = await openContactDialog(user)

    await fillRequiredFields(
      user,
      dialog,
      "We want to review our sales process."
    )
    await user.click(
      within(dialog).getByRole("button", { name: content.submit })
    )

    expect(
      await within(dialog).findByRole("status", {}, { timeout: 1500 })
    ).toHaveTextContent(content.success)
    expect(submit).toHaveBeenCalledWith({
      data: expect.objectContaining({
        name: "Walter Morales",
        email: "walter@example.com",
        company: "",
        locale: "en",
        interest: "discovery",
        submissionId: expect.any(String),
      }),
    })
    expect(field(dialog, "contact-name")).toHaveValue("")
    expect(field(dialog, "contact-email")).toHaveValue("")
    expect(field(dialog, "contact-message")).toHaveValue("")
    expect(
      within(dialog).getByRole("radio", {
        name: interestOption("discovery").label,
      })
    ).toBeChecked()
  })

  it("keeps entered values and reuses the submission ID after a network failure", async () => {
    submit.mockRejectedValueOnce(new Error("Network unavailable"))
    submit.mockResolvedValueOnce({ status: "received" })
    const user = userEvent.setup()
    const dialog = await openContactDialog(user)

    await fillRequiredFields(user, dialog, "fail")
    await user.click(
      within(dialog).getByRole("button", { name: content.submit })
    )

    expect(
      await within(dialog).findByRole("alert", {}, { timeout: 1500 })
    ).toHaveTextContent(content.error)
    expect(within(dialog).queryByRole("status")).toBeNull()
    expect(field(dialog, "contact-name")).toHaveValue("Walter Morales")
    expect(field(dialog, "contact-message")).toHaveValue("fail")
    await user.click(
      within(dialog).getByRole("button", { name: content.submit })
    )
    await within(dialog).findByRole("status")
    expect(submit.mock.calls[0][0].data.submissionId).toBe(
      submit.mock.calls[1][0].data.submissionId
    )
  })
  it("does not submit missing required details", async () => {
    const user = userEvent.setup()
    const dialog = await openContactDialog(user)
    await user.click(
      within(dialog).getByRole("button", { name: content.submit })
    )
    expect(submit).not.toHaveBeenCalled()
  })

  it("opens from a service with its interest selected and returns focus on Escape", async () => {
    function ServiceTrigger() {
      const { openContact } = useContact()
      return (
        <button onClick={() => openContact("enablement")}>Education</button>
      )
    }
    const user = userEvent.setup()
    render(
      <ContactProvider contact={content} locale="en">
        <ServiceTrigger />
      </ContactProvider>
    )
    const trigger = screen.getByRole("button", { name: "Education" })
    await user.click(trigger)
    const dialog = await screen.findByRole("dialog")
    expect(
      within(dialog).getByRole("radio", {
        name: interestOption("enablement").label,
      })
    ).toBeChecked()
    await user.keyboard("{Escape}")
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it("shows a rate limit error without clearing the draft", async () => {
    submit.mockResolvedValue({ status: "rate_limited" })
    const user = userEvent.setup()
    const dialog = await openContactDialog(user)
    await fillRequiredFields(user, dialog, "I want to learn.")
    await user.click(
      within(dialog).getByRole("button", { name: content.submit })
    )
    expect(await within(dialog).findByRole("alert")).toHaveTextContent(
      content.rateLimited
    )
    expect(field(dialog, "contact-message")).toHaveValue("I want to learn.")
  })
})
