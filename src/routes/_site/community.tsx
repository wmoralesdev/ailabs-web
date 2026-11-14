import { createFileRoute } from "@tanstack/react-router"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { CommunityQr } from "@/components/community/community-qr"
import { HomeHero } from "@/components/home/home-hero"
import type { HomeHeroContent } from "@/content"
import {
  COMMUNITY_CHANNEL_URL,
  COMMUNITY_PAGE_PATH,
  COMMUNITY_WHATSAPP_URL,
} from "@/content/booking"
import { useLocaleContext } from "@/lib/locale-context"
import { localizedPath } from "@/lib/locale-path"
import { SITE_URL, brandedTitle, buildPageMeta } from "@/lib/seo"

export const Route = createFileRoute("/_site/community")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    const { community } = content
    return buildPageMeta({
      locale,
      path: COMMUNITY_PAGE_PATH,
      title: brandedTitle(community.metaTitle),
      description: community.metaDescription,
    })
  },
  component: CommunityPage,
})

/**
 * WhatsApp community page: the home hero with its own copy, the group invite
 * as the primary action, the announcements channel beside it, the events
 * index and a QR of this page to show on screen at events.
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
    <>
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
        extraActions={
          <a
            href={COMMUNITY_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ink"
          >
            {copy.channelCta}
            <span className="sr-only"> {content.events.newTabLabel}</span>
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </a>
        }
        note={copy.joinHint}
      />
      <CommunityQr
        url={`${SITE_URL}${localizedPath(locale, COMMUNITY_PAGE_PATH)}`}
        label={copy.qrCta}
        title={copy.qrTitle}
      />
    </>
  )
}
