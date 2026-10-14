import { createFileRoute } from "@tanstack/react-router"

import { MarketingPageView } from "@/components/marketing/site-page"
import { buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/automatizacion-con-ia")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const page = loaderData.content.pages.automation
    return buildPageMeta({
      locale: loaderData.locale,
      path: page.path,
      title: page.metaTitle,
      description: page.metaDescription,
    })
  },
  component: AutomationPage,
})

function AutomationPage() {
  const { content } = Route.useRouteContext()
  return <MarketingPageView page={content.pages.automation} />
}
