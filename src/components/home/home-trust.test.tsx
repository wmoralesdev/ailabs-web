import { act, cleanup, render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { renderToString } from "react-dom/server"

import { es } from "@/content/es"
import { HomeTrust } from "./home-trust"

const trust = es.home.trust
let reducedMotion = false
let visibility: DocumentVisibilityState = "visible"
let onMediaChange: (() => void) | undefined
let onIntersection:
  ((entries: Partial<IntersectionObserverEntry>[]) => void) | undefined
const disconnect = vi.fn()

beforeEach(() => {
  reducedMotion = false
  visibility = "visible"
  onMediaChange = undefined
  onIntersection = undefined
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockReturnValue({
    width: 1176,
  } as DOMRect)
  vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(1440)
  vi.spyOn(document, "visibilityState", "get").mockImplementation(
    () => visibility
  )
  vi.stubGlobal("matchMedia", () => ({
    get matches() {
      return reducedMotion
    },
    addEventListener: (_: string, listener: () => void) => {
      onMediaChange = listener
    },
    removeEventListener: vi.fn(),
  }))
  vi.stubGlobal(
    "ResizeObserver",
    class {
      observe() {}
      disconnect = disconnect
    }
  )
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: typeof onIntersection) {
        onIntersection = callback
      }
      observe() {}
      disconnect = disconnect
    }
  )
})

afterEach(() => {
  cleanup()
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.clearAllMocks()
})

describe("ambassador marquee", () => {
  it("renders a static server fallback before scripts initialize", () => {
    const html = renderToString(<HomeTrust trust={trust} />)
    expect(html).not.toContain('data-ready="true"')
    expect(html).toContain(
      'class="home-trust-logo-list home-trust-marquee-static" tabindex="0"'
    )
    expect(html).toContain(trust.label)
    for (const logo of trust.logos) expect(html).toContain(logo.name)
  })

  it("exposes each ambassador once despite repeated visual sets", () => {
    render(<HomeTrust trust={trust} />)
    const list = screen.getByRole("list")
    expect(within(list).getAllByRole("listitem")).toHaveLength(7)
    for (const logo of trust.logos)
      expect(
        within(list).getByText(logo.name, { selector: ".sr-only" })
      ).toBeInTheDocument()
  })

  it("pauses and resumes without remounting the moving track", async () => {
    const user = userEvent.setup()
    const { container } = render(<HomeTrust trust={trust} />)
    act(() => onIntersection?.([{ isIntersecting: true }]))
    const section = screen.getByRole("region", { name: trust.label })
    const track = container.querySelector(".home-trust-marquee-track")
    expect(section).not.toHaveAttribute("data-paused")
    await user.click(screen.getByRole("button", { name: trust.pause }))
    expect(section).toHaveAttribute("data-paused", "true")
    await user.click(screen.getByRole("button", { name: trust.resume }))
    expect(section).not.toHaveAttribute("data-paused")
    expect(container.querySelector(".home-trust-marquee-track")).toBe(track)
  })

  it("stops outside the viewport or in a hidden tab and preserves a user pause", async () => {
    const user = userEvent.setup()
    render(<HomeTrust trust={trust} />)
    const section = screen.getByRole("region", { name: trust.label })
    expect(section).toHaveAttribute("data-paused", "true")
    act(() => onIntersection?.([{ isIntersecting: true }]))
    act(() => {
      visibility = "hidden"
      document.dispatchEvent(new Event("visibilitychange"))
    })
    expect(section).toHaveAttribute("data-paused", "true")
    act(() => {
      visibility = "visible"
      document.dispatchEvent(new Event("visibilitychange"))
    })
    await user.click(screen.getByRole("button", { name: trust.pause }))
    act(() => onIntersection?.([{ isIntersecting: false }]))
    act(() => onIntersection?.([{ isIntersecting: true }]))
    expect(section).toHaveAttribute("data-paused", "true")
  })

  it("returns to the keyboard-scrollable static list when reduced motion changes", () => {
    render(<HomeTrust trust={trust} />)
    act(() => {
      reducedMotion = true
      onMediaChange?.()
    })
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
    expect(screen.getByRole("list")).toHaveAttribute("tabindex", "0")
    expect(screen.getByRole("region")).not.toHaveAttribute("data-ready")
  })

  it("disconnects observers on unmount", () => {
    const { unmount } = render(<HomeTrust trust={trust} />)
    unmount()
    expect(disconnect).toHaveBeenCalledTimes(2)
  })
})
