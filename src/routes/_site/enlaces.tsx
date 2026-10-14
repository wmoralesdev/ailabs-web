import { createFileRoute } from "@tanstack/react-router"

import { LinksPageView } from "@/components/marketing/site-page"
import { buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/enlaces")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const page = loaderData.content.pages.links
    return buildPageMeta({
      locale: loaderData.locale,
      path: page.path,
      title: page.metaTitle,
      description: page.metaDescription,
    })
  },
  component: LinksPage,
})

function LinksPage() {
  const { content } = Route.useRouteContext()
  return <LinksPageView page={content.pages.links} />
}
