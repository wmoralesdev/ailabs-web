import { createFileRoute } from "@tanstack/react-router"

import { HomeContact } from "@/components/home/home-contact"
import { HomeFaq } from "@/components/home/home-faq"
import { HomeHero } from "@/components/home/home-hero"
import { HomeMethod } from "@/components/home/home-method"
import { HomeServices } from "@/components/home/home-services"
import { HomeTrust } from "@/components/home/home-trust"
import { buildFaqJsonLd, buildHomeJsonLd, buildPageMeta } from "@/lib/seo"
import { CONSULTING_PAGE_PATH, SERVICE_PAGE_PATHS } from "@/lib/service-pages"

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
          organizationDescription: home.hero.directAnswer,
          services: [
            {
              name: home.services.offerName,
              description: home.services.body,
              path: CONSULTING_PAGE_PATH,
            },
            {
              name: home.services.items[0].offerName,
              description: home.services.items[0].body,
              path: SERVICE_PAGE_PATHS.training,
            },
            {
              name: home.services.items[1].offerName,
              description: home.services.items[1].body,
              path: SERVICE_PAGE_PATHS.automation,
            },
          ],
        }),
        buildFaqJsonLd([
          {
            question: home.hero.agencyQuestion,
            answer: home.hero.agencyAnswer,
          },
          { question: home.services.title, answer: home.services.body },
          {
            question: home.services.items[0].title,
            answer: home.services.items[0].body,
          },
          {
            question: home.services.items[1].title,
            answer: home.services.items[1].body,
          },
          { question: home.method.title, answer: home.method.body },
          ...home.faq.items,
          { question: home.contact.title, answer: home.contact.lead },
        ]),
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
      <HomeTrust trust={home.trust} />
      <HomeServices services={home.services} locale={locale} />
      <HomeMethod method={home.method} locale={locale} />
      <HomeFaq faq={home.faq} />
      <HomeContact contact={home.contact} />
    </div>
  )
}
