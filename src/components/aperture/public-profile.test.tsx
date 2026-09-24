import type { ReactNode } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import { en } from "@/content/en"
import type { PublicProfile } from "@/server/aperture/public"
import { PublicProfileView } from "./public-profile"

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))

const profile: PublicProfile = {
  number: 5,
  username: "walter",
  displayName: "Walter Morales",
  headline: "Building with AI",
  bio: "Short bio",
  countryCode: "SV",
  city: "San Salvador",
  role: "FOUNDER",
  upFor: ["MENTORING"],
  avatarUrl: null,
  links: [{ field: "linkedinUrl", href: "https://linkedin.com/in/walter" }],
  events: [
    {
      id: "evt_1",
      name: "Builders Night",
      slug: "builders-night",
      startsAt: "2026-08-01T00:00:00.000Z",
      venue: "San Salvador",
    },
  ],
  projects: [
    {
      id: "proj_1",
      slug: "lane-notes",
      title: "Lane notes",
      summary: "A notes app for builders.",
      url: "https://example.com",
      repoUrl: null,
      imageUrl: null,
      builtWith: [
        { name: "Cursor", percent: 70 },
        { name: "Claude", percent: 30 },
      ],
    },
  ],
}

describe("PublicProfileView", () => {
  it("renders the public number, links, and opted-in events", () => {
    render(
      <PublicProfileView
        profile={profile}
        join={en.aperture.join}
        me={en.aperture.me}
        content={en.aperture.profile}
        locale="en"
      />
    )

    expect(screen.getByText("#005")).toBeTruthy()
    expect(screen.getByText("Walter Morales")).toBeTruthy()
    expect(
      screen.getByRole("link", { name: en.aperture.profile.shareCta })
    ).toBeTruthy()
    expect(
      screen.getByRole("link", { name: /LinkedIn.*linkedin\.com\/in\/walter/ })
    ).toBeTruthy()
    expect(
      screen.getByRole("link", { name: en.aperture.profile.backToDirectory })
    ).toBeTruthy()
    expect(screen.getByText("Lane notes")).toBeTruthy()
    const cursor = screen.getByText("Cursor").closest("li")
    expect(cursor?.textContent).toBe("Cursor70%")
    expect(screen.getByText("Builders Night")).toBeTruthy()
    expect(screen.queryByText("walter@example.com")).toBeNull()
  })
})
