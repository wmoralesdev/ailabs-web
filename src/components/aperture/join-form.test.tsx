import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { en } from "@/content/en"
import { claimApertureMembership, checkUsername } from "@/server/aperture/claim"
import { JoinForm } from "./join-form"

vi.mock("@/server/aperture/claim", () => ({
  claimApertureMembership: vi.fn(),
  checkUsername: vi.fn(),
}))

vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<typeof import("@tanstack/react-router")>(
    "@tanstack/react-router"
  )
  return {
    ...actual,
    Link: ({
      children,
      to,
    }: {
      children: import("react").ReactNode
      to: string
    }) => <a href={to}>{children}</a>,
  }
})

const claimMock = vi.mocked(claimApertureMembership)
const checkMock = vi.mocked(checkUsername)
const content = en.aperture.join

function field(id: string) {
  const el = document.querySelector(`#${id}`)
  if (!(el instanceof HTMLElement)) {
    throw new Error(`Missing field #${id}`)
  }
  return el
}

describe("JoinForm", () => {
  beforeEach(() => {
    claimMock.mockReset()
    checkMock.mockReset()
    checkMock.mockResolvedValue("available")
  })

  afterEach(() => {
    cleanup()
  })

  it("shows required field errors before calling claim", async () => {
    const user = userEvent.setup()
    const onClaimed = vi.fn()
    render(
      <JoinForm
        content={content}
        locale="en"
        displayName=""
        onClaimed={onClaimed}
      />
    )

    await user.click(screen.getByRole("button", { name: content.submit }))

    expect(claimMock).not.toHaveBeenCalled()
    expect(onClaimed).not.toHaveBeenCalled()
    expect(screen.getAllByRole("alert").length).toBeGreaterThan(0)
  })

  it("submits a complete claim and reveals the number", async () => {
    const user = userEvent.setup()
    const onClaimed = vi.fn()
    claimMock.mockResolvedValue({
      status: "claimed",
      number: 5,
      username: "walter",
    })

    render(
      <JoinForm
        content={content}
        locale="en"
        displayName="Walter Morales"
        onClaimed={onClaimed}
      />
    )

    await user.type(field("join-username"), "walter")
    await user.type(field("join-headline"), "Founder working on applied AI")
    await user.selectOptions(field("join-role"), "FOUNDER")
    await user.click(screen.getByRole("checkbox", { name: /Terms of use/i }))
    await user.click(screen.getByRole("checkbox", { name: content.ageAccept }))
    await user.click(screen.getByRole("button", { name: content.submit }))

    expect(claimMock).toHaveBeenCalledWith({
      data: expect.objectContaining({
        username: "walter",
        displayName: "Walter Morales",
        headline: "Founder working on applied AI",
        countryCode: "SV",
        role: "FOUNDER",
        acceptLegal: true,
        acceptAge: true,
        marketing: false,
        locale: "en",
      }),
    })
    expect(onClaimed).toHaveBeenCalledWith({ number: 5, username: "walter" })
  })

  it("surfaces a taken username from the server", async () => {
    const user = userEvent.setup()
    claimMock.mockResolvedValue({ status: "username_taken" })

    render(
      <JoinForm
        content={content}
        locale="en"
        displayName="Walter Morales"
        onClaimed={vi.fn()}
      />
    )

    await user.type(field("join-username"), "walter")
    await user.type(field("join-headline"), "Founder working on applied AI")
    await user.selectOptions(field("join-role"), "FOUNDER")
    await user.click(screen.getByRole("checkbox", { name: /Terms of use/i }))
    await user.click(screen.getByRole("checkbox", { name: content.ageAccept }))
    await user.click(screen.getByRole("button", { name: content.submit }))

    expect(screen.getByText(content.fieldErrors.taken)).toBeTruthy()
  })
})
