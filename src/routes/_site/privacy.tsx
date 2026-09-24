import { createFileRoute } from "@tanstack/react-router"

import { LegalDocument } from "@/components/legal/legal-document"
import { buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/privacy")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { meta, legal } = loaderData.content
    return buildPageMeta({
      locale: loaderData.locale,
      path: "/privacy",
      title: `${legal.privacy.title} | ${meta.title}`,
      description: legal.privacy.metaDescription,
      noindex: legal.status === "draft",
    })
  },
  component: PrivacyPage,
})

function PrivacyPage() {
  const { locale, content } = Route.useRouteContext()
  return (
    <LegalDocument
      legal={content.legal}
      document={content.legal.privacy}
      locale={locale}
    />
  )
}
