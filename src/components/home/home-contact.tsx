import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"

import type { HomeContactContent } from "@/content"
import { useContact } from "@/components/contact/contact-provider"
import { HalftoneCanvas } from "@/components/halftone/halftone-canvas"
import { homeShellClassName } from "./home-styles"

/**
 * The closing card: the whole tile opens the contact dialog. It is a quiet
 * dot screen on the indigo field until the pointer moves, then lilac ink
 * follows it.
 */
export function HomeContact({ contact }: { contact: HomeContactContent }) {
  const { openContact } = useContact()

  return (
    <section
      id="contact"
      aria-labelledby="home-contact-title"
      className={`${homeShellClassName} pb-[var(--space-gutter)]`}
    >
      <div
        data-halftone-surface
        className="group/contact relative isolate flex min-h-[22rem] flex-col justify-between gap-16 overflow-clip rounded-3xl bg-purple p-6 text-snow [--ht-accent:var(--color-print)] [--ht-faint:color-mix(in_srgb,var(--color-snow)_16%,transparent)] [--ht-ink:var(--color-print)] sm:p-10 md:min-h-[28rem]"
      >
        <HalftoneCanvas
          cell={12}
          rest={0.08}
          className="absolute inset-0 -z-10"
        />
        <button
          type="button"
          onClick={() => openContact()}
          aria-label={contact.cta}
          className="absolute inset-0 z-10 cursor-pointer rounded-3xl outline-offset-[-6px]"
        />
        <div className="pointer-events-none flex items-start justify-between gap-6">
          <div className="max-w-[30rem]">
            <h2
              id="home-contact-title"
              className="text-lead leading-snug font-semibold text-snow"
            >
              {contact.title}
            </h2>
            <p className="mt-2 text-body leading-snug text-snow/80">
              {contact.lead}
            </p>
          </div>
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            strokeWidth={1.6}
            className="size-9 shrink-0 text-snow transition-transform duration-300 ease-(--ease-out) group-hover/contact:translate-x-1 group-hover/contact:-translate-y-1 md:size-12"
          />
        </div>
        <p
          aria-hidden="true"
          className="display pointer-events-none -mb-[0.12em] text-[17vw] leading-[0.85] text-snow md:text-[clamp(5rem,10vw,9rem)]"
        >
          {contact.cta}
        </p>
      </div>
    </section>
  )
}
