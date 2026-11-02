import { cleanup, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { es } from "@/content/es"
import { dayKey } from "@/lib/cal-booking"
import { Booker } from "./booker"

afterEach(() => {
  cleanup()
  vi.unstubAllGlobals()
})

const copy = es.booking.booker

function todayAtTen() {
  const now = new Date()
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10)
}

function slotsResponse(start: Date) {
  return Response.json({
    status: "success",
    data: { [dayKey(start)]: [{ start: start.toISOString() }] },
  })
}

function stubCal() {
  const start = todayAtTen()
  const fetchMock = vi.fn((_url: string, init?: RequestInit) => {
    if (init?.method === "POST") {
      return Promise.resolve(
        Response.json(
          {
            status: "success",
            data: { uid: "abc123", start: start.toISOString() },
          },
          { status: 201 }
        )
      )
    }
    return Promise.resolve(slotsResponse(start))
  })
  vi.stubGlobal("fetch", fetchMock)
  return { fetchMock, start }
}

function refuseBooking(
  fetchMock: ReturnType<typeof stubCal>["fetchMock"],
  status: number,
  message: string
) {
  const original = fetchMock.getMockImplementation()!
  fetchMock.mockImplementation((url, init) =>
    init?.method === "POST"
      ? Promise.resolve(
          Response.json({ status: "error", error: { message } }, { status })
        )
      : original(url, init)
  )
}

function renderBooker(topic?: "consultoria") {
  return render(
    <Booker
      calLink="walter-ailabs/diagnostico"
      topic={topic}
      locale="es"
      copy={copy}
      title={es.booking.embedTitle}
      headline={es.booking.headline}
      lead={es.booking.body}
    />
  )
}

async function fillForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(screen.getByLabelText(copy.nameLabel), "Ana Pérez")
  await user.type(screen.getByLabelText(copy.emailLabel), "ana@empresa.com")
  await user.type(screen.getByLabelText(copy.companyLabel), "Empresa")
}

describe("Booker", () => {
  it("lists the times of the first available day and books one", async () => {
    const { fetchMock, start } = stubCal()
    const user = userEvent.setup()
    renderBooker("consultoria")

    await user.click(await screen.findByRole("button", { name: /10:00/ }))

    // The clicked time is gone; focus continues in the form.
    expect(document.activeElement).toBe(screen.getByLabelText(copy.nameLabel))

    // The service page's topic arrives selected.
    const topic = screen.getByRole("radio", { name: copy.topics.consultoria })
    expect((topic as HTMLInputElement).checked).toBe(true)

    await fillForm(user)
    await user.click(screen.getByRole("button", { name: copy.submit }))

    const confirmed = await screen.findByRole("heading", {
      name: copy.confirmedTitle,
    })
    expect(document.activeElement).toBe(confirmed)
    expect(screen.getByText("ana@empresa.com")).toBeTruthy()

    const post = fetchMock.mock.calls.find(
      ([, init]) => init?.method === "POST"
    )
    const body = JSON.parse(String(post?.[1]?.body))
    expect(body.start).toBe(start.toISOString())
    expect(body.attendee.email).toBe("ana@empresa.com")
    expect(body.bookingFieldsResponses.tema).toBe(
      "Consultoría: saber por dónde empezar con IA"
    )
  })

  it("goes back to fresh times when the slot was taken", async () => {
    const { fetchMock } = stubCal()
    refuseBooking(
      fetchMock,
      400,
      "User either already has booking at this time or is not available"
    )
    const user = userEvent.setup()
    renderBooker()

    await user.click(await screen.findByRole("button", { name: /10:00/ }))
    await fillForm(user)
    await user.click(screen.getByRole("radio", { name: copy.topics.indeciso }))
    await user.click(screen.getByRole("button", { name: copy.submit }))

    expect((await screen.findByRole("alert")).textContent).toBe(copy.rejected)
    await waitFor(() =>
      expect(screen.getByRole("button", { name: /10:00/ })).toBeTruthy()
    )
  })

  it("keeps the form when cal.com refuses for another reason", async () => {
    const { fetchMock } = stubCal()
    refuseBooking(fetchMock, 429, "ThrottlerException: Too Many Requests")
    const user = userEvent.setup()
    renderBooker()

    await user.click(await screen.findByRole("button", { name: /10:00/ }))
    await fillForm(user)
    await user.click(screen.getByRole("radio", { name: copy.topics.indeciso }))
    await user.click(screen.getByRole("button", { name: copy.submit }))

    expect((await screen.findByRole("alert")).textContent).toBe(copy.failed)
    expect(screen.getByLabelText(copy.nameLabel)).toBeTruthy()
    expect(screen.getByRole("button", { name: copy.submit })).toHaveProperty(
      "disabled",
      false
    )
  })

  it("offers a retry when the calendar cannot load", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")))
    renderBooker()
    expect(await screen.findByText(copy.loadError)).toBeTruthy()
    expect(screen.getByRole("button", { name: copy.retry })).toBeTruthy()
  })

  it("starts weeks on Sunday and names days in Spanish", async () => {
    stubCal()
    renderBooker()

    const selected = await screen.findByRole("button", {
      name: /seleccionado/,
    })
    expect(selected.getAttribute("aria-label")).toMatch(/^Hoy, /)
    expect(
      screen
        .getAllByRole("columnheader", { hidden: true })[0]
        .getAttribute("aria-label")
    ).toBe("domingo")
    // The times are grouped under the full date.
    expect(
      screen.getByRole("group", { name: new RegExp(dayKeyDay(), "i") })
    ).toBeTruthy()
  })

  it("keeps a month's times when the visitor flips away before they arrive", async () => {
    const pending: Array<(response: Response) => void> = []
    vi.stubGlobal(
      "fetch",
      vi.fn(
        () =>
          new Promise<Response>((resolve) => {
            pending.push(resolve)
          })
      )
    )
    const user = userEvent.setup()
    renderBooker()

    await waitFor(() => expect(pending).toHaveLength(1))
    await user.click(screen.getByRole("button", { name: copy.nextMonth }))
    await waitFor(() => expect(pending).toHaveLength(2))

    // This month's answer arrives while the next month is on screen.
    pending[0](slotsResponse(todayAtTen()))
    await new Promise((settle) => setTimeout(settle, 0))
    await user.click(screen.getByRole("button", { name: copy.previousMonth }))

    // Shown at once, while the refresh of the month is still in flight.
    expect(await screen.findByRole("button", { name: /10:00/ })).toBeTruthy()
    expect(pending).toHaveLength(3)
  })
})

/** Today's day of the month, as it appears in the full date. */
function dayKeyDay() {
  return `\\b${new Date().getDate()}\\b`
}
