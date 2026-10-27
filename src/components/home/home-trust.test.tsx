import { cleanup, render, screen, within } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { renderToString } from "react-dom/server"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { HomeTrust } from "./home-trust"

afterEach(cleanup)

describe("HomeTrust", () => {
  it("names every ambassador program once, in order", () => {
    render(<HomeTrust trust={es.home.trust} />)
    const section = screen.getByRole("region", { name: es.home.trust.label })
    const items = within(section).getAllByRole("listitem")
    expect(items.map((item) => item.textContent)).toEqual(
      es.home.trust.logos.map((logo) => logo.name)
    )
  })

  it("server-renders the marks as decorative dots", () => {
    const html = renderToString(<HomeTrust trust={en.home.trust} />)
    expect(html).toContain("<circle")
    expect(html).toContain('aria-hidden="true"')
    for (const logo of en.home.trust.logos) expect(html).toContain(logo.name)
  })
})
