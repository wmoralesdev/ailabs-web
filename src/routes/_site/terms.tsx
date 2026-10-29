import { createFileRoute } from "@tanstack/react-router"

import { LegalDocument } from "@/components/legal/legal-document"
import { useLocaleContext } from "@/lib/locale-context"
import { brandedTitle, buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/terms")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { legal } = loaderData.content
    return buildPageMeta({
      locale: loaderData.locale,
      path: "/terms",
      title: brandedTitle(legal.terms.title),
      description: legal.terms.metaDescription,
      noindex: legal.status === "draft",
    })
  },
  component: TermsPage,
})

export function TermsPage() {
  const { locale, content } = useLocaleContext()
  return (
    <LegalDocument
      legal={content.legal}
      document={content.legal.terms}
      locale={locale}
    />
  )
}
