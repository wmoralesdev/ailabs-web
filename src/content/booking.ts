import type { ServicePageId } from "@/lib/service-pages"

/**
 * The cal.com event behind `/agendar`: one 30-minute diagnostic that serves
 * the three offers. `<username>/<event-slug>`; while it is empty the page
 * shows `embedPending` instead of the calendar.
 */
export const BOOKING_CAL_LINK = "walter-ailabs/diagnostico" as string

/** Direct link to the same event, for places that cannot embed it. */
export const BOOKING_URL = BOOKING_CAL_LINK
  ? `https://cal.com/${BOOKING_CAL_LINK}`
  : ""

/**
 * The event's "¿Sobre qué querés hablar?" question. Keys are the `?tema=`
 * values the service pages send to `/agendar`; values are the option labels
 * exactly as cal.com stores them, which is what the embed prefills. Change
 * them together with the event.
 */
export const BOOKING_TOPICS = {
  automatizacion: "Automatizar un proceso o construir software",
  consultoria: "Consultoría: saber por dónde empezar con IA",
  capacitacion: "Capacitar a mi equipo",
} as const

export type BookingTopic = keyof typeof BOOKING_TOPICS

/** Query parameter on `/agendar` and booking-field slug on cal.com. */
export const BOOKING_TOPIC_FIELD = "tema"

export const SERVICE_BOOKING_TOPIC: Record<ServicePageId, BookingTopic> = {
  automation: "automatizacion",
  consulting: "consultoria",
  training: "capacitacion",
}

export function isBookingTopic(value: unknown): value is BookingTopic {
  return typeof value === "string" && value in BOOKING_TOPICS
}

/**
 * Direct WhatsApp chat with the business (`https://wa.me/503…`). Empty until
 * a business number exists; every WhatsApp button hides while it is empty.
 */
export const WHATSAPP_URL = "" as string

/** Invite to the community group, published on the events page. */
export const COMMUNITY_WHATSAPP_URL =
  "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj"

export const BOOKING_PAGE_PATH = "/agendar"
