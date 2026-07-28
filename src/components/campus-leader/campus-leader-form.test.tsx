import { describe, expect, it, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { en } from "@/content/en"
import { CampusLeaderForm } from "./campus-leader-form"

vi.mock("@/server/campus-leader", () => ({
  submitCampusLeaderApplication: vi.fn(),
}))

describe("CampusLeaderForm", () => {
  it("advances from step 1 to step 2 with Instagram set and LinkedIn/X empty", async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    render(
      <CampusLeaderForm
        content={en.campusLeader}
        open
        onOpenChange={onOpenChange}
      />
    )

    const dialog = screen.getByRole("dialog")

    await user.type(within(dialog).getByLabelText("Name"), "Walter Morales")
    await user.type(
      within(dialog).getByLabelText("Email"),
      "walter@example.com"
    )
    await user.type(within(dialog).getByLabelText("WhatsApp"), "78452310")
    await user.selectOptions(within(dialog).getByLabelText("Year"), "3")
    await user.type(
      within(dialog).getByLabelText("Instagram"),
      "https://www.instagram.com/wmoralesdev?igsh=bW5iZ2V1M2dkeTQ3&utm_source=qr"
    )
    await user.type(
      within(dialog).getByLabelText("University / campus"),
      "UCA"
    )
    await user.selectOptions(
      within(dialog).getByLabelText("Career"),
      "sistemas"
    )

    // LinkedIn and X intentionally left empty.
    await user.click(within(dialog).getByRole("button", { name: /Continue/i }))

    expect(
      within(dialog).getByText("Step 2 of 3", { exact: false })
    ).toBeTruthy()
    expect(within(dialog).getByLabelText("Short bio")).toBeTruthy()
    expect(screen.queryByText("The form hit an error")).toBeNull()

    await user.type(
      within(dialog).getByLabelText("Short bio"),
      "I organize campus events."
    )
    await user.type(
      within(dialog).getByLabelText(/Where do people on your campus/),
      "Class WhatsApp groups."
    )
    await user.type(
      within(dialog).getByLabelText(/honest level with AI/),
      "Daily ChatGPT user."
    )
    await user.type(
      within(dialog).getByLabelText(/Why Campus Leader/),
      "I want to bring sessions to campus."
    )
    await user.click(within(dialog).getByRole("button", { name: /Continue/i }))

    expect(
      within(dialog).getByText("Step 3 of 3", { exact: false })
    ).toBeTruthy()
    expect(screen.queryByText("The form hit an error")).toBeNull()

    const cursorLabs = within(dialog).getByRole("button", {
      name: "Cursor Labs",
    })
    await user.click(cursorLabs)
    expect(cursorLabs.getAttribute("aria-pressed")).toBe("true")
    expect(screen.queryByText("The form hit an error")).toBeNull()
  })
})
