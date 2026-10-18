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

const controlClassName =
  "inline-flex size-11 min-h-11 min-w-11 cursor-pointer touch-manipulation items-center justify-center rounded-full bg-card text-foreground ring-1 ring-foreground/15 transition-colors duration-200 hover:ring-foreground/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground motion-reduce:transition-none"

function fill(template: string, values: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")
}

function CarouselControl({
  label,
  icon,
  pressed,
  onClick,
}: {
  label: string
  icon: IconSvgElement
  pressed?: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      className={controlClassName}
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
  const [index, setIndex] = useState(0)
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
    if (paused || count < 2) {
      return
    }
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % count)
    }, 6000)
    return () => window.clearInterval(id)
  }, [paused, count])

  function goTo(next: number, fromUser: boolean) {
    if (count === 0) {
      return
    }
    const wrapped = (next + count) % count
    setIndex(wrapped)
    if (!fromUser) {
      return
    }
    setPaused(true)
    const photo = photos[wrapped]
    setStatus(
      `${fill(copy.photoStatus, {
        current: String(wrapped + 1),
        total: String(count),
      })}. ${photo.alt}`
    )
  }

  if (count === 0) {
    return null
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
          goTo(index - 1, true)
        } else if (event.key === "ArrowRight") {
          event.preventDefault()
          goTo(index + 1, true)
        }
      }}
    >
      <h2
        id="events-photos"
        className="font-display text-2xl font-semibold tracking-tight text-foreground"
      >
        {copy.photosLabel}
      </h2>
      <div className="overflow-hidden rounded-2xl bg-card">
        <div
          className="flex transition-transform duration-200 ease-out motion-reduce:transition-none"
          style={{ transform: `translate3d(-${index * 100}%, 0, 0)` }}
        >
          {photos.map((photo, photoIndex) => {
            const active = photoIndex === index
            return (
              <div
                key={photo.src}
                className="w-full shrink-0 grow-0 basis-full"
                role="group"
                aria-roledescription="slide"
                aria-hidden={active ? undefined : true}
                aria-label={fill(copy.photoStatus, {
                  current: String(photoIndex + 1),
                  total: String(count),
                })}
              >
                <img
                  src={photo.src}
                  alt={active ? photo.alt : ""}
                  width={1600}
                  height={1067}
                  loading={active ? "eager" : "lazy"}
                  decoding="async"
                  draggable={false}
                  className="aspect-[3/2] w-full object-cover"
                />
              </div>
            )
          })}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <CarouselControl
          label={copy.previousPhoto}
          icon={ArrowLeft01Icon}
          onClick={() => goTo(index - 1, true)}
        />
        <CarouselControl
          label={playing ? copy.pausePhotos : copy.playPhotos}
          icon={playing ? PauseIcon : PlayIcon}
          pressed={!playing}
          onClick={() => setPaused((current) => !current)}
        />
        <CarouselControl
          label={copy.nextPhoto}
          icon={ArrowRight01Icon}
          onClick={() => goTo(index + 1, true)}
        />
        <p aria-hidden="true" className="px-2 text-base text-foreground">
          {index + 1} / {count}
        </p>
        <p className="sr-only" aria-live="polite">
          {status}
        </p>
      </div>
      <div className="flex flex-wrap gap-1">
        {photos.map((photo, photoIndex) => {
          const active = photoIndex === index
          return (
            <button
              key={photo.src}
              type="button"
              className={controlClassName}
              aria-label={photo.alt}
              aria-current={active ? "true" : undefined}
              onClick={() => goTo(photoIndex, true)}
            >
              <span
                aria-hidden="true"
                className={
                  active
                    ? "h-1.5 w-4 rounded-full bg-foreground"
                    : "h-1.5 w-1.5 rounded-full bg-foreground/40"
                }
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}

export { CommunityCarousel }
