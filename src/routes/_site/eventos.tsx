import { createFileRoute } from "@tanstack/react-router"

import { EventsPageView } from "@/components/marketing/site-page"
import { buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/eventos")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const page = loaderData.content.pages.events
    return buildPageMeta({
      locale: loaderData.locale,
      path: page.path,
      title: page.metaTitle,
      description: page.metaDescription,
    })
  },
  component: EventsPage,
})

function EventsPage() {
  const { content } = Route.useRouteContext()
  return <EventsPageView page={content.pages.events} />
}
