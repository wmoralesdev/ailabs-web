import { createServerFn } from "@tanstack/react-start"
import { randomUUID } from "node:crypto"

import { getWorkshopBySlug } from "@/events/registry"
import { SITE_URL } from "@/lib/seo"
import { prisma } from "@/lib/prisma"
import {
  createWompiPaymentLink,
  verifyPaymentLinkRedirectHash,
} from "@/server/wompi"

export type StartCheckoutResult =
  | { status: "ok"; checkoutUrl: string }
  | { status: "sold_out" }
  | { status: "invalid"; message: string }
  | { status: "error" }

export type WorkshopAvailability = {
  soldOut: boolean
  paidCount: number
  capacity: number
}

function siteOrigin(): string {
  return process.env.SITE_URL?.replace(/\/$/, "") || SITE_URL
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

async function ensureWorkshopRow(slug: string) {
  const definition = getWorkshopBySlug(slug)
  if (!definition) {
    return null
  }

  return prisma.workshop.upsert({
    where: { slug: definition.slug },
    create: {
      slug: definition.slug,
      title: definition.title,
      priceCents: definition.priceCents,
      currency: definition.currency,
      capacity: definition.capacity,
      active: true,
    },
    update: {
      title: definition.title,
      priceCents: definition.priceCents,
      currency: definition.currency,
      capacity: definition.capacity,
      active: true,
    },
  })
}

async function countPaid(workshopId: string): Promise<number> {
  return prisma.workshopRegistration.count({
    where: { workshopId, status: "PAID" },
  })
}

export const getWorkshopAvailability = createServerFn({ method: "GET" })
  .validator((data: { slug?: string }) => {
    if (!data.slug?.trim()) {
      throw new Error("slug required")
    }
    return { slug: data.slug.trim() }
  })
  .handler(async ({ data }): Promise<WorkshopAvailability> => {
    const workshop = await ensureWorkshopRow(data.slug)
    if (!workshop || !workshop.active) {
      return { soldOut: true, paidCount: 0, capacity: 0 }
    }
    const paidCount = await countPaid(workshop.id)
    return {
      soldOut: paidCount >= workshop.capacity,
      paidCount,
      capacity: workshop.capacity,
    }
  })

export const startWorkshopCheckout = createServerFn({ method: "POST" })
  .validator(
    (data: {
      slug?: string
      name?: string
      email?: string
      whatsapp?: string
    }) => data
  )
  .handler(async ({ data }): Promise<StartCheckoutResult> => {
    const name = data.name?.trim() ?? ""
    const email = normalizeEmail(data.email ?? "")
    const whatsapp = data.whatsapp?.trim() ?? ""
    const slug = data.slug?.trim() ?? ""

    if (!slug || !getWorkshopBySlug(slug)) {
      return { status: "invalid", message: "Unknown workshop" }
    }
    if (name.length < 2) {
      return { status: "invalid", message: "Name is required" }
    }
    if (!isValidEmail(email)) {
      return { status: "invalid", message: "Valid email is required" }
    }
    if (whatsapp.length < 8) {
      return { status: "invalid", message: "WhatsApp is required" }
    }

    try {
      const workshop = await ensureWorkshopRow(slug)
      if (!workshop || !workshop.active) {
        return { status: "sold_out" }
      }

      const paidCount = await countPaid(workshop.id)
      if (paidCount >= workshop.capacity) {
        return { status: "sold_out" }
      }

      const existing = await prisma.workshopRegistration.findUnique({
        where: {
          workshopId_email: { workshopId: workshop.id, email },
        },
      })

      if (existing?.status === "PAID") {
        return {
          status: "invalid",
          message: "This email is already registered",
        }
      }

      if (existing?.status === "PENDING" && existing.checkoutUrl) {
        return { status: "ok", checkoutUrl: existing.checkoutUrl }
      }

      const commerceLinkId = existing?.commerceLinkId ?? randomUUID()
      const origin = siteOrigin()
      const redirectUrl = `${origin}/events/${slug}/success`
      const returnUrl = `${origin}/events/${slug}`
      const webhookUrl = `${origin}/api/webhooks/wompi`

      const registration =
        existing ??
        (await prisma.workshopRegistration.create({
          data: {
            workshopId: workshop.id,
            name,
            email,
            whatsapp,
            commerceLinkId,
            status: "PENDING",
          },
        }))

      if (existing) {
        await prisma.workshopRegistration.update({
          where: { id: existing.id },
          data: { name, whatsapp, status: "PENDING" },
        })
      }

      const amount = workshop.priceCents / 100
      const link = await createWompiPaymentLink({
        commerceLinkId: registration.commerceLinkId,
        amount,
        productName: workshop.title,
        productDescription: `${workshop.title} — Ai Labs workshop ticket`,
        redirectUrl,
        returnUrl,
        webhookUrl,
      })

      await prisma.workshopRegistration.update({
        where: { id: registration.id },
        data: {
          wompiEnlaceId: link.idEnlace,
          checkoutUrl: link.urlEnlace,
        },
      })

      return { status: "ok", checkoutUrl: link.urlEnlace }
    } catch (error) {
      console.error("startWorkshopCheckout failed", error)
      return { status: "error" }
    }
  })

export const getRegistrationPaymentStatus = createServerFn({ method: "GET" })
  .validator(
    (data: {
      commerceLinkId?: string
      email?: string
      slug: string
      redirect?: {
        transactionId: string
        enlaceId: string
        amount: string
        hash: string
      }
    }) => data
  )
  .handler(async ({ data }) => {
    const workshop = await ensureWorkshopRow(data.slug)
    if (!workshop) {
      return {
        status: "unknown" as const,
        redirectValid: null as boolean | null,
      }
    }

    let redirectValid: boolean | null = null
    if (data.commerceLinkId && data.redirect) {
      redirectValid = verifyPaymentLinkRedirectHash({
        commerceLinkId: data.commerceLinkId,
        transactionId: data.redirect.transactionId,
        enlaceId: data.redirect.enlaceId,
        amount: data.redirect.amount,
        hash: data.redirect.hash,
      })
    }

    if (data.commerceLinkId) {
      const byLink = await prisma.workshopRegistration.findUnique({
        where: { commerceLinkId: data.commerceLinkId },
      })
      if (byLink) {
        return { status: byLink.status, redirectValid }
      }
    }

    if (data.email) {
      const byEmail = await prisma.workshopRegistration.findUnique({
        where: {
          workshopId_email: {
            workshopId: workshop.id,
            email: normalizeEmail(data.email),
          },
        },
      })
      if (byEmail) {
        return { status: byEmail.status, redirectValid }
      }
    }

    return { status: "unknown" as const, redirectValid }
  })
