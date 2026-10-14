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
    const { meta, home } = content
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
              name: home.services.title,
              description: home.services.body,
            },
            {
              name: home.services.items[0].title,
              description: home.services.items[0].body,
            },
            {
              name: home.services.items[1].title,
              description: home.services.items[1].body,
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
