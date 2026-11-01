import { createFileRoute } from "@tanstack/react-router"

import { HomeAmbassadors } from "@/components/home/home-ambassadors"
import { HomeBooking } from "@/components/home/home-booking"
import { HomeFaq } from "@/components/home/home-faq"
import { HomeHero } from "@/components/home/home-hero"
import { HomeMethod } from "@/components/home/home-method"
import { HomeOffers } from "@/components/home/home-offers"
import { useLocaleContext } from "@/lib/locale-context"
import { buildFaqJsonLd, buildHomeJsonLd, buildPageMeta } from "@/lib/seo"
import { SERVICE_PAGE_PATHS } from "@/lib/service-pages"

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
    const [automation, consulting, training] = home.offers.items

    return {
      meta: page.meta,
      links: page.links,
      scripts: [
        buildHomeJsonLd({
          locale,
          title: meta.title,
          description: meta.description,
          organizationDescription: home.hero.lead,
          services: [
            {
              name: automation.title,
              description: automation.body,
              path: SERVICE_PAGE_PATHS.automation,
            },
            {
              name: consulting.title,
              description: consulting.body,
              path: SERVICE_PAGE_PATHS.consulting,
            },
            {
              name: training.title,
              description: training.body,
              path: SERVICE_PAGE_PATHS.training,
            },
          ],
        }),
        buildFaqJsonLd([...home.faq.items]),
      ],
    }
  },
  component: HomePage,
})

/** Six sections: hero, ambassadors, offers, method, FAQ, booking. */
export function HomePage() {
  const { locale, content } = useLocaleContext()
  const { home } = content

  return (
    <div>
      <HomeHero locale={locale} content={content} />
      <HomeAmbassadors ambassadors={home.ambassadors} />
      <HomeOffers offers={home.offers} locale={locale} />
      <HomeMethod method={home.method} locale={locale} />
      <HomeFaq faq={home.faq} />
      <HomeBooking booking={home.booking} locale={locale} />
    </div>
  )
}
