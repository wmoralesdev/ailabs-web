/**
 * The cal.com event behind `/agendar`, read and booked from the browser. The
 * booker on the page is ours; cal.com stays the calendar of record (conflicts,
 * the Google Meet link, the invitation email). Both endpoints are public for a
 * public event, so there is no key and nothing is stored on our side.
 */
const API_ORIGIN = "https://api.cal.com/v2"
const SLOTS_API_VERSION = "2024-09-04"
const BOOKINGS_API_VERSION = "2026-02-25"

/** Local dates (`YYYY-MM-DD`, in the visitor's time zone) to slot start times. */
export type SlotsByDay = Record<string, Array<string>>

export type BookingRequest = {
  /** Slot start, any ISO 8601 instant. */
  start: string
  name: string
  email: string
  company: string
  /** The option label exactly as the event stores it. */
  topic: string
  notes?: string
  timeZone: string
  language: "es" | "en"
}

export type BookingResult = {
  uid: string
  start: string
}

export class BookingError extends Error {
  constructor(
    message: string,
    /** The slot is gone or the request was refused; the visitor should pick again. */
    readonly rejected: boolean
  ) {
    super(message)
    this.name = "BookingError"
  }
}

/** Splits `<username>/<event-slug>`. */
export function parseCalLink(calLink: string) {
  const [username = "", eventTypeSlug = ""] = calLink.split("/")
  return { username, eventTypeSlug }
}

function pad(value: number) {
  return String(value).padStart(2, "0")
}

/** `YYYY-MM-DD` of a local date. */
export function dayKey(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

/** The local date a `YYYY-MM-DD` key names. */
export function dateFromKey(key: string) {
  const [year, month, day] = key.split("-").map(Number)
  return new Date(year, month - 1, day)
}

/**
 * The span to ask the API for a month, as UTC instants: from now on for the
 * current month, through the last millisecond of the month's last local day.
 * The API reads a bare date as a UTC day, which would shift the month by the
 * visitor's offset and drop the evening of its last day.
 */
export function monthRange(month: Date, now: Date) {
  const first = new Date(month.getFullYear(), month.getMonth(), 1)
  const next = new Date(month.getFullYear(), month.getMonth() + 1, 1)
  return {
    start: (now > first ? now : first).toISOString(),
    end: new Date(next.getTime() - 1).toISOString(),
  }
}

/**
 * Whether a refused booking means the time is gone (taken, past or inside the
 * notice), so the visitor should pick another. Other refusals, such as a
 * rate limit or a field cal.com did not accept, are failures to retry.
 */
export function isSlotGone(status: number, message = "") {
  if (status === 409) return true
  if (status !== 400 && status !== 422) return false
  return /already has booking|not available|no_available_users|unavailable|already booked|in the past|booking notice|slot/i.test(
    message
  )
}

export async function fetchSlots(
  calLink: string,
  month: Date,
  timeZone: string,
  now: Date = new Date()
): Promise<SlotsByDay> {
  const { username, eventTypeSlug } = parseCalLink(calLink)
  const { start, end } = monthRange(month, now)
  const query = new URLSearchParams({
    username,
    eventTypeSlug,
    start,
    end,
    timeZone,
  })
  const response = await fetch(`${API_ORIGIN}/slots?${query}`, {
    headers: { "cal-api-version": SLOTS_API_VERSION },
  })
  if (!response.ok) {
    throw new Error(`Slots request failed (${response.status})`)
  }
  const body = (await response.json()) as {
    data?: Record<string, Array<{ start: string }>>
  }
  const days: SlotsByDay = {}
  for (const [day, slots] of Object.entries(body.data ?? {})) {
    if (slots.length > 0) days[day] = slots.map((slot) => slot.start)
  }
  return days
}

export async function createBooking(
  calLink: string,
  request: BookingRequest
): Promise<BookingResult> {
  const { username, eventTypeSlug } = parseCalLink(calLink)
  const response = await fetch(`${API_ORIGIN}/bookings`, {
    method: "POST",
    headers: {
      "cal-api-version": BOOKINGS_API_VERSION,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      start: new Date(request.start).toISOString(),
      username,
      eventTypeSlug,
      attendee: {
        name: request.name,
        email: request.email,
        timeZone: request.timeZone,
        language: request.language,
      },
      bookingFieldsResponses: {
        empresa: request.company,
        tema: request.topic,
        ...(request.notes ? { notes: request.notes } : {}),
      },
    }),
  })
  const body = (await response.json().catch(() => null)) as {
    data?: { uid?: string; start?: string }
    error?: { message?: string }
  } | null
  if (!response.ok || !body?.data?.uid) {
    const message = String(
      body?.error?.message ?? `Booking failed (${response.status})`
    )
    throw new BookingError(message, isSlotGone(response.status, message))
  }
  return { uid: body.data.uid, start: body.data.start ?? request.start }
}
