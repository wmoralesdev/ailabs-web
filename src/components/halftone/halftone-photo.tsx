import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

type HalftonePhotoProps = {
  /** File name in public/carousel, with a matching mask in public/halftone. */
  name: string
  alt: string
  width: number
  height: number
  sizes: string
  className?: string
  /** Field and ink classes: the dots take the text colour. */
  tone?: string
  priority?: boolean
  /** Fill the positioned parent instead of sizing from the photo. */
  fill?: boolean
  /** Develop into the real photo on hover (or mid-screen on touch). */
  develop?: boolean
}

/**
 * A real Ai Labs event photo printed as halftone. On hover (or, on touch
 * screens, while it sits in the middle of the screen) the dots develop into
 * the photograph. Masks come from `pnpm halftone`.
 */
function HalftonePhoto({
  name,
  alt,
  width,
  height,
  sizes,
  className,
  tone = "bg-print text-on-purple",
  priority = false,
  fill = false,
  develop = true,
}: HalftonePhotoProps) {
  const ref = useRef<HTMLElement>(null)
  const [developed, setDeveloped] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (
      !develop ||
      !el ||
      typeof window.matchMedia !== "function" ||
      typeof IntersectionObserver !== "function" ||
      !window.matchMedia("(hover: none)").matches
    ) {
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => setDeveloped(Boolean(entry?.isIntersecting)),
      { rootMargin: "-42% 0px -42% 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [develop])

  return (
    <figure
      ref={ref}
      data-developed={developed || undefined}
      className={cn(
        "group/photo overflow-clip",
        fill ? "absolute inset-0" : "relative",
        tone,
        className
      )}
      style={fill ? undefined : { aspectRatio: `${width} / ${height}` }}
    >
      <img
        src={`/carousel/${name}`}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={cn(
          "absolute inset-0 size-full object-cover opacity-0",
          develop &&
            "scale-[1.04] blur-[2px] transition-[opacity,transform,filter] duration-500 ease-(--ease-out) group-hover/photo:scale-100 group-hover/photo:opacity-100 group-hover/photo:blur-none group-data-developed/photo:scale-100 group-data-developed/photo:opacity-100 group-data-developed/photo:blur-none"
        )}
      />
      <div
        aria-hidden="true"
        style={{ "--ht": `url(/halftone/${name})` } as React.CSSProperties}
        className={cn(
          "halftone absolute inset-0 bg-current",
          develop &&
            "transition-opacity duration-500 ease-(--ease-out) group-hover/photo:opacity-0 group-data-developed/photo:opacity-0"
        )}
      />
    </figure>
  )
}

export { HalftonePhoto }
export type { HalftonePhotoProps }
