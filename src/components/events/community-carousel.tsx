import { useEffect, useState } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import type { IconSvgElement } from "@hugeicons/react"
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { EventsIndexContent } from "@/content/types"
import { cn } from "@/lib/utils"

const GLIDE_EASE = "cubic-bezier(0.165, 0.84, 0.44, 1)"

const controlClassName =
  "inline-flex size-11 min-h-11 min-w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-background text-foreground shadow-sm ring-1 ring-foreground/15 transition-colors duration-200 hover:ring-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"

const POSE: Array<React.CSSProperties> = [
  {
    transform: "translateZ(-56px) rotateY(35deg)",
    transformOrigin: "right center",
  },
  {
    transform: "translateZ(28px)",
    transformOrigin: "center center",
  },
  {
    transform: "translateZ(-56px) rotateY(-35deg)",
    transformOrigin: "left center",
  },
]

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")
}

function mod(value: number, count: number): number {
  return ((value % count) + count) % count
}

function prefersReducedMotion(): boolean {
  return (
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  )
}

function CarouselControl({
  label,
  icon,
  className,
  onClick,
}: {
  label: string
  icon: IconSvgElement
  className?: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={cn(controlClassName, className)}
      aria-label={label}
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

function PhotoFigure({
  src,
  alt,
  active,
}: {
  src: string
  alt: string
  active: boolean
}) {
  return (
    <div
      className="relative aspect-[3/2] w-full"
      style={{ perspective: "1100px" }}
    >
      <div
        className="absolute inset-0 flex items-stretch gap-3 sm:gap-4"
        style={{ transformStyle: "preserve-3d" }}
      >
        {POSE.map((pose, part) => (
          <div
            key={part}
            className="relative min-w-0 flex-1 overflow-hidden bg-muted shadow-[0_18px_40px_rgba(26,26,26,0.16)]"
            style={pose}
          >
            <img
              src={src}
              alt={active && part === 1 ? alt : ""}
              width={1600}
              height={1067}
              loading={active ? "eager" : "lazy"}
              decoding="async"
              draggable={false}
              className="absolute top-0 h-full max-w-none object-cover"
              style={{ width: "300%", left: `${-part * 100}%` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function CommunityCarousel({ copy }: { copy: EventsIndexContent }) {
  const photos = copy.photos
  const count = photos.length
  const [position, setPosition] = useState(1)
  const [instant, setInstant] = useState(false)
  const [status, setStatus] = useState("")

  useEffect(() => {
    if (!instant) {
      return
    }
    const id = window.requestAnimationFrame(() => setInstant(false))
    return () => window.cancelAnimationFrame(id)
  }, [instant])

  if (count === 0) {
    return null
  }

  const track = [
    { photo: photos[count - 1], key: `${photos[count - 1].src}-before` },
    ...photos.map((photo) => ({ photo, key: photo.src })),
    { photo: photos[0], key: `${photos[0].src}-after` },
  ]

  function announce(nextPosition: number) {
    const photo = photos[mod(nextPosition - 1, count)]
    setStatus(
      `${fill(copy.photoStatus, {
        current: String(mod(nextPosition - 1, count) + 1),
        total: String(count),
      })}. ${photo.alt}`
    )
  }

  function step(delta: number) {
    if (prefersReducedMotion()) {
      const next = mod(position - 1 + delta, count) + 1
      setInstant(true)
      setPosition(next)
      announce(next)
      return
    }
    const next = position + delta
    setPosition(next)
    announce(next)
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

  return (
    <section
      aria-labelledby="events-photos"
      aria-roledescription="carousel"
      className="flex flex-col gap-4"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault()
          step(-1)
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          step(1)
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
        <div className="overflow-hidden py-6">
          <div
            className={cn(
              "flex",
              instant
                ? "transition-none"
                : "transition-transform duration-[400ms] motion-reduce:transition-none"
            )}
            style={{
              transform: `translate3d(${-position * 100}%, 0, 0)`,
              transitionTimingFunction: instant ? undefined : GLIDE_EASE,
            }}
            onTransitionEnd={settle}
          >
            {track.map((slide, slideIndex) => (
              <div
                key={slide.key}
                className="w-full shrink-0 grow-0 basis-full px-3 sm:px-8"
                role="group"
                aria-roledescription="slide"
                aria-hidden={slideIndex === position ? undefined : true}
                aria-label={fill(copy.photoStatus, {
                  current: String(mod(slideIndex - 1, count) + 1),
                  total: String(count),
                })}
              >
                <PhotoFigure
                  src={slide.photo.src}
                  alt={slide.photo.alt}
                  active={slideIndex === position}
                />
              </div>
            ))}
          </div>
        </div>
        <CarouselControl
          label={copy.previousPhoto}
          icon={ArrowLeft01Icon}
          className="absolute top-1/2 left-3 z-20 -translate-y-1/2"
          onClick={() => step(-1)}
        />
        <CarouselControl
          label={copy.nextPhoto}
          icon={ArrowRight01Icon}
          className="absolute top-1/2 right-3 z-20 -translate-y-1/2"
          onClick={() => step(1)}
        />
      </div>
      <p className="sr-only" aria-live="polite">
        {status}
      </p>
    </section>
  )
}

export { CommunityCarousel }
