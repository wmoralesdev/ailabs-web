import { cn } from "@/lib/utils"
import {
  TRANSITION_MS,
  useHomeMediaCarousel,
} from "@/components/home/hooks/use-home-media-carousel"

type HomeMediaCarouselProps = {
  images: ReadonlyArray<string>
  alt: string
  intervalMs?: number
  className?: string
  imgClassName?: string
}

function HomeMediaCarousel({
  images,
  alt,
  intervalMs,
  className,
  imgClassName,
}: HomeMediaCarouselProps) {
  const {
    index,
    animate,
    displayIndex,
    trackImages,
    logicalCount,
    loadedThrough,
    markLoaded,
  } = useHomeMediaCarousel(images, intervalMs)
  const loopClone = logicalCount > 1 ? trackImages.length - 1 : -1

  if (images.length === 0) {
    return null
  }

  return (
    <div
      className={cn("absolute inset-0", className)}
      aria-roledescription="carousel"
      aria-label={alt}
    >
      <div className="absolute inset-0 z-1 overflow-hidden">
        <div
          className={cn(
            "flex h-full",
            animate && "transition-transform ease-in-out"
          )}
          style={{
            width: `${trackImages.length * 100}%`,
            transform: `translate3d(-${(index / trackImages.length) * 100}%, 0, 0)`,
            transitionDuration: animate ? `${TRANSITION_MS}ms` : "0ms",
          }}
        >
          {trackImages.map((src, slideIndex) => (
            <div
              key={`${src}-${slideIndex}`}
              className="relative h-full shrink-0"
              style={{ width: `${100 / trackImages.length}%` }}
              aria-hidden={slideIndex !== displayIndex}
            >
              {slideIndex <= loadedThrough || slideIndex === loopClone ? (
                <img
                  src={src}
                  alt={slideIndex === displayIndex ? alt : ""}
                  // The first slide (and its loop clone, same file) waits for
                  // the viewport. Later slides mount one step ahead of their
                  // turn, so they load eagerly; clipped slides never
                  // intersect, and native lazy loading would leave a gap.
                  loading={
                    slideIndex === 0 || slideIndex === loopClone
                      ? "lazy"
                      : "eager"
                  }
                  decoding="async"
                  onLoad={() => markLoaded(slideIndex)}
                  className={cn(
                    "absolute inset-0 size-full object-cover",
                    imgClassName
                  )}
                  draggable={false}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {logicalCount > 1 ? (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-1.5"
          aria-hidden="true"
        >
          {images.map((src, slideIndex) => (
            <span
              key={src}
              className={cn(
                "h-1.5 rounded-full",
                slideIndex === displayIndex
                  ? "w-4 bg-on-dark"
                  : "w-1.5 bg-on-dark/40"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}

export { HomeMediaCarousel }
