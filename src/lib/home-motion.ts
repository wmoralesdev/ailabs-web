import type { RefObject } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP)

export const HOME_MOTION = {
  hero: { duration: 0.7, stagger: 0.035, y: 28 },
  services: { duration: 0.6, stagger: 0.08, y: 24 },
  detail: { duration: 0.45, stagger: 0.07, y: 12 },
  visual: { duration: 0.4, step: 0.3, y: 12 },
  ease: "power3.out",
} as const

type HomeEntrance = "hero" | "services" | "method"

function heroEntrance(root: HTMLElement) {
  const parts = [...root.querySelectorAll<HTMLElement>("[data-home-entrance]")]
  const words = root.querySelectorAll<HTMLElement>("[data-home-word]")
  const headline = root.querySelector("h1")
  const timeline = gsap.timeline({ defaults: { ease: HOME_MOTION.ease } })
  if (parts[0]) {
    timeline.fromTo(
      parts[0],
      { y: 12, opacity: 0.6 },
      {
        y: 0,
        opacity: 1,
        duration: 0.45,
        clearProps: "transform,opacity",
      },
      0
    )
  }
  timeline.fromTo(
    words,
    { y: HOME_MOTION.hero.y, opacity: 0.6 },
    {
      y: 0,
      opacity: 1,
      duration: HOME_MOTION.hero.duration,
      stagger: HOME_MOTION.hero.stagger,
      clearProps: "transform,opacity",
    },
    0.06
  )
  timeline.fromTo(
    parts.filter((part) => part !== parts[0] && part !== headline),
    { y: 18, opacity: 0.6 },
    {
      y: 0,
      opacity: 1,
      duration: 0.55,
      stagger: 0.09,
      clearProps: "transform,opacity",
    },
    0.3
  )
}

function serviceEntrance(target: HTMLElement, delay: number) {
  const parts = target.querySelectorAll<HTMLElement>(
    "[data-service-part]:not([data-home-visual])"
  )
  gsap
    .timeline({ delay, defaults: { ease: HOME_MOTION.ease } })
    .fromTo(
      target,
      { y: HOME_MOTION.services.y, opacity: 0.7 },
      {
        y: 0,
        opacity: 1,
        duration: HOME_MOTION.services.duration,
        clearProps: "transform,opacity",
      },
      0
    )
    .fromTo(
      parts,
      { y: HOME_MOTION.detail.y, opacity: 0.7 },
      {
        y: 0,
        opacity: 1,
        duration: HOME_MOTION.detail.duration,
        stagger: HOME_MOTION.detail.stagger,
        clearProps: "transform,opacity",
      },
      0.06
    )
}

/** Each diagram triggers on its own: it must not finish below the fold. */
function visualEntrance(target: HTMLElement) {
  const nodes = target.querySelectorAll<HTMLElement>("[data-visual-node]")
  const connectors = target.querySelectorAll<SVGElement>(
    "[data-visual-connector]"
  )
  const timeline = gsap.timeline({ defaults: { ease: HOME_MOTION.ease } })
  nodes.forEach((node, index) => {
    const at = index * HOME_MOTION.visual.step
    timeline.fromTo(
      node,
      { y: HOME_MOTION.visual.y, scale: 0.9, opacity: 0 },
      {
        y: 0,
        scale: 1,
        opacity: 1,
        duration: HOME_MOTION.visual.duration,
        clearProps: "transform,opacity",
      },
      at
    )
  })
  connectors.forEach((connector, index) => {
    timeline.fromTo(
      connector,
      { scaleX: 0, opacity: 0.3 },
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.38,
        clearProps: "transform,opacity",
      },
      index * HOME_MOTION.visual.step + 0.17
    )
  })
}

function methodEntrance(target: HTMLElement) {
  const icon = target.querySelector("h3 svg")
  if (!icon) return
  gsap.fromTo(
    icon,
    { y: 10, scale: 0.9, opacity: 0.25 },
    {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.5,
      ease: HOME_MOTION.ease,
      clearProps: "transform,opacity",
    }
  )
}

/** SSR stays visible. Only visible targets animate, once per mounted page. */
export function useHomeEntrance(
  scope: RefObject<HTMLElement | null>,
  kind: HomeEntrance,
  contentKey: string
) {
  useGSAP(
    () => {
      const root = scope.current
      if (!root || typeof window.matchMedia !== "function") return
      const seen = new Set<Element>()
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", (context) => {
        if (kind === "hero") {
          if (!seen.has(root)) {
            seen.add(root)
            heroEntrance(root)
          }
          return
        }
        if (typeof window.IntersectionObserver !== "function") return
        let disposed = false
        const cards = [
          ...root.querySelectorAll<HTMLElement>("[data-home-entrance]"),
        ]
        const visuals = [
          ...root.querySelectorAll<HTMLElement>("[data-home-visual]"),
        ]
        const desktop = window.matchMedia("(min-width: 1024px)")
        const observer = new IntersectionObserver(
          (entries) => {
            if (disposed) return
            for (const entry of entries) {
              if (!entry.isIntersecting || seen.has(entry.target)) continue
              const target = entry.target as HTMLElement
              seen.add(target)
              observer.unobserve(target)
              context.add(() => {
                if (target.hasAttribute("data-home-visual")) {
                  visualEntrance(target)
                } else if (kind === "method") {
                  methodEntrance(target)
                } else {
                  serviceEntrance(
                    target,
                    desktop.matches
                      ? cards.indexOf(target) * HOME_MOTION.services.stagger
                      : 0
                  )
                }
              })
            }
          },
          { threshold: 0, rootMargin: "0px 0px -16% 0px" }
        )
        for (const target of [...cards, ...visuals]) observer.observe(target)
        return () => {
          disposed = true
          observer.disconnect()
        }
      })
      return () => media.revert()
    },
    { scope, dependencies: [kind, contentKey], revertOnUpdate: true }
  )
}
