import type { ReactNode } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, fireEvent, render, screen } from "@testing-library/react"

import { en } from "@/content/en"
import { MemberDirectory } from "./member-directory"

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))

const members = [
  {
    number: 5,
    username: "walter",
    displayName: "Walter Morales",
    headline: "Building with AI",
    countryCode: "SV",
    role: "FOUNDER",
    avatarUrl: null,
  },
  {
    number: 6,
    username: "ana",
    displayName: "Ana Peña",
    headline: "Design systems",
    countryCode: "MX",
    role: "DESIGNER",
    avatarUrl: null,
  },
] as const

describe("MemberDirectory", () => {
  afterEach(cleanup)

  it("lists members and the join CTA", () => {
    render(
      <MemberDirectory
        members={members}
        join={en.aperture.join}
        content={en.aperture.directory}
        locale="en"
      />
    )

    expect(screen.getByText("#005")).toBeTruthy()
    expect(screen.getByText("Walter Morales")).toBeTruthy()
    expect(
      screen.getByRole("link", { name: en.aperture.directory.joinCta })
    ).toBeTruthy()
  })

  it("filters by search text and role", () => {
    render(
      <MemberDirectory
        members={members}
        join={en.aperture.join}
        content={en.aperture.directory}
        locale="en"
      />
    )

    fireEvent.change(
      screen.getByRole("searchbox", {
        name: en.aperture.directory.searchLabel,
      }),
      { target: { value: "pena" } }
    )
    expect(screen.queryByText("Walter Morales")).toBeNull()
    expect(screen.getByText("Ana Peña")).toBeTruthy()
    expect(screen.getByText("1 of 2")).toBeTruthy()

    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "" } })
    fireEvent.click(
      screen.getByRole("button", { name: en.aperture.join.roleOptions.FOUNDER })
    )
    expect(screen.getByText("Walter Morales")).toBeTruthy()
    expect(screen.queryByText("Ana Peña")).toBeNull()

    fireEvent.click(
      screen.getByRole("button", {
        name: en.aperture.join.roleOptions.DESIGNER,
      })
    )
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "walter" },
    })
    expect(screen.getByText(en.aperture.directory.noResults)).toBeTruthy()
    fireEvent.click(
      screen.getByRole("button", { name: en.aperture.directory.clearFilters })
    )
    expect(screen.getByText("Ana Peña")).toBeTruthy()
    expect(screen.queryByText("2 of 2")).toBeNull()
  })
})
