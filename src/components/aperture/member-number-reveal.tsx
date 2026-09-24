"use client"

import { useRef, useState } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"

import {
  homeDisplayClassName,
  homePillClassName,
} from "@/components/home/home-styles"
import type { ApertureJoinContent } from "@/content/types"
import { formatMemberNumber } from "@/lib/aperture/member-number"
import { cn } from "@/lib/utils"

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP)

const REVEAL_SECONDS = 0.7

export function pickRevealTreatment(number: number): "hold" | "count" {
  return number % 2 === 0 ? "hold" : "count"
}

export function MemberNumberReveal({
  number,
  content,
  treatment = pickRevealTreatment(number),
}: {
  number: number
  content: ApertureJoinContent
  treatment?: "hold" | "count"
}) {
  const root = useRef<HTMLDivElement>(null)
  const digits = useRef<HTMLParagraphElement>(null)
  const formatted = formatMemberNumber(number)
  const [display, setDisplay] = useState(formatted)

  useGSAP(
    () => {
      if (typeof window.matchMedia !== "function") {
        return
      }
      const media = gsap.matchMedia()
      media.add("(prefers-reduced-motion: no-preference)", () => {
        if (treatment === "count") {
          const state = { value: 0 }
          setDisplay(formatMemberNumber(0))
          gsap.to(state, {
            value: number,
            duration: REVEAL_SECONDS,
            ease: "power2.out",
            onUpdate: () => {
              setDisplay(formatMemberNumber(Math.round(state.value)))
            },
            onComplete: () => {
              setDisplay(formatted)
            },
          })
          return
        }
        if (!digits.current) {
          return
        }
        gsap.fromTo(
          digits.current,
          { y: 16, opacity: 0.6 },
          {
            y: 0,
            opacity: 1,
            duration: REVEAL_SECONDS,
            ease: "power3.out",
            clearProps: "transform,opacity",
          }
        )
      })
      return () => media.revert()
    },
    { scope: root, dependencies: [number, treatment, formatted] }
  )

  return (
    <div ref={root} className="flex flex-col gap-4">
      <p className="text-sm font-medium text-muted-foreground">
        {content.revealTitle}
      </p>
      <p
        ref={digits}
        className={cn(homeDisplayClassName, "leading-[0.95] tabular-nums")}
        aria-label={`#${formatted}`}
      >
        #{display}
      </p>
      <p className="max-w-md text-base leading-relaxed text-muted-foreground">
        {content.revealBody.replace("{number}", formatted)}
      </p>
      <a href="/me" className={cn(homePillClassName, "w-fit")}>
        {content.revealCta}
      </a>
    </div>
  )
}
