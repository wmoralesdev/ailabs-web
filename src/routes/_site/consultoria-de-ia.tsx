import { createFileRoute } from "@tanstack/react-router"

import { MarketingPageView } from "@/components/marketing/site-page"
import { getContent } from "@/content"
import { landingHead, lockedLocale } from "@/lib/locked-page"

export const Route = createFileRoute("/_site/consultoria-de-ia")({
  beforeLoad: () => lockedLocale("es"),
  loader: () => getContent("es").pages.consulting,
  head: ({ loaderData }) => (loaderData ? landingHead("es", loaderData) : {}),
  component: Page,
})

function Page() {
  return <MarketingPageView page={Route.useLoaderData()} />
}
