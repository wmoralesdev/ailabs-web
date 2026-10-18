import { cleanup, render, screen, within } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { EventsIndex } from "@/components/events/events-index"
import { en } from "@/content/en"
import { es } from "@/content/es"

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

const now = new Date("2026-10-18T12:00:00.000Z")

afterEach(() => {
  cleanup()
})

describe("events index page", () => {
  it("shows upcoming Luma events before past ones in Spanish", () => {
    render(<EventsIndex locale="es" copy={es.events} now={now} />)

    expect(
      screen.getByRole("heading", { level: 1, name: es.events.headline })
    ).toBeInTheDocument()

    const upcoming = screen.getByRole("region", { name: "Próximos" })
    expect(
      within(upcoming)
        .getAllByRole("link")
        .map((link) => link.getAttribute("href"))
    ).toEqual(["https://luma.com/q0l9hdwo", "https://luma.com/0vam8okf"])

    const devday = within(upcoming).getByRole("link", {
      name: /DevDay Exchange Community/,
    })
    expect(devday).toHaveAttribute("href", "https://luma.com/0vam8okf")
    expect(devday).toHaveTextContent("Biblioteca Nacional de El Salvador")
    expect(devday).toHaveTextContent("Walter Morales")
    expect(devday).toHaveTextContent("Daniela Huezo")
    expect(devday).toHaveTextContent("Ver en Luma")
    expect(devday).not.toHaveTextContent(/por confirmar|la página dice/i)

    const past = screen.getByRole("region", { name: "Anteriores" })
    const pastLinks = within(past).getAllByRole("link")
    expect(pastLinks.map((link) => link.getAttribute("href"))).toEqual([
      "https://luma.com/spacexai-ikz6",
      "https://luma.com/x36xff8j",
      "https://luma.com/hrf7a7di",
    ])
    expect(past).toHaveTextContent("Ciudad de Guatemala")
    expect(
      screen.queryByRole("link", { name: /Cursor Workshop El Salvador/ })
    ).not.toBeInTheDocument()
    expect(screen.queryByText("Septiembre de 2026")).not.toBeInTheDocument()

    expect(
      screen.getByRole("link", { name: /Ver calendario/ })
    ).toHaveAttribute("href", "https://luma.com/user/wmoralesdev")
    expect(
      screen.getByRole("link", { name: "Unirme a la comunidad" })
    ).toHaveAttribute("href", "/community")

    expect(screen.getAllByRole("img")).toHaveLength(es.events.photos.length)
    for (const photo of es.events.photos) {
      expect(screen.getByRole("img", { name: photo.alt })).toHaveAttribute(
        "src",
        photo.src
      )
    }
    expect(
      screen.queryByRole("button", { name: "Reanudar fotos" })
    ).not.toBeInTheDocument()
  })

  it("uses English chrome on the same events", () => {
    render(<EventsIndex locale="en" copy={en.events} now={now} />)

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Ai Labs events in El Salvador",
      })
    ).toBeInTheDocument()

    const upcoming = screen.getByRole("region", { name: "Upcoming" })
    const devday = within(upcoming).getByRole("link", {
      name: /DevDay Exchange Community/,
    })
    expect(devday).toHaveTextContent("National Library of El Salvador")
    expect(devday).toHaveTextContent("View on Luma")
    expect(devday).toHaveTextContent("Hosts")
    expect(screen.getByRole("link", { name: /View calendar/ })).toHaveAttribute(
      "href",
      "https://luma.com/user/wmoralesdev"
    )
    expect(screen.getByRole("link", { name: /View calendar/ })).toHaveAttribute(
      "target",
      "_blank"
    )
    expect(
      screen.getByRole("link", { name: "Join the community" })
    ).toHaveAttribute("href", "/community")
    expect(
      screen.getByRole("img", { name: en.events.photos[0].alt })
    ).toBeInTheDocument()
  })

  it("says when the current month has no published events", () => {
    render(
      <EventsIndex
        locale="es"
        copy={es.events}
        now={new Date("2026-11-15T18:00:00.000Z")}
      />
    )

    expect(
      screen.getByText(
        "No hay eventos de Ai Labs publicados en Luma en noviembre de 2026."
      )
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("region", { name: "Próximos" })
    ).not.toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: /Ver calendario/ })
    ).toBeInTheDocument()
    expect(screen.getAllByRole("img")).toHaveLength(es.events.photos.length)
  })
})
