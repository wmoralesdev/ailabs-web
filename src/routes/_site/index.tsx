import { createFileRoute } from "@tanstack/react-router"

import { HomeContact } from "@/components/home/home-contact"
import { HomeHero } from "@/components/home/home-hero"
import { HomeMethod } from "@/components/home/home-method"
import { HomeServices } from "@/components/home/home-services"
import { HomeTrust } from "@/components/home/home-trust"
import { buildHomeJsonLd, buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    const { meta } = content
    const page = buildPageMeta({
      locale,
      title: meta.title,
      description: meta.description,
    })

    return {
      meta: page.meta,
      links: page.links,
      scripts: [
        buildHomeJsonLd({
          locale,
          title: meta.title,
          description: meta.description,
          services: [
            {
              name: content.pages.consulting.schemaName,
              description: content.pages.consulting.lead,
              path: content.pages.consulting.path,
            },
            {
              name: content.pages.training.schemaName,
              description: content.pages.training.lead,
              path: content.pages.training.path,
            },
            {
              name: content.pages.automation.schemaName,
              description: content.pages.automation.lead,
              path: content.pages.automation.path,
            },
          ],
        }),
      ],
    }
  },
  component: HomePage,
})

function HomePage() {
  const { locale, content } = Route.useRouteContext()
  const { home } = content

  return (
    <div>
      <HomeHero locale={locale} content={content} desktopSpiralOnly />
      <HomeTrust trust={home.trust} />
      <HomeServices services={home.services} locale={locale} />
      <HomeMethod method={home.method} locale={locale} />
      <HomeContact contact={home.contact} />
    </div>
  )
}
