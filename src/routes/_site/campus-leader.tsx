import { useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowDown01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { createFileRoute } from "@tanstack/react-router"

import { CampusLeaderForm } from "@/components/campus-leader/campus-leader-form"
import { CampusLeaderLanding } from "@/components/campus-leader/campus-leader-landing"
import { CampaignHero } from "@/components/campaign/campaign-hero"
import {
  homeDisplayClassName,
  homePillClassName,
} from "@/components/home/home-styles"
import { Button, buttonVariants } from "@/components/ui/button"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { CampusLeaderContent } from "@/content/types"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/_site/campus-leader")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {}
    }
    const { meta, campusLeader } = loaderData.content

    return {
      meta: [
        { title: `${campusLeader.metaTitle} | ${meta.title}` },
        { name: "description", content: campusLeader.metaDescription },
      ],
    }
  },
  component: CampusLeaderPage,
})

function CampusLeaderPage() {
  const { locale, content: siteContent } = Route.useRouteContext()
  const content = siteContent.campusLeader
  const { microcopy } = siteContent
  const [applyOpen, setApplyOpen] = useState(false)
  const words = [
    content.label,
    content.headline,
    `${content.cohortLabel} ${content.cohortDisplay}`,
    content.applyCta,
    ...content.landing.what.items.map((item) => item.title),
    ...content.landing.role.items.map((item) => item.title),
    ...content.landing.benefits.items.map((item) => item.title),
  ]

  return (
    <div className="relative">
      <a
        href="#campus-leader-main"
        className="sr-only rounded-sm bg-background px-3 py-2 text-sm font-medium text-foreground focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-ring"
      >
        {microcopy.skipToContent}
      </a>
      <div id="campus-leader-main">
        <CampaignHero locale={locale} words={words} qrContent={content}>
          <Eyebrow>{content.label}</Eyebrow>
          <h1 className={cn(homeDisplayClassName, "leading-[0.95]")}>
            {content.headline}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.body}
          </p>
          <p className="font-mono text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            {content.cohortLabel} {content.cohortDisplay}
          </p>
          <CampusLeaderHeroAction
            content={content}
            onApply={() => setApplyOpen(true)}
          />
        </CampaignHero>
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

function CampusLeaderHeroAction({
  content,
  onApply,
}: {
  content: CampusLeaderContent
  onApply: () => void
}) {
  if (!content.applicationsOpen) {
    return (
      <div className="flex w-full max-w-md flex-col gap-2 rounded-3xl border border-border bg-card p-5 text-card-foreground">
        <p className="text-base leading-relaxed font-medium">
          {content.closedTitle}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground">
          {content.closedBody}
        </p>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col gap-3 pt-1">
      <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
        {content.creditsNote}
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <Button
          type="button"
          onClick={onApply}
          className={cn(homePillClassName, "w-fit")}
        >
          {content.applyCta}
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        </Button>
        <a
          href="#campus-leader-program"
          className={cn(
            buttonVariants({ variant: "outline", size: "xl" }),
            "gap-1.5 rounded-full px-5"
          )}
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
