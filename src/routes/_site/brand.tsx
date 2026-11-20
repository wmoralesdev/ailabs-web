import { createFileRoute } from "@tanstack/react-router"

import { BrandGuidelines } from "@/components/brand/brand-page"
import { HomeHero } from "@/components/home/home-hero"
import type { HomeHeroContent } from "@/content"
import { BRAND_KIT_PATH, BRAND_PAGE_PATH } from "@/content/brand-assets"
import { useLocaleContext } from "@/lib/locale-context"
import { brandedTitle, buildPageMeta, buildWebPageJsonLd } from "@/lib/seo"

/** Event photos shown under Photography, by file name. */
const BRAND_PHOTOS = [
  "/events/community/02-canopy-laptops.webp",
  "/events/community/08-green-couch.webp",
  "/events/community/04-auditorium-podium.webp",
]

export const Route = createFileRoute("/_site/brand")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { locale, content } = loaderData
    const { brand } = content
    const title = brandedTitle(brand.metaTitle)
    const meta = buildPageMeta({
      locale,
      path: BRAND_PAGE_PATH,
      title,
      description: brand.metaDescription,
    })
    return {
      ...meta,
      scripts: [
        buildWebPageJsonLd({
          locale,
          path: BRAND_PAGE_PATH,
          title,
          description: brand.metaDescription,
        }),
      ],
    }
  },
  component: BrandPage,
})

/**
 * Brand guidelines: the home hero with its own copy and the kit download,
 * then the logo files, misuse, color, type, halftone, photography, voice and
 * usage.
 */
export function BrandPage() {
  const { locale, content } = useLocaleContext()
  const { brand } = content
  const hero: HomeHeroContent = {
    label: brand.label,
    headline: brand.headline,
    lead: brand.lead,
    primaryCta: { label: brand.kitCta, href: BRAND_KIT_PATH },
    secondaryCta: { label: brand.logoCta, href: "#logo" },
  }
  const photos = BRAND_PHOTOS.flatMap((src) =>
    content.events.photos.filter((photo) => photo.src === src)
  )

  return (
    <>
      <HomeHero
        locale={locale}
        content={content}
        hero={hero}
        primaryAction={{
          label: brand.kitCta,
          href: BRAND_KIT_PATH,
          download: true,
        }}
        note={brand.kitNote}
      />
      <BrandGuidelines brand={brand} photos={photos} />
    </>
  )
}
