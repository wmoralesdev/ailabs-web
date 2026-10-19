import type { ComponentType } from "react"

import type { Locale } from "@/content"
import { getWorkshopMeta } from "@/events/catalog"
import type { WorkshopMeta } from "@/events/catalog"
import { getGetCompetitiveQuickContent } from "@/events/get-competitive-quick/content"
import { GetCompetitiveQuickPage } from "@/events/get-competitive-quick/page"
import { GetCompetitiveQuickSuccessPage } from "@/events/get-competitive-quick/success-page"
import { getModoFundadorContent } from "@/events/modo-fundador/content"
import { ModoFundadorPage } from "@/events/modo-fundador/page"
import { ModoFundadorSuccessPage } from "@/events/modo-fundador/success-page"

export type WorkshopDefinition = WorkshopMeta & {
  metaDescription: (locale: Locale) => string
  /** Visible question headings and the copy already under them. */
  faq: (locale: Locale) => ReadonlyArray<{ question: string; answer: string }>
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

function requireMeta(slug: string): WorkshopMeta {
  const meta = getWorkshopMeta(slug)
  if (!meta) {
    throw new Error(`Missing workshop catalog entry: ${slug}`)
  }
  return meta
}

const workshops: Record<string, WorkshopDefinition> = {
  "modo-fundador": {
    ...requireMeta("modo-fundador"),
    metaDescription: (locale) => getModoFundadorContent(locale).metaDescription,
    faq: (locale) => {
      const content = getModoFundadorContent(locale)
      return [
        { question: content.promiseTitle, answer: content.promise },
        {
          question: content.proof.title,
          answer: content.proof.points
            .map((point) => `${point.label}. ${point.note}`)
            .join(" "),
        },
        {
          question: content.forWhomTitle,
          answer: content.forWhom.join(". "),
        },
        {
          question: content.notForWhomTitle,
          answer: content.notForWhom.join(". "),
        },
        {
          question: content.deliverablesTitle,
          answer: content.deliverables
            .map((item) => `${item.title}. ${item.note}`)
            .join(" "),
        },
        {
          question: content.requirementsTitle,
          answer: content.requirements
            .map((item) => `${item.label}. ${item.note}`)
            .join(" "),
        },
      ]
    },
    Page: ModoFundadorPage,
    SuccessPage: ModoFundadorSuccessPage,
  },
  "get-competitive-quick": {
    ...requireMeta("get-competitive-quick"),
    metaDescription: (locale) =>
      getGetCompetitiveQuickContent(locale).metaDescription,
    faq: (locale) => {
      const content = getGetCompetitiveQuickContent(locale)
      return [
        { question: content.promiseTitle, answer: content.promise },
        {
          question: content.forWhomTitle,
          answer: content.forWhom.join(". "),
        },
        {
          question: content.notForWhomTitle,
          answer: content.notForWhom.join(". "),
        },
        {
          question: content.deliverablesTitle,
          answer: content.deliverables.join(". "),
        },
        {
          question: content.requirementsTitle,
          answer: content.requirements.map((item) => item.label).join(". "),
        },
      ]
    },
    Page: GetCompetitiveQuickPage,
    SuccessPage: GetCompetitiveQuickSuccessPage,
  },
}

export function getWorkshopBySlug(slug: string): WorkshopDefinition | null {
  return workshops[slug] ?? null
}

export {
  daysUntilWorkshop,
  isWorkshopPast,
  listUpcomingWorkshops,
  listWorkshopSlugs,
} from "@/events/catalog"
