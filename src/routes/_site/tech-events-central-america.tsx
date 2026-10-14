import { createFileRoute } from "@tanstack/react-router"

import { EventsPageView } from "@/components/marketing/site-page"
import { getContent } from "@/content"
import { landingHead, lockedLocale } from "@/lib/locked-page"

export const Route = createFileRoute("/_site/tech-events-central-america")({
  beforeLoad: () => lockedLocale("en"),
  loader: () => getContent("en").pages.eventsRegion,
  head: ({ loaderData }) => (loaderData ? landingHead("en", loaderData) : {}),
  component: Page,
})

function Page() {
  return <EventsPageView page={Route.useLoaderData()} />
}
