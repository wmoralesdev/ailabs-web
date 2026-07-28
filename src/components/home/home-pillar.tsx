import type { HomePillarContent, Locale } from "@/content"
import { HomeAgenticProcess } from "@/components/home/home-agentic-process"
import { HomeCtaLink } from "@/components/home/home-cta-link"
import { HomeMediaCarousel } from "@/components/home/home-media-carousel"
import { HomePaperArcs } from "@/components/home/home-paper-arcs"
import { cn } from "@/lib/utils"
import {
  homeBandPaddingClassName,
  homeCardClassName,
  homeDisplayClassName,
  homePaperBandClassName,
  homePaperSheetClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"

type HomePillarBand = "purple" | "paper"

type HomePillarProps = {
  locale: Locale
  pillar: HomePillarContent
  /** Which side the media card sits on at lg+ (drives the zig-zag rhythm). */
  mediaSide: "left" | "right"
  /** Full-bleed surface in the post-hero alternating rhythm. */
  band: HomePillarBand
  intervalMs?: number
}

function HomePillar({
  locale,
  pillar,
  mediaSide,
  band,
  intervalMs = 5200,
}: HomePillarProps) {
  const mediaFirst = mediaSide === "left"
  const isPurple = band === "purple"

  const media = (
    <div
      className={cn(
        homeCardClassName,
        "bg-graphite relative min-h-72 lg:min-h-[30rem]"
      )}
    >
      {pillar.id === "agentic" ? (
        <HomeAgenticProcess process={pillar.process} />
      ) : (
        <HomeMediaCarousel
          images={pillar.mediaSrcs}
          alt={pillar.mediaAlt}
          intervalMs={intervalMs}
        />
      )}
    </div>
  )

  const copy = (
    <div className="flex flex-col justify-center gap-6">
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className={cn(
            "font-display text-2xl font-semibold tracking-tight tabular-nums md:text-3xl",
            isPurple ? "text-on-dark" : "text-purple"
          )}
        >
          {pillar.index}
        </span>
        <Eyebrow tone={isPurple ? "onDark" : "default"}>
          {pillar.eyebrow}
        </Eyebrow>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className={cn(homeDisplayClassName, "text-3xl sm:text-4xl md:text-5xl")}>
          {pillar.title}
        </h2>
        <p className="text-muted-foreground max-w-md text-base leading-relaxed md:text-lg">
          {pillar.lead}
        </p>
      </div>

      <dl className="border-border flex flex-col divide-y">
        {pillar.points.map((point) => (
          <div key={point.title} className="flex flex-col gap-1 py-3.5 first:pt-0">
            <dt className="text-foreground text-sm font-semibold md:text-base">
              {point.title}
            </dt>
            <dd className="text-muted-foreground text-sm leading-relaxed">
              {point.body}
            </dd>
          </div>
        ))}
      </dl>

      <HomeCtaLink cta={pillar.cta} locale={locale} />
    </div>
  )

  // Mobile: always copy → media. Desktop: zig-zag from mediaSide.
  const copyOrder = mediaFirst ? "order-1 lg:order-2" : "order-1 lg:order-1"
  const mediaOrder = mediaFirst ? "order-2 lg:order-1" : "order-2 lg:order-2"

  return (
    <section
      id={pillar.id}
      className={cn(
        isPurple ? homePaperBandClassName : homePaperSheetClassName,
        homeBandPaddingClassName,
        "scroll-mt-8"
      )}
    >
      {isPurple ? <HomePaperArcs /> : null}
      <div
        className={cn(
          homeShellClassName,
          "relative z-[1] grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-14"
        )}
      >
        <div className={copyOrder}>{copy}</div>
        <div className={mediaOrder}>{media}</div>
      </div>
    </section>
  )
}

export { HomePillar }
export type { HomePillarBand }
