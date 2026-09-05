import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { TextSpiral } from "@/components/lab/text-spiral"
import { SiteLogo } from "@/components/chrome/site-logo"
import { buttonVariants } from "@/components/ui/button"
import {
  homeDisplayClassName,
  homePillClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { HomeHeroContent, Locale, SiteContent } from "@/content"
import { cn } from "@/lib/utils"

type HomeHeroProps = {
  locale: Locale
  content: SiteContent
  /**
   * When true (home), hash CTAs stay on-page (`#contact`).
   * When false (lab preview), hashes resolve to `/#…`.
   */
  samePageCtas?: boolean
}

function collectSpiralWords(content: SiteContent): string[] {
  const pillars = content.chrome.nav.pillars.map((pillar) => pillar.label)
  const voices = content.home.aperture.voices.map((voice) => voice.quote)
  const communityBits = [
    content.community.label,
    content.community.headline,
    content.home.aperture.stat.label,
    content.home.aperture.eyebrow,
  ]

  return [...pillars, ...voices, ...communityBits]
}

function resolveCtaHref(
  _locale: Locale,
  href: string,
  samePageCtas: boolean
): string {
  if (href.startsWith("#")) {
    return samePageCtas ? href : `/${href}`
  }
  if (href.startsWith("/")) {
    return href
  }
  return href
}

function HomeHero({ locale, content, samePageCtas = true }: HomeHeroProps) {
  const hero = content.home.hero
  const words = collectSpiralWords(content)

  return (
    <section className="bg-background text-foreground grid min-h-dvh grid-cols-1 lg:h-dvh lg:grid-cols-2 lg:overflow-hidden">
      <HomeHeroCopy locale={locale} hero={hero} samePageCtas={samePageCtas} />
      <div className="bg-surface-ink relative min-h-[50vh] w-full lg:min-h-0">
        <TextSpiral words={words} className="absolute inset-0 h-full w-full" />
      </div>
    </section>
  )
}

function HomeHeroCopy({
  locale,
  hero,
  samePageCtas,
}: {
  locale: Locale
  hero: HomeHeroContent
  samePageCtas: boolean
}) {
  return (
    <div className="border-border bg-background flex min-h-0 w-full flex-col justify-between gap-10 border-b px-6 pt-[calc(var(--site-header-offset)+0.5rem)] pb-8 sm:px-10 sm:pb-10 lg:border-r lg:border-b-0 lg:px-12 lg:pb-12 xl:px-16">
      <div>
        <Link
          to="/"
          aria-label="Ai Labs"
          className="focus-visible:ring-ring/50 inline-flex rounded-sm focus-visible:ring-2 focus-visible:outline-none"
        >
          <SiteLogo variant="lockup" />
        </Link>
      </div>

      <div className="flex max-w-xl flex-col gap-5">
        <Eyebrow>{hero.label}</Eyebrow>
        <h1 className={cn(homeDisplayClassName, "leading-[0.95]")}>
          {hero.headline}
        </h1>
        <p className="text-muted-foreground max-w-md text-base leading-relaxed md:text-lg">
          {hero.body}
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href={resolveCtaHref(locale, hero.primaryCta.href, samePageCtas)}
            className={cn(homePillClassName, "w-fit")}
          >
            {hero.primaryCta.label}
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </a>
          <a
            href={resolveCtaHref(locale, hero.secondaryCta.href, samePageCtas)}
            className={cn(
              buttonVariants({ variant: "outline", size: "xl" }),
              "rounded-full px-5"
            )}
          >
            {hero.secondaryCta.label}
          </a>
        </div>
      </div>

      <dl className="text-muted-foreground grid grid-cols-3 gap-4 border-t border-border pt-6 font-mono text-[0.65rem] tracking-wider uppercase sm:text-xs">
        {hero.slides.map((slide) => (
          <div key={slide.label} className="flex flex-col gap-1">
            <dt className="text-foreground font-semibold">{slide.value}</dt>
            <dd>{slide.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

export { HomeHero }
export type { HomeHeroProps }
