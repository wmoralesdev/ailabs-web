import { useRef } from "react"
import type { ComponentPropsWithoutRef, ElementType } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP)

type RevealProps<T extends ElementType> = {
  as?: T
} & ComponentPropsWithoutRef<T>

/**
 * Choreographs a section's entrance, once, as it enters the viewport:
 *  - [data-reveal]        rises 24px and fades in, staggered in reading order
 *  - [data-reveal="clip"] opens from the bottom like a shutter
 * Content is server-rendered and visible without JavaScript; reduced motion
 * skips the travel entirely.
 */
function Reveal<T extends ElementType = "div">({
  as,
  children,
  ...props
}: RevealProps<T>) {
  // Typed as a div so the ref and props type-check for any intrinsic tag.
  const Tag = (as ?? "div") as "div"
  const root = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const el = root.current
      if (!el || typeof window.matchMedia !== "function") return
      // Registered here, not at import: ScrollTrigger reads matchMedia on
      // registration, which test and server environments lack.
      gsap.registerPlugin(ScrollTrigger)
      const media = gsap.matchMedia()

      media.add("(prefers-reduced-motion: no-preference)", () => {
        const rise = gsap.utils.toArray<HTMLElement>(
          "[data-reveal]:not([data-reveal='clip'])",
          el
        )
        if (rise.length) {
          gsap.from(rise, {
            y: 24,
            opacity: 0,
            duration: 0.85,
            ease: "expo.out",
            stagger: 0.075,
            clearProps: "transform,opacity",
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          })
        }

        for (const pic of gsap.utils.toArray<HTMLElement>(
          "[data-reveal='clip']",
          el
        )) {
          gsap.fromTo(
            pic,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.2,
              ease: "power4.inOut",
              clearProps: "clipPath",
              scrollTrigger: { trigger: pic, start: "top 88%", once: true },
            }
          )
        }
      })

      return () => media.revert()
    },
    { scope: root }
  )

  return (
    <Tag ref={root} {...props}>
      {children}
    </Tag>
  )
}

export { Reveal }
