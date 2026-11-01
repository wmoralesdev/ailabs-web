import { cleanup, render, screen, within } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { renderToString } from "react-dom/server"

import { en } from "@/content/en"
import { es } from "@/content/es"
import { HomeAmbassadors } from "./home-ambassadors"

afterEach(cleanup)

describe("HomeAmbassadors", () => {
  it("names every ambassador program once, in order, and Claude apart", () => {
    render(<HomeAmbassadors ambassadors={es.home.ambassadors} />)
    const section = screen.getByRole("region", {
      name: es.home.ambassadors.label,
    })
    const lists = within(section).getAllByRole("list")
    expect(lists).toHaveLength(2)
    const [programs, partners] = lists
    expect(
      within(programs)
        .getAllByRole("listitem")
        .map((item) => item.textContent)
    ).toEqual(es.home.ambassadors.logos.map((logo) => logo.name))
    expect(
      within(partners)
        .getAllByRole("listitem")
        .map((item) => item.textContent)
    ).toEqual(["Claude"])
    expect(within(section).getByText(es.home.ambassadors.stat.value)).toBeTruthy()
    expect(within(section).getByText(es.home.ambassadors.body)).toBeTruthy()
  })

  it("server-renders the marks as decorative dots", () => {
    const html = renderToString(
      <HomeAmbassadors ambassadors={en.home.ambassadors} />
    )
    expect(html).toContain("<circle")
    expect(html).toContain('aria-hidden="true"')
    for (const logo of en.home.ambassadors.logos) {
      expect(html).toContain(logo.name)
    }
    expect(html).toContain(en.home.ambassadors.partnersLabel)
  })
})
