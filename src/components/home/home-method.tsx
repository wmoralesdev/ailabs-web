import { useRef } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  SearchFocusIcon,
  Target02Icon,
  TaskDone01Icon,
} from "@hugeicons/core-free-icons"

import type { HomeMethodContent, Locale } from "@/content"
import { Eyebrow } from "@/components/ui/eyebrow"
import { useHomeEntrance } from "@/lib/home-motion"
import { homeShellClassName } from "./home-styles"

type HomeMethodProps = {
  method: HomeMethodContent
  locale: Locale
}

const methodIcons = [SearchFocusIcon, Target02Icon, TaskDone01Icon] as const

function HomeMethod({ method, locale }: HomeMethodProps) {
  const root = useRef<HTMLElement>(null)
  useHomeEntrance(root, "method", locale)

  return (
    <section
      ref={root}
      id="method"
      aria-labelledby="home-method-title"
      className="section-y relative scroll-mt-[calc(var(--site-header-offset)+1rem)] border-y border-border bg-surface-soft/35"
    >
      <span
        id="about"
        aria-hidden
        className="absolute top-0 scroll-mt-[calc(var(--site-header-offset)+1rem)]"
      />
      <div className={homeShellClassName}>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <Eyebrow>{method.label}</Eyebrow>
            <h2
              id="home-method-title"
              className="max-w-lg font-display text-3xl leading-tight font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              {method.title}
            </h2>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">
              {method.body}
            </p>
          </div>

          <ol className="flex flex-col divide-y divide-border border-t border-border">
            {method.steps.map((step, index) => (
              <li
                key={step.title}
                data-method-step
                data-home-entrance
                className="grid grid-cols-[2rem_1fr] gap-4 py-6 first:pt-5 sm:gap-6"
              >
                <span
                  aria-hidden
                  className="pt-1 font-mono text-xs text-muted-foreground tabular-nums"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="flex items-center gap-3 font-display text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    <HugeiconsIcon
                      icon={methodIcons[index] ?? TaskDone01Icon}
                      size={24}
                      strokeWidth={2}
                      className="shrink-0 text-purple"
                      aria-hidden="true"
                    />
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-prose text-base leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export { HomeMethod }
