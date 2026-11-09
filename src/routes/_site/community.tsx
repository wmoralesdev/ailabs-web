import { createFileRoute } from "@tanstack/react-router"

import { HomeHero } from "@/components/home/home-hero"
import type { HomeHeroContent } from "@/content"
import { COMMUNITY_PAGE_PATH, COMMUNITY_WHATSAPP_URL } from "@/content/booking"
import { useLocaleContext } from "@/lib/locale-context"
import { brandedTitle, buildPageMeta, buildSimplePageJsonLd } from "@/lib/seo"

export const Route = createFileRoute("/_site/community")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    const { community } = content
    const title = brandedTitle(community.metaTitle)
    const meta = buildPageMeta({
      locale,
      path: COMMUNITY_PAGE_PATH,
      title,
      description: community.metaDescription,
    })
    return {
      ...meta,
      scripts: [
        buildSimplePageJsonLd({
          locale,
          path: COMMUNITY_PAGE_PATH,
          title,
          description: community.metaDescription,
          homeLabel: content.servicePages.homeLabel,
          label: community.label,
        }),
      ],
    }
  },
  component: CommunityPage,
})

/**
 * WhatsApp community page: the home hero with its own copy, the group invite
 * as the primary action and the events index beside it.
 */
export function CommunityPage() {
  const { locale, content } = useLocaleContext()
  const copy = content.community
  const hero: HomeHeroContent = {
    label: copy.label,
    headline: copy.headline,
    lead: copy.lead,
    primaryCta: { label: copy.joinCta, href: COMMUNITY_WHATSAPP_URL },
    secondaryCta: { label: copy.eventsCta, href: "/events" },
  }

  return (
    <HomeHero
      locale={locale}
      content={content}
      hero={hero}
      primaryAction={{
        label: copy.joinCta,
        href: COMMUNITY_WHATSAPP_URL,
        external: true,
        newTabLabel: content.events.newTabLabel,
      }}
      note={copy.joinHint}
    />
  )
}
