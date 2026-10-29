import { createFileRoute } from "@tanstack/react-router"

import { LegalDocument } from "@/components/legal/legal-document"
import { useLocaleContext } from "@/lib/locale-context"
import { brandedTitle, buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/privacy")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { legal } = loaderData.content
    return buildPageMeta({
      locale: loaderData.locale,
      path: "/privacy",
      title: brandedTitle(legal.privacy.title),
      description: legal.privacy.metaDescription,
      noindex: legal.status === "draft",
    })
  },
  component: PrivacyPage,
})

export function PrivacyPage() {
  const { locale, content } = useLocaleContext()
  return (
    <LegalDocument
      legal={content.legal}
      document={content.legal.privacy}
      locale={locale}
    />
  )
}
