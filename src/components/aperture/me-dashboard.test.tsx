import type { ReactNode } from "react"
import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import { en } from "@/content/en"
import type { MeDashboard } from "@/server/aperture/me"
import { MeDashboardView } from "./me-dashboard"

vi.mock("@/server/aperture/me", () => ({
  updateMeProfile: vi.fn(),
  updateMeNewsletter: vi.fn(),
}))

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to }: { children: ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}))

const dashboard: MeDashboard = {
  number: 5,
  username: "walter",
  profile: {
    username: "walter",
    displayName: "Walter Morales",
    headline: "Building with AI",
    bio: null,
    countryCode: "SV",
    city: null,
    role: "DEVELOPER",
    upFor: [],
    showEvents: false,
    linkedinUrl: null,
    xUrl: null,
    githubUrl: null,
    websiteUrl: null,
    instagramUrl: null,
  },
  newsletter: false,
  usernameAvailableAt: null,
  events: [],
  credits: [],
}

describe("MeDashboardView", () => {
  it("shows the member number and empty events and credits", () => {
    render(
      <MeDashboardView
        dashboard={dashboard}
        join={en.aperture.join}
        content={en.aperture.me}
        locale="en"
        onDashboard={() => undefined}
      />
    )

    expect(screen.getByText("Member #005")).toBeTruthy()
    expect(screen.getByRole("link", { name: "/u/walter" })).toBeTruthy()
    expect(screen.getByText(en.aperture.me.eventsEmpty)).toBeTruthy()
    expect(screen.getByText(en.aperture.me.creditsEmpty)).toBeTruthy()
    expect(
      screen.getByRole("button", { name: en.aperture.me.save })
    ).toBeTruthy()
  })
})
