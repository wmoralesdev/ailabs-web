import { createFileRoute } from "@tanstack/react-router"

import { EventsPageView } from "@/components/marketing/site-page"
import { getContent } from "@/content"
import { landingHead, lockedLocale } from "@/lib/locked-page"

export const Route = createFileRoute("/_site/eventos-tech-centroamerica")({
  beforeLoad: () => lockedLocale("es"),
  loader: () => getContent("es").pages.eventsRegion,
  head: ({ loaderData }) => (loaderData ? landingHead("es", loaderData) : {}),
  component: Page,
})

function Page() {
  return <EventsPageView page={Route.useLoaderData()} />
}
