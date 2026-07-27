import type { HomeApertureContent, Locale } from "@/content"
import { HomeCtaLink } from "@/components/home/home-cta-link"
import { HomePartnerMembers } from "@/components/home/home-partner-members"
import { cn } from "@/lib/utils"
import {
  homeCardClassName,
  homeDisplayClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"

type HomeApertureProps = {
  locale: Locale
  aperture: HomeApertureContent
}

function HomeAperture({ locale, aperture }: HomeApertureProps) {
  return (
    <section
      id={aperture.id}
      className={cn(homeShellClassName, "scroll-mt-8 flex flex-col gap-8 md:gap-10")}
    >
      <div className="flex max-w-2xl flex-col gap-4">
        <div className="flex items-center gap-4">
          <span
            aria-hidden
            className="font-display text-purple text-2xl font-semibold tracking-tight tabular-nums md:text-3xl"
          >
            {aperture.index}
          </span>
          <Eyebrow>{aperture.eyebrow}</Eyebrow>
        </div>
        <h2 className={cn(homeDisplayClassName, "text-3xl sm:text-4xl md:text-5xl")}>
          {aperture.title}
        </h2>
        <p className="text-muted-foreground max-w-xl text-base leading-relaxed md:text-lg">
          {aperture.lead}
        </p>
      </div>

      <HomePartnerMembers members={aperture.members} voices={aperture.voices} />

      <div
        className={cn(
          "grid gap-4 md:gap-5",
          "lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.68fr)]"
        )}
      >
        <article
          className={cn(
            homeCardClassName,
            "bg-surface-soft flex flex-col justify-between gap-6 p-6 sm:p-7"
          )}
        >
          <p className="font-display text-foreground text-5xl font-semibold tracking-tight md:text-6xl">
            {aperture.stat.value}
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
            {aperture.stat.label}
          </p>
        </article>

        <article
          className={cn(
            homeCardClassName,
            "bg-card flex flex-col justify-between gap-6 p-6 sm:p-8"
          )}
        >
          <div className="flex flex-col gap-4">
            <span
              className="font-display text-purple text-5xl leading-none font-semibold"
              aria-hidden
            >
              “
            </span>
            <blockquote className="text-foreground text-base leading-relaxed text-balance md:text-lg">
              {aperture.quote}
            </blockquote>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm font-medium">
              {aperture.attribution}
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
              <HomeCtaLink
                cta={aperture.partnerCta}
                locale={locale}
                variant="quiet"
              />
              <HomeCtaLink cta={aperture.cta} locale={locale} />
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export { HomeAperture }
