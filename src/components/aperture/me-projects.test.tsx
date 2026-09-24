import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"

import { en } from "@/content/en"
import type { MeDashboard } from "@/server/aperture/me"
import { MeProjects } from "./me-projects"

vi.mock("@/server/aperture/me", () => ({
  createMeProject: vi.fn(),
  createMeProjectImageUpload: vi.fn(),
  updateMeProject: vi.fn(),
  deleteMeProject: vi.fn(),
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
  projects: [],
}

describe("MeProjects", () => {
  it("shows the empty state and add control", () => {
    render(
      <MeProjects
        dashboard={dashboard}
        content={en.aperture.me}
        onDashboard={() => undefined}
      />
    )
    expect(screen.getByText(en.aperture.me.projectsEmpty)).toBeTruthy()
    expect(
      screen.getByRole("button", { name: en.aperture.me.addProject })
    ).toBeTruthy()
  })
})
