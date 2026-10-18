import { createFileRoute, notFound } from "@tanstack/react-router"

import { daysUntilWorkshop, getWorkshopBySlug } from "@/events/registry"
import {
  buildFaqJsonLd,
  buildPageMeta,
  buildWorkshopEventJsonLd,
  SITE_NAME,
} from "@/lib/seo"
import { getWorkshopAvailability } from "@/server/workshop-registration"

export const Route = createFileRoute("/_site/events/$slug/")({
  loader: async ({ params, context }) => {
    const workshop = getWorkshopBySlug(params.slug)
    if (!workshop) {
      throw notFound()
    }

    const availability = await getWorkshopAvailability({
      data: { slug: workshop.slug },
    })

    // Loader data must be serializable — never return Page/SuccessPage/fn fields.
    return {
      slug: workshop.slug,
      title: workshop.title,
      metaDescription: workshop.metaDescription(context.locale),
      soldOut: availability.soldOut,
      seatsLeft: Math.max(0, availability.capacity - availability.paidCount),
      capacity: availability.capacity,
      daysUntil: daysUntilWorkshop(workshop),
      locale: context.locale,
      endsOn: workshop.endsOn,
      priceCents: workshop.priceCents,
      currency: workshop.currency,
      faq: workshop.faq(context.locale),
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const page = buildPageMeta({
      locale: loaderData.locale,
      path: `/events/${loaderData.slug}`,
      title: `${loaderData.title} | ${SITE_NAME}`,
      description: loaderData.metaDescription,
    })
    const event = buildWorkshopEventJsonLd({
      locale: loaderData.locale,
      path: `/events/${loaderData.slug}`,
      name: loaderData.title,
      description: loaderData.metaDescription,
      endsOn: loaderData.endsOn,
      priceCents: loaderData.priceCents,
      currency: loaderData.currency,
      soldOut: loaderData.soldOut,
    })
    return {
      ...page,
      scripts: [buildFaqJsonLd(loaderData.faq), ...(event ? [event] : [])],
    }
  },
  component: EventSlugIndexPage,
})

function EventSlugIndexPage() {
  const { slug, soldOut, seatsLeft, capacity, daysUntil, locale } =
    Route.useLoaderData()
  const workshop = getWorkshopBySlug(slug)
  if (!workshop) {
    throw notFound()
  }

  const Page = workshop.Page
  return (
    <Page
      locale={locale}
      soldOut={soldOut}
      seatsLeft={seatsLeft}
      capacity={capacity}
      daysUntil={daysUntil}
    />
  )
}
