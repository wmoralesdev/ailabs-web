/**
 * Workshop facts with no copy or page components. The footer and route loaders
 * ship in the entry bundle, so they read this instead of the full registry.
 */
export type WorkshopMeta = {
  slug: string
  title: string
  priceCents: number
  currency: "USD"
  capacity: number
  /**
   * Inclusive calendar end date (YYYY-MM-DD) in America/El_Salvador.
   * Null when the date is still TBD — keep listing until locked.
   */
  endsOn: string | null
}

const catalog: Record<string, WorkshopMeta> = {
  "modo-fundador": {
    slug: "modo-fundador",
    title: "Modo Fundador",
    priceCents: 5000,
    currency: "USD",
    capacity: 20,
    endsOn: "2026-08-15",
  },
  "get-competitive-quick": {
    slug: "get-competitive-quick",
    title: "Get Competitive Quick",
    priceCents: 2500,
    currency: "USD",
    capacity: 20,
    endsOn: null,
  },
}

export function getWorkshopMeta(slug: string): WorkshopMeta | null {
  return catalog[slug] ?? null
}

/** True when `endsOn` is set and `now` is after that day in El Salvador. */
export function isWorkshopPast(
  workshop: Pick<WorkshopMeta, "endsOn">,
  now: Date = new Date()
): boolean {
  if (!workshop.endsOn) {
    return false
  }
  const end = new Date(`${workshop.endsOn}T23:59:59.999-06:00`)
  return now.getTime() > end.getTime()
}

/**
 * Whole days from `now` to the start of the event day in El Salvador. Null
 * when the date is TBD or the event is today or past, so callers can drop the
 * countdown instead of rendering "in 0 days".
 */
export function daysUntilWorkshop(
  workshop: Pick<WorkshopMeta, "endsOn">,
  now: Date = new Date()
): number | null {
  if (!workshop.endsOn) {
    return null
  }
  const start = new Date(`${workshop.endsOn}T00:00:00.000-06:00`)
  const days = Math.ceil((start.getTime() - now.getTime()) / 86_400_000)
  return days > 0 ? days : null
}

export function listWorkshopSlugs(): string[] {
  return Object.keys(catalog)
}

/** Upcoming / TBD workshops for chrome (footer, etc.). */
export function listUpcomingWorkshops(now: Date = new Date()): WorkshopMeta[] {
  return Object.values(catalog).filter(
    (workshop) => !isWorkshopPast(workshop, now)
  )
}
