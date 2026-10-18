import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  PauseIcon,
  PlayIcon,
} from "@hugeicons/core-free-icons"

import type { EventsIndexContent } from "@/content/types"
import { cn } from "@/lib/utils"

const GLIDE_EASE = "cubic-bezier(0.165, 0.84, 0.44, 1)"

const controlClassName =
  "inline-flex size-11 min-h-11 min-w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-background text-foreground shadow-sm ring-1 ring-foreground/15 transition-colors duration-200 hover:ring-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")
}

function mod(value: number, count: number): number {
  return ((value % count) + count) % count
}

function CarouselControl({
  label,
  icon,
  pressed,
  className,
  onClick,
}: {
  label: string
  icon: IconSvgElement
  pressed?: boolean
  className?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={cn(controlClassName, className)}
      aria-label={label}
      aria-pressed={pressed}
      onClick={onClick}
    >
      <HugeiconsIcon
        icon={icon}
        strokeWidth={1.75}
        className="size-5"
        aria-hidden
      />
    </button>
  )
}

function CommunityCarousel({ copy }: { copy: EventsIndexContent }) {
  const photos = copy.photos
  const count = photos.length
  const [position, setPosition] = useState(1)
  const [instant, setInstant] = useState(false)
  const [paused, setPaused] = useState(false)
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return
    }
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const sync = () => {
      if (media.matches) {
        setPaused(true)
      }
    }
    sync()
    media.addEventListener("change", sync)
    return () => media.removeEventListener("change", sync)
  }, [])

  useEffect(() => {
    if (!instant) {
      return
    }
    const id = window.requestAnimationFrame(() => {
      setInstant(false)
    })
    return () => window.cancelAnimationFrame(id)
  }, [instant])

  useEffect(() => {
    if (paused || count < 2) {
      return
    }
    const id = window.setInterval(() => {
      setPosition((current) => current + 1)
    }, 6000)
    return () => window.clearInterval(id)
  }, [paused, count])

  if (count === 0) {
    return null
  }

  const before = photos[count - 1]
  const after = photos[0]
  const track = [
    { photo: before, key: `${before.src}-before` },
    ...photos.map((photo) => ({ photo, key: photo.src })),
    { photo: after, key: `${after.src}-after` },
  ]

  function step(delta: number, fromUser: boolean) {
    const next = position + delta
    setPosition(next)
    if (!fromUser) {
      return
    }
    setPaused(true)
    const photo = photos[mod(next - 1, count)]
    setStatus(
      `${fill(copy.photoStatus, {
        current: String(mod(next - 1, count) + 1),
        total: String(count),
      })}. ${photo.alt}`
    )
  }

  function settle(event: React.TransitionEvent<HTMLDivElement>) {
    if (event.target !== event.currentTarget) {
      return
    }
    if (event.propertyName !== "transform") {
      return
    }
    if (position === 0) {
      setInstant(true)
      setPosition(count)
      return
    }
    if (position === count + 1) {
      setInstant(true)
      setPosition(1)
    }
  }

  const playing = !paused && count > 1

  return (
    <section
      aria-labelledby="events-photos"
      aria-roledescription="carousel"
      className="flex flex-col gap-4"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          step(-1, true)
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          step(1, true)
        }
      }}
    >
      <h2
        id="events-photos"
        className="font-display text-2xl font-semibold tracking-tight text-foreground"
      >
        {copy.photosLabel}
      </h2>
      <div className="relative">
        <div className="@container overflow-hidden py-3 [--gap:20px] [--peek:120px] max-sm:[--peek:100px]">
          <div
            className={cn(
              "flex items-stretch",
              instant
                ? "transition-none"
                : "transition-transform duration-[400ms] motion-reduce:transition-none"
            )}
            style={{
              gap: "var(--gap)",
              transitionTimingFunction: instant ? undefined : GLIDE_EASE,
              transform: `translate3d(calc(var(--peek) - ${position} * (100cqi - 2 * var(--peek) + var(--gap))), 0, 0)`,
            }}
            onTransitionEnd={settle}
          >
            {track.map((slide, slideIndex) => {
              const centered = slideIndex === position
              return (
                <div
                  key={slide.key}
                  className="w-[calc(100cqi-2*var(--peek))] shrink-0"
                  role="group"
                  aria-roledescription="slide"
                  aria-hidden={centered ? undefined : true}
                  aria-label={fill(copy.photoStatus, {
                    current: String(mod(slideIndex - 1, count) + 1),
                    total: String(count),
                  })}
                >
                  <div
                    className={cn(
                      "h-full overflow-hidden rounded-2xl bg-muted transition-[transform,opacity,box-shadow] duration-[400ms] motion-reduce:transition-none",
                      centered
                        ? "scale-[1.02] opacity-100 shadow-[0_16px_40px_rgba(26,26,26,0.18)]"
                        : "scale-100 opacity-90"
                    )}
                    style={{
                      transitionTimingFunction: GLIDE_EASE,
                    }}
                  >
                    <img
                      src={slide.photo.src}
                      alt={centered ? slide.photo.alt : ""}
                      width={1600}
                      height={1067}
                      loading="eager"
                      decoding="async"
                      draggable={false}
                      className="aspect-[3/2] w-full object-cover"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-3 flex items-center justify-center gap-3">
          <CarouselControl
            label={copy.previousPhoto}
            icon={ArrowLeft01Icon}
            className="z-10 sm:absolute sm:top-[calc(50%-1.375rem)] sm:left-3 sm:-translate-y-1/2"
            onClick={() => step(-1, true)}
          />
          <CarouselControl
            label={playing ? copy.pausePhotos : copy.playPhotos}
            icon={playing ? PauseIcon : PlayIcon}
            pressed={!playing}
            onClick={() => setPaused((current) => !current)}
          />
          <p aria-hidden="true" className="text-base text-foreground">
            {mod(position - 1, count) + 1} / {count}
          </p>
          <CarouselControl
            label={copy.nextPhoto}
            icon={ArrowRight01Icon}
            className="z-10 sm:absolute sm:top-[calc(50%-1.375rem)] sm:right-3 sm:-translate-y-1/2"
            onClick={() => step(1, true)}
          />
          <p className="sr-only" aria-live="polite">
            {status}
          </p>
        </div>
      </div>
    </section>
  )
}

export { CommunityCarousel }
