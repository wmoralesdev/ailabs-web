import { readFileSync } from "node:fs"

import { describe, expect, it } from "vitest"

import {
  BOOKING_CAL_LINK,
  BOOKING_TOPICS,
  BOOKING_URL,
  SERVICE_BOOKING_TOPIC,
  isBookingTopic,
} from "@/content/booking"
import { SERVICE_PAGE_IDS } from "@/lib/service-pages"

describe("booking", () => {
  it("points at the one cal.com diagnostic event", () => {
    expect(BOOKING_CAL_LINK).toBe("walter-ailabs/diagnostico")
    expect(BOOKING_URL).toBe("https://cal.com/walter-ailabs/diagnostico")
  })

  it("maps every service page to one option of the topic question", () => {
    for (const id of SERVICE_PAGE_IDS) {
      expect(isBookingTopic(SERVICE_BOOKING_TOPIC[id])).toBe(true)
    }
    expect(Object.keys(BOOKING_TOPICS)).toHaveLength(SERVICE_PAGE_IDS.length)
    expect(isBookingTopic("otro")).toBe(false)
    expect(isBookingTopic(undefined)).toBe(false)
  })

  it("sends the topic from both service CTAs and reads it on /agendar", () => {
    const page = readFileSync(
      "src/components/marketing/service-page.tsx",
      "utf8"
    )
    expect(page.match(/SERVICE_BOOKING_TOPIC\[id\]/g)).toHaveLength(2)
    const route = readFileSync("src/routes/_site/agendar.tsx", "utf8")
    expect(route).toContain("validateSearch")
    expect(route).toContain("<BookingEmbed")
    expect(route).not.toContain("<iframe")
  })
})
