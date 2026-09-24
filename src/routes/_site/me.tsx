import { useEffect, useState } from "react"
import {
  Show,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/tanstack-react-start"
import { createFileRoute, Link, useRouterState } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { ApertureHero } from "@/components/aperture/aperture-hero"
import { apertureShellClassName } from "@/components/aperture/aperture-styles"
import { MeDashboardView } from "@/components/aperture/me-dashboard"
import { MainCard } from "@/components/chrome/main-card"
import {
  homeDisplayClassName,
  homePillClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Spinner } from "@/components/ui/spinner"
import type { ApertureMeContent } from "@/content/types"
import { buildPageMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { getMeDashboard } from "@/server/aperture/me"
import type { LoadMeResult, MeDashboard } from "@/server/aperture/me"

export const Route = createFileRoute("/_site/me")({
  loader: ({ context }) => context,
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ name: "robots", content: "noindex, nofollow" }],
      }
    }
    const { locale, content } = loaderData
    return buildPageMeta({
      locale,
      path: "/me",
      title: `${content.aperture.me.metaTitle} | ${content.meta.title}`,
      description: content.aperture.me.metaDescription,
      noindex: true,
    })
  },
  component: MePage,
})

function MePage() {
  const { content: siteContent } = Route.useRouteContext()
  const content = siteContent.aperture.me
  const { microcopy } = siteContent

  return (
    <MainCard textured={false}>
      <div
        className={cn(apertureShellClassName, "relative flex flex-col gap-6")}
      >
        <a
          href="#aperture-me-main"
          className="sr-only rounded-sm bg-background px-3 py-2 text-sm font-medium text-foreground focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:ring-2 focus-visible:ring-ring"
        >
          {microcopy.skipToContent}
        </a>
        <div id="aperture-me-main" className="flex flex-col gap-6">
          <Show when="signed-out">
            <SignedOutPanel content={content} />
          </Show>
          <Show when="signed-in">
            <SignedInPanel />
          </Show>
        </div>
      </div>
    </MainCard>
  )
}

function SignedOutPanel({ content }: { content: ApertureMeContent }) {
  const returnUrl = useRouterState({
    select: (state) => state.location.href,
  })

  return (
    <ApertureHero>
      <Eyebrow>{content.label}</Eyebrow>
      <h1 className={cn(homeDisplayClassName, "leading-[0.95]")}>
        {content.headline}
      </h1>
      <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
        {content.signInPrompt}
      </p>
      <SignInButton
        mode="modal"
        forceRedirectUrl={returnUrl}
        signUpForceRedirectUrl={returnUrl}
      >
        <button type="button" className={cn(homePillClassName, "w-fit")}>
          {content.signInCta}
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        </button>
      </SignInButton>
    </ApertureHero>
  )
}

function SignedInPanel() {
  const { locale, content: siteContent } = Route.useRouteContext()
  const content = siteContent.aperture.me
  const join = siteContent.aperture.join
  const returnUrl = useRouterState({
    select: (state) => state.location.href,
  })
  const { user, isLoaded } = useUser()
  const [state, setState] = useState<
    LoadMeResult | { status: "unauthenticated" } | null
  >(null)
  const [dashboard, setDashboard] = useState<MeDashboard | null>(null)

  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }
    let cancelled = false
    void getMeDashboard().then((next) => {
      if (cancelled) {
        return
      }
      setState(next)
      if (next.status === "ok") {
        setDashboard(next.dashboard)
      }
    })
    return () => {
      cancelled = true
    }
  }, [isLoaded, user?.id])

  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3 rounded-full border border-border bg-card py-2 pr-5 pl-2">
        <UserButton />
        {email ? (
          <p className="min-w-0 flex-1 truncate text-sm text-muted-foreground">
            {content.signedInAs.replace("{email}", email)}
          </p>
        ) : null}
        <SignOutButton redirectUrl={returnUrl}>
          <button
            type="button"
            className="shrink-0 rounded-sm text-sm font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            {content.signOutCta}
          </button>
        </SignOutButton>
      </div>

      {!isLoaded || !state ? (
        <div className="flex min-h-[40vh] items-center justify-center rounded-[2rem] border border-border bg-card">
          <Spinner />
        </div>
      ) : dashboard ? (
        <MeDashboardView
          dashboard={dashboard}
          join={join}
          content={content}
          locale={locale}
          onDashboard={setDashboard}
        />
      ) : (
        <StatusPanel state={state} content={content} />
      )}
    </div>
  )
}

const statusCardClassName =
  "flex min-h-[40vh] flex-col items-center justify-center gap-4 rounded-[2rem] border border-dashed border-border bg-card/60 px-6 py-14 text-center"

function StatusPanel({
  state,
  content,
}: {
  state: LoadMeResult | { status: "unauthenticated" }
  content: ApertureMeContent
}) {
  if (state.status === "retired") {
    return (
      <div className={statusCardClassName}>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {content.retiredTitle}
        </h1>
        <p className="max-w-md text-base text-muted-foreground">
          {content.retiredBody}
        </p>
      </div>
    )
  }

  if (state.status === "no_member") {
    return (
      <div className={statusCardClassName}>
        <h1 className="font-display text-3xl font-semibold tracking-tight">
          {content.noMemberTitle}
        </h1>
        <p className="max-w-md text-base text-muted-foreground">
          {content.noMemberBody}
        </p>
        <Link to="/aperture/join" className={cn(homePillClassName, "w-fit")}>
          {content.joinCta}
          <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
        </Link>
      </div>
    )
  }

  return null
}
