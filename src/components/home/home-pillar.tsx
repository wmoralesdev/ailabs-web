import type { HomePillarContent, Locale } from "@/content"
import { HomeCtaLink } from "@/components/home/home-cta-link"
import { HomeMediaCarousel } from "@/components/home/home-media-carousel"
import { cn } from "@/lib/utils"
import {
  homeCardClassName,
  homeDisplayClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"

type HomePillarProps = {
  locale: Locale
  pillar: HomePillarContent
  /** Which side the media card sits on at lg+ (drives the zig-zag rhythm). */
  mediaSide: "left" | "right"
  intervalMs?: number
}

function HomePillar({
  locale,
  pillar,
  mediaSide,
  intervalMs = 5200,
}: HomePillarProps) {
  const mediaFirst = mediaSide === "left"

  const media = (
    <div
      className={cn(
        homeCardClassName,
        "bg-graphite relative min-h-72 lg:min-h-[30rem]"
      )}
    >
      <HomeMediaCarousel
        images={pillar.mediaSrcs}
        alt={pillar.mediaAlt}
        intervalMs={intervalMs}
      />
    </div>
  )

  const copy = (
    <div className="flex flex-col justify-center gap-6">
      <div className="flex items-center gap-4">
        <span
          aria-hidden
          className="font-display text-purple text-2xl font-semibold tracking-tight tabular-nums md:text-3xl"
        >
          {pillar.index}
        </span>
        <Eyebrow>{pillar.eyebrow}</Eyebrow>
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

  return (
    <section
      id={pillar.id}
      className={cn(
        homeShellClassName,
        "scroll-mt-8 grid items-center gap-8 md:gap-10 lg:grid-cols-2 lg:gap-14"
      )}
    >
      {mediaFirst ? (
        <>
          <div className="lg:order-1">{media}</div>
          <div className="lg:order-2">{copy}</div>
        </>
      ) : (
        <>
          <div className="lg:order-2">{media}</div>
          <div className="lg:order-1">{copy}</div>
        </>
      )}
    </section>
  )
}

export { HomePillar }
