import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { en } from "@/content/en"
import { es } from "@/content/es"

import { ConsultingPage } from "./consulting-page"

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string
    children: React.ReactNode
    className?: string
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}))

afterEach(() => {
  cleanup()
})

describe("ConsultingPage", () => {
  it("renders the Spanish title, first paragraph, and the same FAQ answer", () => {
    const { container } = render(
      <ConsultingPage locale="es" content={es.consulting} />
    )

    expect(
      screen.getByRole("heading", { level: 1, name: es.consulting.headline })
    ).toBeInTheDocument()
    expect(container.querySelector("article p")?.textContent).toBe(
      es.consulting.lead
    )
    expect(container.querySelector("article header p")?.textContent).toBe(
      es.consulting.lead
    )
    expect(screen.getAllByText(es.consulting.claims[0] ?? "")).toHaveLength(2)
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
    const cta = screen.getByRole("link", { name: es.consulting.cta })
    expect(cta).toBeVisible()
    expect(cta).toHaveAttribute("href", "/agendar")
  })

  it("renders the English title on the same component", () => {
    render(<ConsultingPage locale="en" content={en.consulting} />)

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
    expect(
      screen.getByRole("link", { name: en.consulting.cta })
    ).toHaveAttribute("href", "/en/agendar")
  })
})
