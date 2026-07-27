import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowDown01Icon,
  ArrowRight01Icon,
} from "@hugeicons/core-free-icons"
import { createFileRoute } from "@tanstack/react-router"

import { CampusLeaderForm } from "@/components/campus-leader/campus-leader-form"
import { CampusLeaderLanding } from "@/components/campus-leader/campus-leader-landing"
import { RedeemHeroDesktop } from "@/components/redeem/redeem-hero-desktop"
import { RedeemHeroMobile } from "@/components/redeem/redeem-hero-mobile"
import {
  homeDisplayClassName,
  homePillClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import { getContent, isLocale } from "@/content"
import type { CampusLeaderContent } from "@/content/types"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/$locale/campus-leader")({
  head: ({ params }) => {
    const locale = isLocale(params.locale) ? params.locale : "en"
    const { meta, campusLeader } = getContent(locale)

    return {
      meta: [
        { title: `${campusLeader.metaTitle} | ${meta.title}` },
        { name: "description", content: campusLeader.metaDescription },
      ],
    }
  },
  component: CampusLeaderPage,
})

type HeroTone = "onLight" | "onDark"

const revealBaseClassName =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500"

const frostedPanelClassName = cn(
  "rounded-3xl border border-on-dark/15 bg-black/55 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-md sm:p-5",
  "supports-backdrop-filter:bg-black/40"
)

function CampusLeaderPage() {
  const { locale, content: siteContent } = Route.useRouteContext()
  const content = siteContent.campusLeader
  const { microcopy } = siteContent
  const mediaSrcs = siteContent.home.hero.mediaSrcs
  const mediaAlt = siteContent.home.hero.mediaAlt
  const [applyOpen, setApplyOpen] = useState(false)

  return (
    <div className="relative">
      <a
        href="#campus-leader-main"
        className="bg-background text-foreground focus-visible:ring-ring sr-only rounded-sm px-3 py-2 text-sm font-medium focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:ring-2"
      >
        {microcopy.skipToContent}
      </a>
      <div id="campus-leader-main">
        <RedeemHeroMobile
          className="lg:hidden"
          locale={locale}
          microcopy={microcopy}
          mediaSrcs={mediaSrcs}
          mediaAlt={mediaAlt}
          qrContent={content}
          left={<CampusLeaderInfo content={content} tone="onDark" />}
          right={
            <CampusLeaderHeroAction
              content={content}
              onApply={() => setApplyOpen(true)}
            />
          }
        />
        <RedeemHeroDesktop
          className="hidden lg:flex"
          locale={locale}
          microcopy={microcopy}
          mediaSrcs={mediaSrcs}
          mediaAlt={mediaAlt}
          qrContent={content}
          left={<CampusLeaderInfo content={content} tone="onDark" />}
          right={
            <CampusLeaderHeroAction
              content={content}
              onApply={() => setApplyOpen(true)}
            />
          }
        />
      </div>

      <CampusLeaderLanding
        content={content}
        onApply={() => setApplyOpen(true)}
      />

      <CampusLeaderForm
        content={content}
        open={applyOpen}
        onOpenChange={setApplyOpen}
      />
    </div>
  )
}

function CampusLeaderInfo({
  content,
  tone = "onLight",
}: {
  content: CampusLeaderContent
  tone?: HeroTone
}) {
  const onDark = tone === "onDark"

  return (
    <div className="flex w-full max-w-xl flex-col gap-5 lg:max-w-none">
      <Eyebrow
        tone={onDark ? "onDark" : "default"}
        className={revealBaseClassName}
      >
        {content.label}
      </Eyebrow>

      <h1
        className={cn(
          homeDisplayClassName,
          "text-4xl leading-[0.95] sm:text-5xl md:text-5xl",
          onDark && "text-on-dark",
          revealBaseClassName,
          "motion-safe:delay-75"
        )}
      >
        {content.headline}
      </h1>

      <p
        className={cn(
          "max-w-md text-base leading-relaxed md:text-lg",
          onDark ? "text-on-dark/80" : "text-muted-foreground",
          revealBaseClassName,
          "motion-safe:delay-150"
        )}
      >
        {content.body}
      </p>

      <p
        className={cn(
          "font-mono text-xs font-semibold tracking-[0.14em] uppercase",
          onDark ? "text-on-dark/60" : "text-muted-foreground",
          revealBaseClassName,
          "motion-safe:delay-200"
        )}
      >
        {content.cohortLabel} {content.cohortDisplay}
      </p>
    </div>
  )
}

function CampusLeaderHeroAction({
  content,
  onApply,
}: {
  content: CampusLeaderContent
  onApply: () => void
}) {
  if (!content.applicationsOpen) {
    return (
      <div
        className={cn(
          frostedPanelClassName,
          "flex w-full flex-col gap-3",
          revealBaseClassName,
          "motion-safe:delay-150"
        )}
      >
        <p className="text-on-dark text-base font-medium leading-relaxed">
          {content.closedTitle}
        </p>
        <p className="text-on-dark/70 text-sm leading-relaxed">
          {content.closedBody}
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col">
      <div
        className={cn(
          frostedPanelClassName,
          "flex w-full flex-col gap-3",
          revealBaseClassName,
          "motion-safe:delay-150"
        )}
      >
        <p className="text-on-dark/80 text-sm leading-relaxed md:text-base">
          {content.creditsNote}
        </p>
        <Button
          type="button"
          onClick={onApply}
          className={cn(
            homePillClassName,
            "h-12 w-full justify-center gap-2.5 text-base",
            "motion-safe:active:scale-[0.98]"
          )}
        >
          {content.applyCta}
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            strokeWidth={2}
            className="size-4 shrink-0 opacity-80"
          />
        </Button>
        <a
          href="#campus-leader-program"
          className="text-on-dark/70 hover:text-on-dark inline-flex min-h-11 items-center justify-center gap-1.5 text-sm font-medium underline-offset-4 transition-colors hover:underline"
        >
          {content.learnCta}
          <HugeiconsIcon
            icon={ArrowDown01Icon}
            strokeWidth={2}
            className="size-4 opacity-80"
          />
        </a>
      </div>
    </div>
  )
}
