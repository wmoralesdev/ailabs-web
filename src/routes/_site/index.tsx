import { createFileRoute } from "@tanstack/react-router"

import { HomeAbout } from "@/components/home/home-about"
import { HomeAperture } from "@/components/home/home-aperture"
import { HomeContact } from "@/components/home/home-contact"
import { HomeHero } from "@/components/home/home-hero"
import { HomePillar } from "@/components/home/home-pillar"
import { HomeReveal } from "@/components/home/home-reveal"
import { HomeTrust } from "@/components/home/home-trust"
import { buildHomeJsonLd, buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) return {}
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
          pillars: [
            {
              name: home.academy.title,
              description: home.academy.lead,
            },
            {
              name: home.agentic.title,
              description: home.agentic.lead,
            },
            {
              name: home.aperture.title,
              description: home.aperture.lead,
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
      <HomeHero locale={locale} content={content} />
      <div className="flex flex-col">
        <HomeTrust trust={home.trust} />
        <HomeReveal>
          <HomeAbout about={home.about} />
        </HomeReveal>
        <HomeReveal>
          <HomePillar
            locale={locale}
            pillar={home.academy}
            mediaSide="right"
            band="purple"
            intervalMs={5200}
          />
        </HomeReveal>
        <HomeReveal>
          <HomePillar
            locale={locale}
            pillar={home.agentic}
            mediaSide="left"
            band="paper"
            intervalMs={5800}
          />
        </HomeReveal>
        <HomeReveal>
          <HomeAperture locale={locale} aperture={home.aperture} />
        </HomeReveal>
        <HomeReveal>
          <HomeContact contact={home.contact} />
        </HomeReveal>
      </div>
    </div>
  )
}
