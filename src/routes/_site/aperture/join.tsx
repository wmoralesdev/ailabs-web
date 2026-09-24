import { useEffect, useState } from "react"
import {
  Show,
  SignInButton,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/tanstack-react-start"
import { createFileRoute, useRouterState } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { JoinForm } from "@/components/aperture/join-form"
import { MemberNumberReveal } from "@/components/aperture/member-number-reveal"
import { CampaignHero } from "@/components/campaign/campaign-hero"
import {
  homeDisplayClassName,
  homePillClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Spinner } from "@/components/ui/spinner"
import type { ApertureJoinContent, Locale } from "@/content/types"
import { formatMemberNumber } from "@/lib/aperture/member-number"
import { buildPageMeta } from "@/lib/seo"
import { cn } from "@/lib/utils"
import { getJoinState } from "@/server/aperture/claim"
import type { JoinPageState } from "@/server/aperture/claim"

export const Route = createFileRoute("/_site/aperture/join")({
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
      path: "/aperture/join",
      title: `${content.aperture.join.metaTitle} | ${content.meta.title}`,
      description: content.aperture.join.metaDescription,
      noindex: true,
    })
  },
  component: JoinPage,
})

const skipLinkClassName =
  "bg-background text-foreground focus-visible:ring-ring sr-only rounded-sm px-3 py-2 text-sm font-medium focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:ring-2"

function collectJoinWords(content: ApertureJoinContent): string[] {
  return [
    content.label,
    content.headline,
    content.signInCta,
    content.submit,
    ...Object.values(content.roleOptions),
  ]
}

function JoinPage() {
  const { locale, content: siteContent } = Route.useRouteContext()
  const content = siteContent.aperture.join
  const { microcopy } = siteContent

  return (
    <div className="relative">
      <a href="#aperture-join-main" className={skipLinkClassName}>
        {microcopy.skipToContent}
      </a>
      <div id="aperture-join-main">
        <CampaignHero
          fluid
          locale={locale}
          words={collectJoinWords(content)}
          qrContent={content}
        >
          <Eyebrow>{content.label}</Eyebrow>
          <h1 className={cn(homeDisplayClassName, "leading-[0.95]")}>
            {content.headline}
          </h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
            {content.body}
          </p>
          <JoinPanel locale={locale} content={content} />
        </CampaignHero>
      </div>
    </div>
  )
}

function JoinPanel({
  locale,
  content,
}: {
  locale: Locale
  content: ApertureJoinContent
}) {
  const returnUrl = useRouterState({
    select: (state) => state.location.href,
  })

  return (
    <div className="flex w-full flex-col gap-5 rounded-3xl border border-border bg-card p-5 text-card-foreground sm:p-6">
      <Show when="signed-out">
        <div className="flex flex-col gap-5">
          <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
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
        </div>
      </Show>
      <Show when="signed-in">
        <JoinAccountChrome content={content} returnUrl={returnUrl} />
        <JoinSignedIn locale={locale} content={content} />
      </Show>
    </div>
  )
}

function JoinAccountChrome({
  content,
  returnUrl,
}: {
  content: ApertureJoinContent
  returnUrl: string
}) {
  const { user } = useUser()
  const email =
    user?.primaryEmailAddress?.emailAddress ??
    user?.emailAddresses[0]?.emailAddress

  return (
    <div className="flex flex-wrap items-center gap-3">
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
  )
}

function JoinSignedIn({
  locale,
  content,
}: {
  locale: Locale
  content: ApertureJoinContent
}) {
  const { user, isLoaded } = useUser()
  const [state, setState] = useState<JoinPageState | null>(null)
  const [claimed, setClaimed] = useState<{
    number: number
    username: string
  } | null>(null)

  useEffect(() => {
    if (!isLoaded || !user) {
      return
    }
    let cancelled = false
    void getJoinState().then((next) => {
      if (!cancelled) {
        setState(next)
      }
    })
    return () => {
      cancelled = true
    }
  }, [isLoaded, user?.id])

  if (claimed) {
    return <MemberNumberReveal number={claimed.number} content={content} />
  }

  if (!isLoaded || !state) {
    return (
      <div className="flex items-center gap-2">
        <Spinner />
      </div>
    )
  }

  switch (state.status) {
    case "closed":
      return (
        <StatusBlock title={content.closedTitle} body={content.closedBody} />
      )
    case "retired":
      return (
        <StatusBlock title={content.retiredTitle} body={content.retiredBody} />
      )
    case "existing":
      return (
        <StatusBlock
          title={content.existingTitle}
          body={content.existingBody.replace(
            "{number}",
            formatMemberNumber(state.number)
          )}
        />
      )
    case "no_verified_email":
      return (
        <StatusBlock
          title={content.noVerifiedEmailTitle}
          body={content.noVerifiedEmailBody}
        />
      )
    case "unauthenticated":
      return null
    case "ready":
      return (
        <JoinForm
          content={content}
          locale={locale}
          displayName={state.displayName}
          onClaimed={setClaimed}
        />
      )
    default: {
      const unhandled: never = state
      throw new Error(`Unhandled join state ${JSON.stringify(unhandled)}`)
    }
  }
}

function StatusBlock({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-medium text-foreground">{title}</h2>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  )
}
