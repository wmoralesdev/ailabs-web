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
import { toast } from "sonner"

import { CampaignFactRow } from "@/components/campaign/campaign-fact-row"
import { CampaignHero } from "@/components/campaign/campaign-hero"
import {
  homeDisplayClassName,
  homePillClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Spinner } from "@/components/ui/spinner"
import type { Locale, RedeemContent } from "@/content/types"
import { getRedeemProductConfig } from "@/lib/redeem-products"
import type { RedeemProductConfig } from "@/lib/redeem-products"
import { cn } from "@/lib/utils"
import { getEventByCode, getRedeemStatus, redeemCredits } from "@/server/redeem"
import type {
  RedeemCreditsResult,
  RedeemedCode,
  RedeemEventPublic,
  RedeemStatusResult,
} from "@/server/redeem"

type RedeemSearch = {
  code?: string
}

export const Route = createFileRoute("/_site/redeem")({
  validateSearch: (search: Record<string, unknown>): RedeemSearch => {
    const code =
      typeof search.code === "string" && search.code.trim().length > 0
        ? search.code.trim()
        : undefined
    return { code }
  },
  loaderDeps: ({ search }) => ({ code: search.code }),
  loader: async ({
    context,
    deps,
  }): Promise<{
    event: RedeemEventPublic | null
    locale: typeof context.locale
    content: typeof context.content
  }> => {
    const event = deps.code
      ? await getEventByCode({ data: { code: deps.code } })
      : null
    return {
      event,
      locale: context.locale,
      content: context.content,
    }
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ name: "robots", content: "noindex, nofollow" }],
      }
    }
    const { meta, redeem } = loaderData.content
    const titleBase = loaderData.event
      ? getRedeemProductConfig(loaderData.event.product).titleKey
      : null
    const productTitle = titleBase
      ? redeem.products[titleBase].title
      : redeem.metaTitle

    return {
      meta: [
        { title: `${productTitle} | ${meta.title}` },
        { name: "description", content: meta.description },
        { name: "robots", content: "noindex, nofollow" },
      ],
    }
  },
  component: RedeemPage,
})

const skipLinkClassName =
  "bg-background text-foreground focus-visible:ring-ring sr-only rounded-sm px-3 py-2 text-sm font-medium focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:ring-2"

function collectRedeemWords(
  content: RedeemContent,
  eventName?: string
): string[] {
  return [
    content.eventLabel,
    ...(eventName ? [eventName] : []),
    ...Object.values(content.products).map((product) => product.title),
    content.signInCta,
    content.claimCta,
    ...content.steps.map((step) => step.title),
  ]
}

function RedeemPage() {
  const { locale, content: siteContent } = Route.useRouteContext()
  const { code } = Route.useSearch()
  const { event } = Route.useLoaderData()
  const content = siteContent.redeem
  const { microcopy } = siteContent

  if (!code) {
    return (
      <RedeemStatusHero
        locale={locale}
        skipToContent={microcopy.skipToContent}
        content={content}
        title={content.missingCodeTitle}
        body={content.missingCodeBody}
      />
    )
  }

  if (!event) {
    return (
      <RedeemStatusHero
        locale={locale}
        skipToContent={microcopy.skipToContent}
        content={content}
        title={content.invalidTitle}
        body={content.invalidBody}
      />
    )
  }

  if (!event.active) {
    return (
      <RedeemStatusHero
        locale={locale}
        skipToContent={microcopy.skipToContent}
        content={content}
        title={content.inactiveTitle}
        body={content.inactiveBody}
      />
    )
  }

  const product = getRedeemProductConfig(event.product)
  const productCopy = content.products[product.titleKey]

  return (
    <div className="relative">
      <a href="#redeem-main" className={skipLinkClassName}>
        {microcopy.skipToContent}
      </a>
      <div id="redeem-main">
        <CampaignHero
          fluid
          locale={locale}
          words={collectRedeemWords(content, event.name)}
          qrContent={content}
          footer={
            <CampaignFactRow
              label={content.howItWorksLabel}
              steps={content.steps}
            />
          }
        >
          <ProductInfo
            content={content}
            product={product}
            productCopy={productCopy}
            eventName={event.name}
          />
          <RedeemAction code={code} content={content} />
        </CampaignHero>
      </div>
    </div>
  )
}

function RedeemStatusHero({
  locale,
  skipToContent,
  content,
  title,
  body,
}: {
  locale: Locale
  skipToContent: string
  content: RedeemContent
  title: string
  body: string
}) {
  return (
    <div className="relative">
      <a href="#redeem-main" className={skipLinkClassName}>
        {skipToContent}
      </a>
      <div id="redeem-main">
        <CampaignHero
          fluid
          locale={locale}
          words={collectRedeemWords(content)}
          qrContent={content}
          footer={<RedeemFootNote text={content.poweredBy} />}
        >
          <h1 className="font-display text-foreground text-3xl font-semibold tracking-tight md:text-4xl">
            {title}
          </h1>
          <p className="text-muted-foreground max-w-md text-base leading-relaxed md:text-lg">
            {body}
          </p>
        </CampaignHero>
      </div>
    </div>
  )
}

function ProductInfo({
  content,
  product,
  productCopy,
  eventName,
}: {
  content: RedeemContent
  product: RedeemProductConfig
  productCopy: { title: string; blurb: string }
  eventName: string
}) {
  return (
    <>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        {product.logos.map((logo) => (
          <img
            key={logo.alt}
            src={logo.dark}
            alt={logo.alt}
            className="h-6 w-auto brightness-0 invert dark:invert-0"
          />
        ))}
        <Eyebrow>{content.eventLabel}</Eyebrow>
      </div>

      <h1 className={cn(homeDisplayClassName, "leading-[0.95]")}>
        {eventName}
      </h1>

      <div className="flex flex-col gap-2">
        <p className="font-display text-foreground text-lg font-semibold tracking-tight md:text-xl">
          {productCopy.title}
        </p>
        <p className="text-muted-foreground max-w-md text-base leading-relaxed md:text-lg">
          {productCopy.blurb}
        </p>
      </div>
    </>
  )
}

function RedeemAccountChrome({
  content,
  returnUrl,
}: {
  content: RedeemContent
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
        <p className="text-muted-foreground min-w-0 flex-1 truncate text-sm">
          {content.signedInAs.replace("{email}", email)}
        </p>
      ) : null}
      <SignOutButton redirectUrl={returnUrl}>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 shrink-0 rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none"
        >
          {content.signOutCta}
        </button>
      </SignOutButton>
    </div>
  )
}

function RedeemAction({
  code,
  content,
}: {
  code: string
  content: RedeemContent
}) {
  const returnUrl = useRouterState({
    select: (state) => state.location.href,
  })

  return (
    <div className="border-border bg-card text-card-foreground flex w-full flex-col gap-5 rounded-3xl border p-5 sm:p-6">
      <Show when="signed-out">
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-foreground text-2xl font-semibold tracking-tight md:text-3xl">
              {content.signInCta}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed md:text-base">
              {content.signInPrompt}
            </p>
          </div>
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
        <RedeemAccountChrome content={content} returnUrl={returnUrl} />
        <RedeemClaimPanel code={code} content={content} />
      </Show>
    </div>
  )
}

function RedeemFootNote({ text }: { text: string }) {
  return (
    <div className="border-border flex items-center gap-2 border-t pt-6">
      <span className="bg-purple size-1.5 rounded-full" aria-hidden />
      <p className="text-muted-foreground text-xs font-medium tracking-wide">
        {text}
      </p>
    </div>
  )
}

function RedeemClaimPanel({
  code,
  content,
}: {
  code: string
  content: RedeemContent
}) {
  const { user, isLoaded } = useUser()
  const [pending, setPending] = useState(false)
  const [checking, setChecking] = useState(true)
  const [result, setResult] = useState<
    RedeemCreditsResult | RedeemStatusResult | null
  >(null)

  useEffect(() => {
    if (!isLoaded) {
      return
    }

    if (!user) {
      setChecking(false)
      return
    }

    let cancelled = false
    setChecking(true)

    void getRedeemStatus({ data: { code } })
      .then((next) => {
        if (cancelled) {
          return
        }
        setResult(next)
      })
      .catch(() => {
        if (!cancelled) {
          setResult(null)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setChecking(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [code, isLoaded, user?.id])

  async function onClaim() {
    setPending(true)
    try {
      const next = await redeemCredits({ data: { code } })
      setResult(next)
      if (next.status === "ok" && !next.alreadyRedeemed) {
        const heading =
          next.codes.length === 1 ? content.yourCode : content.yourCodes
        toast.success(heading)
      }
    } catch {
      toast.error(content.soldOutBody)
    } finally {
      setPending(false)
    }
  }

  if (checking || !isLoaded) {
    return (
      <div className="flex items-center gap-2">
        <Spinner />
      </div>
    )
  }

  if (result?.status === "ok") {
    return (
      <div className="flex flex-col gap-4">
        {result.alreadyRedeemed ? (
          <p className="text-foreground text-sm">{content.alreadyRedeemed}</p>
        ) : null}
        <CodesList codes={result.codes} content={content} />
      </div>
    )
  }

  if (result?.status === "not_eligible") {
    return (
      <StatusInline
        title={content.notEligibleTitle}
        body={content.notEligibleBody}
      />
    )
  }

  if (result?.status === "sold_out") {
    return (
      <StatusInline title={content.soldOutTitle} body={content.soldOutBody} />
    )
  }

  if (result?.status === "no_verified_email") {
    return (
      <StatusInline
        title={content.noVerifiedEmailTitle}
        body={content.noVerifiedEmailBody}
      />
    )
  }

  if (result?.status === "inactive" || result?.status === "invalid") {
    return (
      <StatusInline
        title={
          result.status === "inactive"
            ? content.inactiveTitle
            : content.invalidTitle
        }
        body={
          result.status === "inactive"
            ? content.inactiveBody
            : content.invalidBody
        }
      />
    )
  }

  if (result?.status === "unauthenticated") {
    return null
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        type="button"
        className={cn(homePillClassName, "w-fit")}
        disabled={pending}
        onClick={() => void onClaim()}
      >
        {pending ? (
          <>
            <Spinner />
            {content.claiming}
          </>
        ) : (
          <>
            {content.claimCta}
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </>
        )}
      </button>
    </div>
  )
}

function CodesList({
  codes,
  content,
}: {
  codes: RedeemedCode[]
  content: RedeemContent
}) {
  const heading = codes.length === 1 ? content.yourCode : content.yourCodes

  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-display text-foreground text-lg font-semibold tracking-tight">
        {heading}
      </h2>
      <ul className="flex flex-col gap-2">
        {codes.map((entry) => (
          <li
            key={`${entry.pool}-${entry.code}`}
            className={cn(
              "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4",
              "lg:bg-background/70 lg:border-border/60 lg:rounded-2xl lg:border lg:p-4"
            )}
          >
            <div className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {content.poolLabels[entry.pool]}
              </span>
              <code className="text-foreground truncate font-mono text-sm">
                {entry.code}
              </code>
            </div>
            <CodeAction code={entry.code} content={content} />
          </li>
        ))}
      </ul>
    </div>
  )
}

const codeActionClassName = cn(
  homePillClassName,
  "h-9 w-full shrink-0 px-4 text-xs sm:w-auto"
)

function getHttpUrl(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) {
    return null
  }

  try {
    const url = new URL(trimmed)
    if (url.protocol === "http:" || url.protocol === "https:") {
      return url.href
    }
    return null
  } catch {
    // Bare host paths (e.g. chatgpt.com/codex/p/...) are openable links.
    try {
      const url = new URL(`https://${trimmed}`)
      if (!url.hostname.includes(".")) {
        return null
      }
      return url.href
    } catch {
      return null
    }
  }
}

function CodeAction({
  code,
  content,
}: {
  code: string
  content: RedeemContent
}) {
  const href = getHttpUrl(code)

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={codeActionClassName}
      >
        {content.openCode}
      </a>
    )
  }

  return <CopyButton code={code} content={content} />
}

function CopyButton({
  code,
  content,
}: {
  code: string
  content: RedeemContent
}) {
  const [copied, setCopied] = useState(false)

  async function onCopy() {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success(content.copied)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      type="button"
      className={codeActionClassName}
      onClick={() => void onCopy()}
    >
      {copied ? content.copied : content.copyCode}
    </button>
  )
}

function StatusInline({ title, body }: { title: string; body: string }) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-foreground font-medium">{title}</h2>
      <p className="text-muted-foreground text-sm">{body}</p>
    </div>
  )
}
