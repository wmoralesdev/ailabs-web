import { createFileRoute, useLoaderData } from "@tanstack/react-router"

import { EventsIndex } from "@/components/events/events-index"
import { buildEventsIndexHead } from "@/lib/events-index-head"
import { useLocaleContext } from "@/lib/locale-context"

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

export function EventsIndexPage() {
  const { locale, content } = useLocaleContext()
  const { now } = useLoaderData({ strict: false }) as { now: string }

  return <EventsIndex locale={locale} content={content} now={new Date(now)} />
}
