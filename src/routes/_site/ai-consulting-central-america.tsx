import { createFileRoute } from "@tanstack/react-router"

import { MarketingPageView } from "@/components/marketing/site-page"
import { getContent } from "@/content"
import { landingHead, lockedLocale } from "@/lib/locked-page"

export const Route = createFileRoute("/_site/ai-consulting-central-america")({
  beforeLoad: () => lockedLocale("en"),
  loader: () => getContent("en").pages.consultingRegion,
  head: ({ loaderData }) => (loaderData ? landingHead("en", loaderData) : {}),
  component: Page,
})

function Page() {
  return <MarketingPageView page={Route.useLoaderData()} />
}
