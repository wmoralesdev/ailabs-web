import { createFileRoute } from "@tanstack/react-router"

import { MarketingPageView } from "@/components/marketing/site-page"
import { buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/consultoria-de-ia")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const page = loaderData.content.pages.consulting
    return buildPageMeta({
      locale: loaderData.locale,
      path: page.path,
      title: page.metaTitle,
      description: page.metaDescription,
    })
  },
  component: ConsultingPage,
})

function ConsultingPage() {
  const { content } = Route.useRouteContext()
  return <MarketingPageView page={content.pages.consulting} />
}
