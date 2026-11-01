import { useEffect, useRef, useState } from "react"

import { BOOKING_TOPIC_FIELD, BOOKING_TOPICS } from "@/content/booking"
import type { BookingTopic } from "@/content/booking"
import { getCalNamespace } from "@/lib/cal-embed"
import { onThemeChange } from "@/lib/theme-change"

const NAMESPACE = "diagnostico"

type EmbedTheme = "light" | "dark"

/**
 * Embed colours per theme: the site's paper, surface, border and purple, so
 * the calendar reads as part of the page rather than a white box.
 */
const CSS_VARS_PER_THEME = {
  light: {
    "cal-brand": "#614afc",
    "cal-bg": "#f5f4f8",
    "cal-bg-subtle": "#e9e6f2",
    "cal-bg-emphasis": "#e9e6f2",
    "cal-border": "#d6d3de",
    "cal-border-subtle": "#e2dfe9",
  },
  dark: {
    "cal-brand": "#7462ff",
    "cal-bg": "#100e17",
    "cal-bg-subtle": "#1c1928",
    "cal-bg-emphasis": "#1c1928",
    "cal-border": "#2d2a3a",
    "cal-border-subtle": "#23202f",
  },
}

function resolvedTheme(): EmbedTheme {
  if (typeof document === "undefined") return "light"
  return document.documentElement.classList.contains("dark") ? "dark" : "light"
}

type BookingEmbedProps = {
  /** `<username>/<event-slug>` on cal.com. */
  calLink: string
  /** Prefills the event's topic question when a service page sent one. */
  topic?: BookingTopic
  /** Accessible name of the calendar region. */
  title: string
}

/**
 * The cal.com calendar inline on `/agendar`. It mounts the official embed
 * with the site's current theme and prefills the topic question from the
 * service page the visitor came from. The booker ignores theme changes once
 * it is open, so a theme switch remounts the calendar with the new theme in
 * its URL.
 */
function BookingEmbed({ calLink, topic, title }: BookingEmbedProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [theme, setTheme] = useState<EmbedTheme>(resolvedTheme)

  useEffect(() => {
    setTheme(resolvedTheme())
    return onThemeChange(() => setTheme(resolvedTheme()))
  }, [])

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const cal = getCalNamespace(NAMESPACE)
    cal("inline", {
      elementOrSelector: element,
      calLink,
      config: {
        layout: "month_view",
        theme,
        ...(topic ? { [BOOKING_TOPIC_FIELD]: BOOKING_TOPICS[topic] } : {}),
      },
    })
    cal("ui", {
      theme,
      cssVarsPerTheme: CSS_VARS_PER_THEME,
      hideEventTypeDetails: true,
      layout: "month_view",
    })
    return () => {
      element.replaceChildren()
    }
  }, [calLink, topic, theme])

  return (
    <section aria-label={title} className="w-full">
      <div ref={ref} className="min-h-[30rem] w-full" />
    </section>
  )
}

export { BookingEmbed }
export type { BookingEmbedProps }
