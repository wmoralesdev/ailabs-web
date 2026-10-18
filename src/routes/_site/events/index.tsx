import { createFileRoute } from "@tanstack/react-router"

import { EventsIndex } from "@/components/events/events-index"
import { buildEventsIndexHead } from "@/lib/events-index-head"

export const Route = createFileRoute("/_site/events/")({
  loader: ({ context }) => ({
    ...context,
    now: new Date().toISOString(),
  }),
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content, now } = loaderData
    return buildEventsIndexHead({
      locale,
      events: content.events,
      now: new Date(now),
    })
  },
  component: EventsIndexPage,
})

function EventsIndexPage() {
  const { locale, content } = Route.useRouteContext()
  const { now } = Route.useLoaderData()

  return <EventsIndex locale={locale} content={content} now={new Date(now)} />
}
