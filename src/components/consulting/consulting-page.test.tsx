import { cleanup, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"

import { ConsultingPage } from "./consulting-page"

afterEach(() => {
  cleanup()
})

describe("ConsultingPage", () => {
  it("renders the Spanish title, first paragraph, and the same FAQ answer", () => {
    const onTalk = vi.fn()
    const { container } = render(
      <ConsultingPage content={es.consulting} onTalk={onTalk} />
    )

    expect(
      screen.getByRole("heading", { level: 1, name: es.consulting.headline })
    ).toBeInTheDocument()
    expect(container.querySelector("article p")?.textContent).toBe(
      es.consulting.lead
    )
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: es.consulting.faqs[0]?.question,
      })
    ).toBeInTheDocument()
    expect(screen.getAllByText(es.consulting.lead)).toHaveLength(2)
    expect(
      screen.getByRole("button", { name: es.consulting.cta })
    ).toBeVisible()
  })

  it("renders the English title on the same component", async () => {
    const onTalk = vi.fn()
    const user = userEvent.setup()
    render(<ConsultingPage content={en.consulting} onTalk={onTalk} />)

    expect(
      screen.getByRole("heading", { level: 1, name: en.consulting.headline })
    ).toBeInTheDocument()
    expect(screen.getAllByText(en.consulting.lead)).toHaveLength(2)
    await user.click(screen.getByRole("button", { name: en.consulting.cta }))
    expect(onTalk).toHaveBeenCalledOnce()
  })
})
