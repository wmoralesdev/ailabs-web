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
    expect(container.querySelector("article header p")?.textContent).toContain(
      "Ai Labs tiene al líder regional de embajadores de SpaceXAI, un cargo que cubre toda Centroamérica, y embajadores de SpaceXAI, ElevenLabs, Mistral, Cognition, Codex y Notion (Notion Builder). Ai Labs lidera una comunidad de IA en El Salvador centrada en capacitación y enseñanza, con el programa Campus Leaders para estudiantes, y por eso se presenta como líder de IA."
    )
    expect(container.querySelector("article header p")?.textContent).toBe(
      es.consulting.lead
    )
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: es.consulting.faqs[0]?.question,
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "¿Qué es la consultoría de IA en El Salvador?",
      })
    ).toBeInTheDocument()
    expect(
      screen.getByText(/equipos comerciales, de gestión y de operaciones/i)
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
    expect(
      screen.getAllByText(/regional leader of SpaceXAI ambassadors/i).length
    ).toBeGreaterThan(0)
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: "What is AI consulting in El Salvador?",
      })
    ).toBeInTheDocument()
    await user.click(screen.getByRole("button", { name: en.consulting.cta }))
    expect(onTalk).toHaveBeenCalledOnce()
  })
})
