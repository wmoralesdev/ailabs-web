import type { ComponentType } from "react"

import type { Locale } from "@/content"
import { GetCompetitiveQuickPage } from "@/events/get-competitive-quick/page"
import { GetCompetitiveQuickSuccessPage } from "@/events/get-competitive-quick/success-page"
import { ModoFundadorPage } from "@/events/modo-fundador/page"
import { ModoFundadorSuccessPage } from "@/events/modo-fundador/success-page"

/**
 * Page components live apart from `registry.ts` so chrome that lists
 * workshops (the footer) does not pull every microsite into the main bundle.
 */
export type WorkshopPages = {
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

const pagesBySlug: Record<string, WorkshopPages> = {
  "modo-fundador": {
    Page: ModoFundadorPage,
    SuccessPage: ModoFundadorSuccessPage,
  },
  "get-competitive-quick": {
    Page: GetCompetitiveQuickPage,
    SuccessPage: GetCompetitiveQuickSuccessPage,
  },
}

export function getWorkshopPages(slug: string): WorkshopPages | null {
  return pagesBySlug[slug] ?? null
}
