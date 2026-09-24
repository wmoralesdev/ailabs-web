import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"

import { en } from "@/content/en"
import type { PublicProfile } from "@/server/aperture/public"
import { PublicProfileView } from "./public-profile"

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
    expect(screen.getByRole("link", { name: "LinkedIn" })).toBeTruthy()
    expect(screen.getByText("Lane notes")).toBeTruthy()
    expect(screen.getByText("Cursor 70%")).toBeTruthy()
    expect(screen.getByText("Builders Night")).toBeTruthy()
    expect(screen.queryByText("walter@example.com")).toBeNull()
  })
})
