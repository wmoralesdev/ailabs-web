import {
  Award01Icon,
  BubbleChatIcon,
  Calendar03Icon,
  GiftIcon,
  IdentityCardIcon,
  Link01Icon,
  UniversityIcon,
} from "@hugeicons/core-free-icons"
import { HugeiconsIcon } from "@hugeicons/react"

import type { CampusLeaderContent } from "@/content/types"
import { Button } from "@/components/ui/button"
import { CanvasRevealBanner } from "@/components/ui/canvas-reveal-banner"
import { cn } from "@/lib/utils"
import { HomeMediaCarousel } from "@/components/home/home-media-carousel"
import { HomePaperArcs } from "@/components/home/home-paper-arcs"
import {
  homeBandPaddingClassName,
  homeDisplayClassName,
  homePaperBandClassName,
  homePaperSheetClassName,
  homePillClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"

const ROLE_ICONS = [BubbleChatIcon, Calendar03Icon, UniversityIcon] as const

const BENEFIT_ICONS = [
  Link01Icon,
  Award01Icon,
  IdentityCardIcon,
  GiftIcon,
] as const

const revealClassName =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"

type CampusLeaderLandingProps = {
  content: CampusLeaderContent
  onApply: () => void
}

function CampusLeaderLanding({ content, onApply }: CampusLeaderLandingProps) {
  const { landing, media } = content

  return (
    <>
      <section
        id="campus-leader-program"
        className={cn(
          homePaperBandClassName,
          homeBandPaddingClassName,
          "scroll-mt-8"
        )}
      >
        <HomePaperArcs />
        <div
          className={cn(
            homeShellClassName,
            "relative z-[1] grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
          )}
        >
          <div className={cn(revealClassName, "flex flex-col gap-4")}>
            <Eyebrow tone="onDark">{landing.what.label}</Eyebrow>
            <h2
              className={cn(
                homeDisplayClassName,
                "text-3xl normal-case sm:text-4xl md:text-5xl"
              )}
            >
              {landing.what.title}
            </h2>
            <p className="text-muted-foreground max-w-lg text-base leading-relaxed md:text-lg">
              {landing.what.body}
            </p>
            <ul className="mt-4 flex flex-col gap-5">
              {landing.what.items.map((item) => (
                <li key={item.title} className="flex flex-col gap-1">
                  <h3 className="text-foreground text-base font-semibold tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <figure
            className={cn(
              revealClassName,
              "motion-safe:delay-100 overflow-hidden rounded-[2rem]"
            )}
          >
            <img
              src={media.whatSrc}
              alt={media.whatAlt}
              className="aspect-video w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <section
        className={cn(homePaperSheetClassName, homeBandPaddingClassName)}
      >
        <div className={homeShellClassName}>
          <div className={cn(revealClassName, "mb-10 max-w-2xl md:mb-14")}>
            <Eyebrow>{landing.role.label}</Eyebrow>
            <h2
              className={cn(
                homeDisplayClassName,
                "mt-3 text-3xl normal-case sm:text-4xl md:text-5xl"
              )}
            >
              {landing.role.title}
            </h2>
          </div>

          <ol className="flex flex-col">
            {landing.role.items.map((item, index) => {
              const icon = ROLE_ICONS[index] ?? BubbleChatIcon
              const zigZag = index % 2 === 1

              return (
                <li
                  key={item.title}
                  className={cn(
                    revealClassName,
                    "border-border border-b py-8 last:border-b-0 md:py-10",
                    "first:pt-0 last:pb-0",
                    index === 1 && "motion-safe:delay-75",
                    index === 2 && "motion-safe:delay-150"
                  )}
                >
                  <div
                    className={cn(
                      "grid max-w-3xl gap-5 md:grid-cols-[auto_minmax(0,1fr)] md:items-start md:gap-8",
                      zigZag && "md:ml-auto md:grid-cols-[minmax(0,1fr)_auto]"
                    )}
                  >
                    <RoleIcon
                      icon={icon}
                      index={index}
                      className={cn(zigZag && "md:order-2")}
                    />
                    <div
                      className={cn(
                        "flex flex-col gap-2",
                        zigZag && "md:order-1 md:text-right"
                      )}
                    >
                      <h3 className="text-foreground text-xl font-semibold tracking-tight md:text-2xl">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      <section
        className={cn(
          homePaperBandClassName,
          homeBandPaddingClassName
        )}
      >
        <HomePaperArcs />
        <div
          className={cn(
            homeShellClassName,
            "relative z-[1] grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16"
          )}
        >
          <div className={revealClassName}>
            <div className="flex flex-col gap-4">
              <Eyebrow tone="onDark">{landing.benefits.label}</Eyebrow>
              <h2
                className={cn(
                  homeDisplayClassName,
                  "text-3xl normal-case sm:text-4xl md:text-5xl"
                )}
              >
                {landing.benefits.title}
              </h2>
            </div>

            <dl className="border-border mt-8 divide-y border-y">
              {landing.benefits.items.map((item, index) => {
                const icon = BENEFIT_ICONS[index] ?? Link01Icon

                return (
                  <div
                    key={item.title}
                    className="grid gap-3 py-5 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-center sm:gap-5"
                  >
                    <span
                      className="text-purple bg-purple/10 inline-flex size-10 shrink-0 items-center justify-center rounded-full"
                      aria-hidden="true"
                    >
                      <HugeiconsIcon
                        icon={icon}
                        strokeWidth={2}
                        className="size-5"
                      />
                    </span>
                    <div className="grid gap-1 sm:items-center md:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] md:gap-6">
                      <dt className="text-foreground text-base font-semibold">
                        {item.title}
                      </dt>
                      <dd className="text-muted-foreground text-sm leading-relaxed md:text-base">
                        {item.body}
                      </dd>
                    </div>
                  </div>
                )
              })}
            </dl>
          </div>

          <figure
            className={cn(
              revealClassName,
              "motion-safe:delay-100 relative aspect-video overflow-hidden rounded-[2rem] lg:sticky lg:top-28"
            )}
          >
            <HomeMediaCarousel
              images={media.benefitsSrcs}
              alt={media.benefitsAlt}
              intervalMs={5200}
            />
          </figure>
        </div>
      </section>

      <section
        className={cn(homePaperSheetClassName, homeBandPaddingClassName)}
      >
        <div className={homeShellClassName}>
          <div className={cn(revealClassName, "mb-10 max-w-2xl")}>
            <Eyebrow>{landing.fit.label}</Eyebrow>
            <h2
              className={cn(
                homeDisplayClassName,
                "mt-3 text-3xl normal-case sm:text-4xl md:text-5xl"
              )}
            >
              {landing.fit.title}
            </h2>
          </div>

          <div
            className={cn(
              revealClassName,
              "grid gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-border"
            )}
          >
            <FitColumn
              title={landing.fit.forTitle}
              items={landing.fit.forItems}
              tone="yes"
              className="md:pr-10"
            />
            <FitColumn
              title={landing.fit.notTitle}
              items={landing.fit.notItems}
              tone="no"
              className="md:pl-10"
            />
          </div>
        </div>
      </section>

      <CanvasRevealBanner
        className={revealClassName}
        action={
          content.applicationsOpen ? (
            <Button
              type="button"
              onClick={onApply}
              className={cn(homePillClassName, "h-12 px-8")}
            >
              {landing.ctaBand.applyCta}
            </Button>
          ) : (
            <p className="max-w-xs text-sm leading-relaxed text-on-dark/70">
              {content.closedBody}
            </p>
          )
        }
      >
        <p className="font-mono text-xs font-semibold tracking-[0.16em] text-on-dark/55 uppercase">
          {content.cohortLabel} {content.cohortDisplay}
        </p>
        <h2
          className={cn(
            homeDisplayClassName,
            "text-3xl text-on-dark normal-case sm:text-4xl"
          )}
        >
          {landing.ctaBand.title}
        </h2>
        <p className="text-base leading-relaxed text-on-dark/75">
          {landing.ctaBand.body}
        </p>
        <p className="text-sm leading-relaxed text-on-dark/55">
          {content.creditsNote}
        </p>
      </CanvasRevealBanner>
    </>
  )
}

function RoleIcon({
  icon,
  index,
  className,
}: {
  icon: (typeof ROLE_ICONS)[number]
  index: number
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span
        className="text-purple bg-purple/10 inline-flex size-12 shrink-0 items-center justify-center rounded-full"
        aria-hidden="true"
      >
        <HugeiconsIcon icon={icon} strokeWidth={2} className="size-6" />
      </span>
      <span className="font-mono text-xs font-semibold tracking-[0.16em] text-purple uppercase">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  )
}

function FitColumn({
  title,
  items,
  tone,
  className,
}: {
  title: string
  items: ReadonlyArray<string>
  tone: "yes" | "no"
  className?: string
}) {
  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <h3
        className={cn(
          "text-sm font-semibold tracking-wider uppercase",
          tone === "yes" ? "text-purple" : "text-muted-foreground"
        )}
      >
        {title}
      </h3>
      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item}
            className="text-foreground border-border/70 border-l-2 pl-3 text-sm leading-relaxed"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

export { CampusLeaderLanding }
