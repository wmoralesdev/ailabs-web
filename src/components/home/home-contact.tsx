import { useRef } from "react"
import type { PointerEvent } from "react"
import { useGSAP } from "@gsap/react"
import { gsap } from "gsap"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import type { HomeContactContent } from "@/content"
import { useContact } from "@/components/contact/contact-provider"
import { HalftoneField } from "@/components/halftone/halftone-field"

if (typeof window !== "undefined") gsap.registerPlugin(useGSAP)

/**
 * The closing band: the whole tile opens the contact dialog. A halftone tide
 * moves through the purple field, the tile turns to night on hover, and the
 * arrow leans toward the pointer.
 */
export function HomeContact({ contact }: { contact: HomeContactContent }) {
  const { openContact } = useContact()
  const arrow = useRef<HTMLSpanElement>(null)
  const lean = useRef<{
    x: (value: number) => void
    y: (value: number) => void
  } | null>(null)

  useGSAP(() => {
    const el = arrow.current
    if (!el || typeof window.matchMedia !== "function") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lean.current = {
      x: gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" }),
      y: gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" }),
    }
    return () => {
      lean.current = null
    }
  })

  function onMove(event: PointerEvent<HTMLElement>) {
    if (!lean.current || event.pointerType !== "mouse") return
    const rect = event.currentTarget.getBoundingClientRect()
    lean.current.x(((event.clientX - rect.left) / rect.width - 0.5) * 36)
    lean.current.y(((event.clientY - rect.top) / rect.height - 0.5) * 36)
  }

  function onLeave() {
    lean.current?.x(0)
    lean.current?.y(0)
  }

  return (
    <section
      id="contact"
      aria-labelledby="home-contact-title"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="group/contact relative isolate flex min-h-[20rem] flex-col justify-between gap-16 overflow-clip bg-purple px-[var(--space-gutter)] pt-7 pb-6 text-on-purple transition-colors duration-500 ease-(--ease-out) has-[button:focus-visible]:bg-night has-[button:focus-visible]:text-snow md:min-h-[26rem] md:hover:bg-night md:hover:text-snow"
    >
      <HalftoneField
        seed={2.4}
        fade="up"
        className="absolute inset-0 -z-10 text-purple-deep transition-opacity duration-500 ease-(--ease-out) group-hover/contact:opacity-40"
      />
      <button
        type="button"
        onClick={() => openContact()}
        aria-label={contact.cta}
        className="absolute inset-0 z-10 cursor-pointer outline-offset-[-6px]"
      />
      <div className="pointer-events-none relative mx-auto flex w-full max-w-content items-start justify-between gap-6">
        <div className="max-w-[30rem]">
          <h2
            id="home-contact-title"
            className="text-lead leading-snug font-semibold"
          >
            {contact.title}
          </h2>
          <p className="mt-2 text-body leading-snug opacity-85">
            {contact.lead}
          </p>
        </div>
        <span ref={arrow} className="shrink-0">
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            strokeWidth={1.6}
            className="size-9 md:size-14"
          />
        </span>
      </div>
      <p
        aria-hidden="true"
        className="display pointer-events-none relative mx-auto -mb-[0.1em] w-full max-w-content text-[19vw] leading-[0.85] md:text-[clamp(5rem,11vw,10rem)]"
      >
        {contact.cta}
      </p>
    </section>
  )
}
