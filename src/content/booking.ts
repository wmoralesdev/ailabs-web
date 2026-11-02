import type { ServicePageId } from "@/lib/service-pages"

/**
 * The cal.com event behind `/agendar`: one 30-minute diagnostic that serves
 * the three offers. `<username>/<event-slug>`; while it is empty the page
 * shows `embedPending` instead of the booker.
 */
export const BOOKING_CAL_LINK = "walter-ailabs/diagnostico" as string

/** Direct link to the same event on cal.com. */
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

/** The event's fourth option, which no service page sends. */
export const BOOKING_TOPIC_UNSURE = "Todavía no sé"

/** Every option of the topic question, in the event's order. */
export const BOOKING_TOPIC_OPTIONS = [
  { key: "automatizacion", value: BOOKING_TOPICS.automatizacion },
  { key: "consultoria", value: BOOKING_TOPICS.consultoria },
  { key: "capacitacion", value: BOOKING_TOPICS.capacitacion },
  { key: "indeciso", value: BOOKING_TOPIC_UNSURE },
] as const

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

/** Invite to the community group, on `/community` and the events page. */
export const COMMUNITY_WHATSAPP_URL =
  "https://chat.whatsapp.com/Ga8mG1fqDM9C0ryxAw1eIj"

export const COMMUNITY_PAGE_PATH = "/community"

export const BOOKING_PAGE_PATH = "/agendar"
