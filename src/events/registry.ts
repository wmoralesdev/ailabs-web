import type { ComponentType } from "react"

import type { Locale } from "@/content"
import { getGetCompetitiveQuickContent } from "@/events/get-competitive-quick/content"
import { GetCompetitiveQuickPage } from "@/events/get-competitive-quick/page"
import { GetCompetitiveQuickSuccessPage } from "@/events/get-competitive-quick/success-page"
import { getModoFundadorContent } from "@/events/modo-fundador/content"
import { ModoFundadorPage } from "@/events/modo-fundador/page"
import { ModoFundadorSuccessPage } from "@/events/modo-fundador/success-page"

export type WorkshopDefinition = {
  slug: string
  title: string
  priceCents: number
  currency: "USD"
  capacity: number
  /**
   * Inclusive calendar end date (YYYY-MM-DD) in America/El_Salvador.
   * Null when the date is still TBD — keep listing until locked.
   */
  endsOn: string | null
  metaDescription: (locale: Locale) => string
  Page: ComponentType<{
    locale: Locale
    soldOut: boolean
    /** Remaining paid capacity, clamped at 0. Pages may ignore it. */
    seatsLeft: number
    capacity: number
    /** Whole days until the event, or null when TBD or already here. */
    daysUntil: number | null
  }>
  SuccessPage: ComponentType<{
    locale: Locale
    paymentStatus?: string
    redirectValid?: boolean | null
  }>
}

const workshops: Record<string, WorkshopDefinition> = {
  "modo-fundador": {
    slug: "modo-fundador",
    title: "Modo Fundador",
    priceCents: 5000,
    currency: "USD",
    capacity: 20,
    endsOn: "2026-08-15",
    metaDescription: (locale) => getModoFundadorContent(locale).metaDescription,
    Page: ModoFundadorPage,
    SuccessPage: ModoFundadorSuccessPage,
  },
  "get-competitive-quick": {
    slug: "get-competitive-quick",
    title: "Get Competitive Quick",
    priceCents: 2500,
    currency: "USD",
    capacity: 20,
    endsOn: null,
    metaDescription: (locale) =>
      getGetCompetitiveQuickContent(locale).metaDescription,
    Page: GetCompetitiveQuickPage,
    SuccessPage: GetCompetitiveQuickSuccessPage,
  },
}

/** True when `endsOn` is set and `now` is after that day in El Salvador. */
export function isWorkshopPast(
  workshop: Pick<WorkshopDefinition, "endsOn">,
  now: Date = new Date()
): boolean {
  if (!workshop.endsOn) {
    return false
  }
  const end = new Date(`${workshop.endsOn}T23:59:59.999-06:00`)
  return now.getTime() > end.getTime()
}

/**
 * Whole days from `now` to the start of the event day in El Salvador. Null
 * when the date is TBD or the event is today or past, so callers can drop the
 * countdown instead of rendering "in 0 days".
 */
export function daysUntilWorkshop(
  workshop: Pick<WorkshopDefinition, "endsOn">,
  now: Date = new Date()
): number | null {
  if (!workshop.endsOn) {
    return null
  }
  const start = new Date(`${workshop.endsOn}T00:00:00.000-06:00`)
  const days = Math.ceil((start.getTime() - now.getTime()) / 86_400_000)
  return days > 0 ? days : null
}

export function getWorkshopBySlug(slug: string): WorkshopDefinition | null {
  return workshops[slug] ?? null
}

export function listWorkshopSlugs(): string[] {
  return Object.keys(workshops)
}

/** Upcoming / TBD workshops for chrome (footer, etc.). */
export function listUpcomingWorkshops(
  now: Date = new Date()
): WorkshopDefinition[] {
  return Object.values(workshops).filter(
    (workshop) => !isWorkshopPast(workshop, now)
  )
}
