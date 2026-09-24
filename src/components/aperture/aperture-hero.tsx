import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Always-dark Aperture header card. Children render on the left; `aside`
 * holds the signature numeral on the right from `lg` up and follows the copy
 * on small screens.
 */
export function ApertureHero({
  children,
  aside,
  className,
}: {
  children: ReactNode
  aside?: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "home-hero-invert relative isolate overflow-hidden rounded-[2rem] border border-border bg-surface-ink text-foreground",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="aperture-stipple pointer-events-none absolute inset-0 -z-10"
      />
      <div className="flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-end lg:justify-between lg:gap-12 lg:p-14">
        <div className="flex min-w-0 flex-col gap-5 lg:max-w-2xl">
          {children}
        </div>
        {aside ? (
          <div className="shrink-0 border-t border-border pt-6 lg:border-t-0 lg:pt-0">
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function ApertureNumeral({
  value,
  label,
}: {
  value: string
  label: string
}) {
  return (
    <div className="flex items-baseline gap-3 lg:flex-col lg:items-end lg:gap-1">
      <span className="order-last text-sm font-medium text-muted-foreground lg:order-first">
        {label}
      </span>
      <span className="font-display text-6xl leading-none font-semibold tracking-tight tabular-nums sm:text-7xl lg:text-8xl xl:text-9xl">
        {value}
      </span>
    </div>
  )
}
