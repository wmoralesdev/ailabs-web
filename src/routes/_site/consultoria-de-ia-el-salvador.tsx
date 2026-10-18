import { createFileRoute } from "@tanstack/react-router"

import { ConsultingPage } from "@/components/consulting/consulting-page"
import { useContact } from "@/components/contact/contact-provider"
import { buildFaqJsonLd, buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/consultoria-de-ia-el-salvador")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    const page = content.consulting
    const meta = buildPageMeta({
      locale,
      path: "/consultoria-de-ia-el-salvador",
      title: page.metaTitle,
      description: page.metaDescription,
    })

    return {
      ...meta,
      scripts: [buildFaqJsonLd(page.faqs)],
    }
  },
  component: ConsultingRoute,
})

function ConsultingRoute() {
  const { content } = Route.useRouteContext()
  const { openContact } = useContact()

  return (
    <ConsultingPage
      content={content.consulting}
      onTalk={() => openContact("discovery")}
    />
  )
}
