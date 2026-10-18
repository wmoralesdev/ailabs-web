import { createFileRoute } from "@tanstack/react-router"

import { MainCard } from "@/components/chrome/main-card"
import { EventsIndex } from "@/components/events/events-index"
import { buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/events/")({
  loader: ({ context }) => ({
    ...context,
    now: new Date().toISOString(),
  }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    const { events } = content
    return buildPageMeta({
      locale,
      path: "/events",
      title: events.headline,
      description: events.intro,
    })
  },
  component: EventsIndexPage,
})

function EventsIndexPage() {
  const { locale, content } = Route.useRouteContext()
  const { now } = Route.useLoaderData()

  return (
    <MainCard>
      <EventsIndex locale={locale} copy={content.events} now={new Date(now)} />
    </MainCard>
  )
}
