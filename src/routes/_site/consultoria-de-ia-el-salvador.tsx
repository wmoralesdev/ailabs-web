import { createFileRoute } from "@tanstack/react-router"

import { ConsultingPage } from "@/components/consulting/consulting-page"
import { useContact } from "@/components/contact/contact-provider"
import { useLocaleContext } from "@/lib/locale-context"
import {
  brandedTitle,
  buildFaqJsonLd,
  buildPageMeta,
  buildServicePageJsonLd,
} from "@/lib/seo"
import { CONSULTING_PAGE_PATH } from "@/lib/service-pages"

export const Route = createFileRoute("/_site/consultoria-de-ia-el-salvador")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    const page = content.consulting
    const title = brandedTitle(page.metaTitle)
    const meta = buildPageMeta({
      locale,
      path: CONSULTING_PAGE_PATH,
      title,
      description: page.metaDescription,
    })

    return {
      ...meta,
      scripts: [
        buildServicePageJsonLd({
          locale,
          path: CONSULTING_PAGE_PATH,
          title,
          description: page.metaDescription,
          serviceName: page.headline,
          homeLabel: content.servicePages.homeLabel,
        }),
        buildFaqJsonLd(page.faqs),
      ],
    }
  },
  component: ConsultingRoute,
})

export function ConsultingRoute() {
  const { locale, content } = useLocaleContext()
  const { openContact } = useContact()

  return (
    <ConsultingPage
      locale={locale}
      content={content.consulting}
      onTalk={() => openContact("discovery")}
    />
  )
}
