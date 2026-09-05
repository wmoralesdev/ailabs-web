import { createFileRoute, notFound } from "@tanstack/react-router"

import { daysUntilWorkshop, getWorkshopBySlug } from "@/events/registry"
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
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const title = `${loaderData.title} | Ai Labs`
    return {
      meta: [
        { title },
        {
          name: "description",
          content: loaderData.metaDescription,
        },
      ],
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
