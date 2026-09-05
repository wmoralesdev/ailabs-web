import { useEffect, useRef, useState } from "react"
import type { CSSProperties, ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { PauseIcon, PlayIcon } from "@hugeicons/core-free-icons"

import { MistralLogo } from "@/components/logos/mistral"
import { NotionLogo } from "@/components/logos/notion"
import { homeShellClassName } from "@/components/home/home-styles"
import type { HomeTrustContent, TrustLogoId } from "@/content/types"
import { cn } from "@/lib/utils"

const PIXELS_PER_SECOND = 42

function BrandAsset({ src, codex = false }: { src: string; codex?: boolean }) {
  return (
    <img
      src={src}
      alt=""
      className={cn("home-trust-logo", codex && "home-trust-logo-codex")}
      draggable={false}
    />
  )
}

function IconWordLockup({
  name,
  children,
}: {
  name: string
  children: ReactNode
}) {
  return (
    <span className="home-trust-lockup">
      {children}
      <span>{name}</span>
    </span>
  )
}

function TrustLogoMark({ id, name }: { id: TrustLogoId; name: string }) {
  switch (id) {
    case "spacexai":
      return <BrandAsset src="/brand/spacexai-light.svg" />
    case "codex":
      return <BrandAsset src="/brand/codex.svg" codex />
    case "openai":
      return <BrandAsset src="/brand/openai.svg" />
    case "claude":
      return <BrandAsset src="/brand/claude-light.svg" />
    case "mistral":
      return (
        <IconWordLockup name={name}>
          <MistralLogo className="size-6 shrink-0" />
        </IconWordLockup>
      )
    case "elevenlabs":
      return <BrandAsset src="/brand/elevenlabs.svg" />
    case "notion":
      return (
        <IconWordLockup name={name}>
          <NotionLogo className="size-6 shrink-0" />
        </IconWordLockup>
      )
    default: {
      const exhaustive: never = id
      return exhaustive
    }
  }
}

function TrustLogoList({
  logos,
  decorative = false,
  className,
  listRef,
  tabIndex,
}: {
  logos: HomeTrustContent["logos"]
  decorative?: boolean
  className?: string
  listRef?: React.Ref<HTMLUListElement>
  tabIndex?: number
}) {
  return (
    <ul
      ref={listRef}
      className={cn("home-trust-logo-list", className)}
      aria-hidden={decorative || undefined}
      tabIndex={tabIndex}
    >
      {logos.map((logo) => (
        <li key={logo.id} className="home-trust-logo-slot">
          {!decorative && <span className="sr-only">{logo.name}</span>}
          <span aria-hidden="true">
            <TrustLogoMark id={logo.id} name={logo.name} />
          </span>
        </li>
      ))}
    </ul>
  )
}

type HomeTrustProps = { trust: HomeTrustContent }

function HomeTrust({ trust }: HomeTrustProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLUListElement>(null)
  const [layout, setLayout] = useState({ sets: 1, duration: 0 })
  const [motionAllowed, setMotionAllowed] = useState(false)
  const [environmentPaused, setEnvironmentPaused] = useState(true)
  const [userPaused, setUserPaused] = useState(false)
  const ready = motionAllowed && layout.duration > 0

  useEffect(() => {
    const marquee = marqueeRef.current
    const measure = measureRef.current
    if (!marquee || !measure || typeof window.matchMedia !== "function") return

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    let inViewport = typeof IntersectionObserver !== "function"
    const syncPlayback = () => {
      setMotionAllowed(!media.matches)
      setEnvironmentPaused(!inViewport || document.visibilityState === "hidden")
    }
    const measureLayout = () => {
      const width = measure.getBoundingClientRect().width
      const viewport = marquee.clientWidth
      if (width <= 0 || viewport <= 0) return
      const sets = Math.max(1, Math.ceil(viewport / width))
      const duration = (width * sets) / PIXELS_PER_SECOND
      setLayout((previous) =>
        previous.sets === sets && previous.duration === duration
          ? previous
          : { sets, duration }
      )
    }

    measureLayout()
    syncPlayback()
    const resizeObserver =
      typeof ResizeObserver === "function"
        ? new ResizeObserver(measureLayout)
        : null
    resizeObserver?.observe(marquee)
    resizeObserver?.observe(measure)
    const viewportObserver =
      typeof IntersectionObserver === "function"
        ? new IntersectionObserver((entries) => {
            inViewport = entries.some((entry) => entry.isIntersecting)
            syncPlayback()
          })
        : null
    viewportObserver?.observe(marquee)
    window.addEventListener("resize", measureLayout)
    document.addEventListener("visibilitychange", syncPlayback)
    media.addEventListener("change", syncPlayback)

    return () => {
      resizeObserver?.disconnect()
      viewportObserver?.disconnect()
      window.removeEventListener("resize", measureLayout)
      document.removeEventListener("visibilitychange", syncPlayback)
      media.removeEventListener("change", syncPlayback)
    }
  }, [trust.logos])

  return (
    <section
      id="trust"
      aria-label={trust.label}
      className="home-trust py-6 md:py-7"
      data-ready={ready || undefined}
      data-paused={userPaused || environmentPaused || undefined}
    >
      <div className={homeShellClassName}>
        <div className="flex min-h-11 items-center justify-between gap-4">
          <p className="max-w-prose text-sm font-medium text-on-dark/85">
            {trust.label}
          </p>
          <button
            type="button"
            className="home-trust-control"
            hidden={!ready}
            onClick={() => setUserPaused((paused) => !paused)}
            aria-label={userPaused ? trust.resume : trust.pause}
            title={userPaused ? trust.resume : trust.pause}
          >
            <HugeiconsIcon
              icon={userPaused ? PlayIcon : PauseIcon}
              className="size-4"
              aria-hidden="true"
            />
          </button>
        </div>
        <div ref={marqueeRef} className="home-trust-marquee">
          <TrustLogoList
            logos={trust.logos}
            decorative
            listRef={measureRef}
            className="home-trust-marquee-measure"
          />
          <TrustLogoList
            logos={trust.logos}
            className="home-trust-marquee-static"
            tabIndex={ready ? -1 : 0}
          />
          <div
            className="home-trust-marquee-track"
            aria-hidden="true"
            style={
              { "--trust-duration": `${layout.duration}s` } as CSSProperties
            }
          >
            {["first", "duplicate"].map((half) => (
              <div key={half} className="home-trust-marquee-half">
                {Array.from({ length: layout.sets }, (_, index) => (
                  <TrustLogoList
                    key={`${half}-${index}`}
                    logos={trust.logos}
                    decorative
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export { HomeTrust }
export type { HomeTrustProps }
