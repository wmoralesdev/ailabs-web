import type { ReactNode } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import { en } from "@/content/en"
import { MemberDirectory } from "./member-directory"

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))

describe("MemberDirectory", () => {
  it("lists members and the join CTA", () => {
    render(
      <MemberDirectory
        members={[
          {
            number: 5,
            username: "walter",
            displayName: "Walter Morales",
            headline: "Building with AI",
            countryCode: "SV",
            role: "FOUNDER",
            avatarUrl: null,
          },
        ]}
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
})
