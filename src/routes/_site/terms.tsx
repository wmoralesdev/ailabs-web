import { createFileRoute } from "@tanstack/react-router"

import { LegalDocument } from "@/components/legal/legal-document"
import { buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/terms")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { meta, legal } = loaderData.content
    return buildPageMeta({
      locale: loaderData.locale,
      path: "/terms",
      title: `${legal.terms.title} | ${meta.title}`,
      description: legal.terms.metaDescription,
      noindex: legal.status === "draft",
    })
  },
  component: TermsPage,
})

function TermsPage() {
  const { locale, content } = Route.useRouteContext()
  return (
    <LegalDocument
      legal={content.legal}
      document={content.legal.terms}
      locale={locale}
    />
  )
}
