import { createFileRoute } from "@tanstack/react-router"

import { ServicePage } from "@/components/marketing/service-page"
import {
  buildFaqJsonLd,
  buildPageMeta,
  buildServicePageJsonLd,
} from "@/lib/seo"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"

const ID = "consulting"
const PATH = SERVICE_PAGE_PATHS[ID]

export const Route = createFileRoute("/_site/consultoria-ia-el-salvador")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    const pages = content.servicePages
    const page = pages[ID]
    const meta = buildPageMeta({
      locale,
      path: PATH,
      title: page.metaTitle,
      description: page.metaDescription,
    })
    return {
      ...meta,
      scripts: [
        buildServicePageJsonLd({
          locale,
          path: PATH,
          title: page.metaTitle,
          description: page.metaDescription,
          serviceName: page.serviceName,
          homeLabel: pages.homeLabel,
        }),
        buildFaqJsonLd(page.faq),
      ],
    }
  },
  component: ConsultingPage,
})

function ConsultingPage() {
  const { content } = Route.useRouteContext()
  return <ServicePage id={ID} pages={content.servicePages} />
}
