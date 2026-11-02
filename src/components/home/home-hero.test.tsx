import { cleanup, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"

import { HomeHero } from "@/components/home/home-hero"
import { COMMUNITY_WHATSAPP_URL } from "@/content/booking"
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

vi.mock("@/components/halftone/halftone-canvas", () => ({
  HalftoneCanvas: () => null,
}))

afterEach(() => {
  cleanup()
})

describe("home hero on the community page", () => {
  it.each([
    ["es", es, "/events"],
    ["en", en, "/en/events"],
  ] as const)(
    "joins the WhatsApp group and leads to events in %s",
    (locale, content, eventsHref) => {
      const copy = content.community
      render(
        <HomeHero
          locale={locale}
          content={content}
          hero={{
            label: copy.label,
            headline: copy.headline,
            lead: copy.lead,
            primaryCta: { label: copy.joinCta, href: COMMUNITY_WHATSAPP_URL },
            secondaryCta: { label: copy.eventsCta, href: "/events" },
          }}
          primaryAction={{
            label: copy.joinCta,
            href: COMMUNITY_WHATSAPP_URL,
            external: true,
            newTabLabel: content.events.newTabLabel,
          }}
          note={copy.joinHint}
        />
      )

      expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
        copy.headline
      )
      const join = screen.getByRole("link", {
        name: new RegExp(copy.joinCta),
      })
      expect(join).toHaveAttribute("href", COMMUNITY_WHATSAPP_URL)
      expect(join).toHaveAttribute("target", "_blank")
      expect(join).toHaveAttribute("rel", "noopener noreferrer")
      expect(
        screen.getByRole("link", { name: copy.eventsCta })
      ).toHaveAttribute("href", eventsHref)
      expect(screen.getByText(copy.joinHint)).toBeInTheDocument()
    }
  )

  it("shows no note on the home", () => {
    render(<HomeHero locale="es" content={es} />)
    expect(screen.queryByText(es.community.joinHint)).not.toBeInTheDocument()
  })
})
