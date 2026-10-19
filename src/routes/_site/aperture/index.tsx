import { createFileRoute } from "@tanstack/react-router"

import { MainCard } from "@/components/chrome/main-card"
import { buildPageMeta, SITE_NAME } from "@/lib/seo"

export const Route = createFileRoute("/_site/aperture/")({
  loader: async ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    const directory = content.aperture.directory
    return buildPageMeta({
      locale,
      path: "/aperture",
      title: `${directory.metaTitle} | ${SITE_NAME}`,
      description: directory.metaDescription,
      noindex: true,
    })
  },
  component: AperturePage,
})

function AperturePage() {
  return <MainCard>{null}</MainCard>
}
