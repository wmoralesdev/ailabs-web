import { createFileRoute } from "@tanstack/react-router"

import { LinksPageView } from "@/components/marketing/site-page"
import { getContent } from "@/content"
import { lockedLocale } from "@/lib/locked-page"
import { buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/enlaces")({
  beforeLoad: () => lockedLocale("es"),
  loader: () => getContent("es").pages.links,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    return buildPageMeta({
      locale: "es",
      path: loaderData.path,
      title: loaderData.metaTitle,
      description: loaderData.metaDescription,
    })
  },
  component: Page,
})

function Page() {
  return <LinksPageView page={Route.useLoaderData()} />
}
