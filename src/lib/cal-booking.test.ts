import { afterEach, describe, expect, it, vi } from "vitest"

import {
  BookingError,
  createBooking,
  dateFromKey,
  dayKey,
  fetchSlots,
  isSlotGone,
  monthRange,
  parseCalLink,
} from "./cal-booking"

afterEach(() => {
  vi.unstubAllGlobals()
})

describe("cal.com booking helpers", () => {
  it("splits the event link into username and slug", () => {
    expect(parseCalLink("walter-ailabs/diagnostico")).toEqual({
      username: "walter-ailabs",
      eventTypeSlug: "diagnostico",
    })
  })

  it("round-trips local day keys", () => {
    const date = new Date(2026, 10, 2)
    expect(dayKey(date)).toBe("2026-11-02")
    expect(dateFromKey("2026-11-02").getTime()).toBe(date.getTime())
  })

  it("asks from now for the current month and from the local 1st after it", () => {
    const now = new Date(2026, 10, 12, 15, 30)
    expect(monthRange(new Date(2026, 10, 1), now)).toEqual({
      start: now.toISOString(),
      end: new Date(2026, 11, 1, 0, 0, 0, -1).toISOString(),
    })
    expect(monthRange(new Date(2026, 11, 1), now)).toEqual({
      start: new Date(2026, 11, 1).toISOString(),
      end: new Date(2027, 0, 1, 0, 0, 0, -1).toISOString(),
    })
  })

  it("covers the whole local month, evening of the last day included", () => {
    const { start, end } = monthRange(
      new Date(2026, 10, 1),
      new Date(2026, 9, 20)
    )
    // Bare dates would be read as UTC days and shift with the offset.
    expect(new Date(start).getTime()).toBe(new Date(2026, 10, 1).getTime())
    expect(new Date(end).getTime()).toBe(
      new Date(2026, 10, 30, 23, 59, 59, 999).getTime()
    )
  })

  it("tells a time that is gone from other refusals", () => {
    expect(isSlotGone(409)).toBe(true)
    expect(
      isSlotGone(
        400,
        "User either already has booking at this time or is not available"
      )
    ).toBe(true)
    expect(isSlotGone(400, "no_available_users_found_error")).toBe(true)
    expect(isSlotGone(400, "bookingFieldsResponses.empresa is required")).toBe(
      false
    )
    expect(isSlotGone(429, "Too many requests")).toBe(false)
    expect(isSlotGone(500, "slot")).toBe(false)
  })
})

describe("fetchSlots", () => {
  it("reads the public slots endpoint and keeps days with times", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      Response.json({
        status: "success",
        data: {
          "2026-11-02": [{ start: "2026-11-02T09:00:00.000-06:00" }],
          "2026-11-03": [],
        },
      })
    )
    vi.stubGlobal("fetch", fetchMock)

    const days = await fetchSlots(
      "walter-ailabs/diagnostico",
      new Date(2026, 10, 1),
      "America/El_Salvador",
      new Date(2026, 10, 1)
    )

    expect(days).toEqual({ "2026-11-02": ["2026-11-02T09:00:00.000-06:00"] })
    const [url, init] = fetchMock.mock.calls[0]
    const query = new URL(url).searchParams
    expect(query.get("username")).toBe("walter-ailabs")
    expect(query.get("eventTypeSlug")).toBe("diagnostico")
    expect(query.get("start")).toBe(new Date(2026, 10, 1).toISOString())
    expect(query.get("end")).toBe(
      new Date(2026, 10, 30, 23, 59, 59, 999).toISOString()
    )
    expect(query.get("timeZone")).toBe("America/El_Salvador")
    expect(init.headers["cal-api-version"]).toBeTruthy()
  })

  it("throws when the API answers with an error", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("nope", { status: 500 }))
    )
    await expect(
      fetchSlots("a/b", new Date(2026, 10, 1), "UTC")
    ).rejects.toThrow()
  })
})

describe("createBooking", () => {
  const request = {
    start: "2026-11-02T09:00:00.000-06:00",
    name: "Ana Pérez",
    email: "ana@empresa.com",
    company: "Empresa",
    topic: "Capacitar a mi equipo",
    notes: "",
    timeZone: "America/El_Salvador",
    language: "es" as const,
  }

  it("posts the attendee, the event and the custom answers in UTC", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValue(
        Response.json(
          { status: "success", data: { uid: "abc", start: request.start } },
          { status: 201 }
        )
      )
    vi.stubGlobal("fetch", fetchMock)

    const result = await createBooking("walter-ailabs/diagnostico", request)

    expect(result).toEqual({ uid: "abc", start: request.start })
    const [, init] = fetchMock.mock.calls[0]
    expect(init.method).toBe("POST")
    expect(JSON.parse(init.body)).toEqual({
      start: "2026-11-02T15:00:00.000Z",
      username: "walter-ailabs",
      eventTypeSlug: "diagnostico",
      attendee: {
        name: "Ana Pérez",
        email: "ana@empresa.com",
        timeZone: "America/El_Salvador",
        language: "es",
      },
      bookingFieldsResponses: {
        empresa: "Empresa",
        tema: "Capacitar a mi equipo",
      },
    })
  })

  it("marks a taken time so the visitor picks another", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        Response.json(
          {
            status: "error",
            error: {
              message:
                "User either already has booking at this time or is not available",
            },
          },
          { status: 400 }
        )
      )
    )
    await expect(
      createBooking("walter-ailabs/diagnostico", request)
    ).rejects.toMatchObject({ name: "BookingError", rejected: true })
  })

  it("does not blame the time for a refused field or a rate limit", async () => {
    for (const [status, message] of [
      [400, "bookingFieldsResponses.empresa is required"],
      [429, "ThrottlerException: Too Many Requests"],
    ] as const) {
      vi.stubGlobal(
        "fetch",
        vi
          .fn()
          .mockResolvedValue(
            Response.json({ status: "error", error: { message } }, { status })
          )
      )
      await expect(
        createBooking("walter-ailabs/diagnostico", request)
      ).rejects.toMatchObject({ name: "BookingError", rejected: false })
    }
  })

  it("keeps a server failure retryable", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("down", { status: 503 }))
    )
    const failure = await createBooking("a/b", request).catch(
      (error: unknown) => error
    )
    expect(failure).toBeInstanceOf(BookingError)
    expect((failure as BookingError).rejected).toBe(false)
  })
})
