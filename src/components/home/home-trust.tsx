import { useLayoutEffect, useRef, useState } from "react"
import type { ReactNode } from "react"

import { MistralLogo } from "@/components/logos/mistral"
import { NotionLogo } from "@/components/logos/notion"
import { HomePaperArcs } from "@/components/home/home-paper-arcs"
import {
  homePaperBandClassName,
  homeShellClassName,
} from "@/components/home/home-styles"
import { Eyebrow } from "@/components/ui/eyebrow"
import type { HomeTrustContent, TrustLogoId } from "@/content/types"
import { cn } from "@/lib/utils"

const logoClassName = "h-5 w-auto shrink-0"
const iconLockupClassName = "h-5 w-auto shrink-0 text-on-dark"

const trustLogoListClassName =
  "flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14"

/** Light-ink asset for the purple paper band. */
function LightBrandLogo({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  return <img src={src} alt="" className={className} />
}

/** White lockup SVG kept light on the violet band. */
function MonoBrandLogo({
  src,
  className,
}: {
  src: string
  className?: string
}) {
  return <img src={src} alt="" className={className} />
}

/** Fallback lockup when we only have an Elements isotype. */
function IconWordLockup({
  name,
  children,
}: {
  name: string
  children: ReactNode
}) {
  return (
    <span className="flex items-center gap-2">
      {children}
      <span className="text-on-dark text-[15px] font-medium tracking-tight">
        {name}
      </span>
    </span>
  )
}

function TrustLogoMark({ id, name }: { id: TrustLogoId; name: string }) {
  switch (id) {
    case "cursor":
      return (
        <LightBrandLogo
          src="/brand/cursor-light.svg"
          className={logoClassName}
        />
      )
    case "codex":
      // Codex artwork sits shorter in its viewBox than the other lockups.
      return (
        <MonoBrandLogo src="/brand/codex.svg" className="h-7 w-auto shrink-0" />
      )
    case "openai":
      return <MonoBrandLogo src="/brand/openai.svg" className={logoClassName} />
    case "claude":
      return (
        <LightBrandLogo
          src="/brand/claude-light.svg"
          className={logoClassName}
        />
      )
    case "mistral":
      return (
        <IconWordLockup name={name}>
          <MistralLogo className={iconLockupClassName} />
        </IconWordLockup>
      )
    case "elevenlabs":
      return (
        <MonoBrandLogo src="/brand/elevenlabs.svg" className={logoClassName} />
      )
    case "notion":
      return (
        <IconWordLockup name={name}>
          <NotionLogo className={iconLockupClassName} />
        </IconWordLockup>
      )
    default: {
      const _exhaustive: never = id
      return _exhaustive
    }
  }
}

function TrustLogoList({
  logos,
  keyPrefix,
  ariaHidden = false,
  wrap = false,
  repeat = 1,
}: {
  logos: HomeTrustContent["logos"]
  keyPrefix: string
  ariaHidden?: boolean
  wrap?: boolean
  repeat?: number
}) {
  const items = Array.from({ length: repeat }, (_, setIndex) =>
    logos.map((logo) => ({
      logo,
      key: `${keyPrefix}-${setIndex}-${logo.id}`,
    }))
  ).flat()

  return (
    <ul
      className={cn(
        trustLogoListClassName,
        wrap && "flex-wrap justify-center pr-0 md:pr-0"
      )}
      aria-hidden={ariaHidden || undefined}
    >
      {items.map(({ logo, key }) => (
        <li
          key={key}
          className="flex items-center opacity-70 transition-opacity motion-safe:hover:opacity-100"
        >
          {!ariaHidden ? <span className="sr-only">{logo.name}</span> : null}
          <span aria-hidden="true" className="flex items-center">
            <TrustLogoMark id={logo.id} name={logo.name} />
          </span>
        </li>
      ))}
    </ul>
  )
}

type HomeTrustProps = {
  trust: HomeTrustContent
}

function HomeTrust({ trust }: HomeTrustProps) {
  const marqueeRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLUListElement>(null)
  const [setsPerHalf, setSetsPerHalf] = useState(1)

  useLayoutEffect(() => {
    const marquee = marqueeRef.current
    const measure = measureRef.current
    if (!marquee || !measure) return

    const update = () => {
      const setWidth = measure.offsetWidth
      const containerWidth = marquee.clientWidth
      if (setWidth <= 0 || containerWidth <= 0) return
      // Each animated half must be at least as wide as the viewport strip.
      setSetsPerHalf(Math.max(1, Math.ceil(containerWidth / setWidth)))
    }

    update()
    const ro = new ResizeObserver(update)
    ro.observe(marquee)
    ro.observe(measure)
    return () => ro.disconnect()
  }, [trust.logos])

  return (
    <section
      id="trust"
      aria-label={trust.label}
      className={cn(homePaperBandClassName, "py-8 md:py-10")}
    >
      <HomePaperArcs />
      <div
        className={cn(
          homeShellClassName,
          "relative z-[1] flex flex-col gap-5"
        )}
      >
        <Eyebrow tone="onDark">{trust.label}</Eyebrow>
        <div ref={marqueeRef} className="home-trust-marquee">
          <ul
            ref={measureRef}
            className={cn(trustLogoListClassName, "home-trust-marquee-measure")}
            aria-hidden="true"
          >
            {trust.logos.map((logo) => (
              <li key={`measure-${logo.id}`} className="flex items-center">
                <span className="flex items-center">
                  <TrustLogoMark id={logo.id} name={logo.name} />
                </span>
              </li>
            ))}
          </ul>
          <div className="home-trust-marquee-track">
            <TrustLogoList
              logos={trust.logos}
              keyPrefix="a"
              repeat={setsPerHalf}
            />
            <TrustLogoList
              logos={trust.logos}
              keyPrefix="b"
              ariaHidden
              repeat={setsPerHalf}
            />
          </div>
          <div className="home-trust-marquee-static">
            <TrustLogoList logos={trust.logos} keyPrefix="static" wrap />
          </div>
        </div>
      </div>
    </section>
  )
}

export { HomeTrust }
