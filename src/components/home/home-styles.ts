import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const homePillClassName = cn(
  buttonVariants({ variant: "default", size: "xl" }),
  "rounded-full px-5",
  "motion-safe:duration-150 motion-safe:hover:-translate-y-px motion-safe:hover:shadow-lift",
  "motion-safe:active:scale-[0.98]"
)

const homeCardClassName =
  "overflow-hidden rounded-[2rem] border border-border bg-card text-card-foreground"

const homeShellClassName = "page-gutter mx-auto w-full max-w-content"

const homeSectionGapClassName = "flex flex-col gap-10 md:gap-14"

const homeDisplayClassName =
  "font-display text-foreground text-4xl font-semibold tracking-tight uppercase sm:text-5xl md:text-6xl"

const homeHeroNavLinkClassName =
  "inline-flex min-h-11 items-center text-on-dark/85 hover:text-on-dark text-sm font-medium underline decoration-transparent decoration-2 underline-offset-8 hover:decoration-purple-soft motion-safe:transition-[color,text-decoration-color] motion-safe:duration-150 focus-visible:ring-ring/50 rounded-sm focus-visible:ring-2 focus-visible:outline-none"

const homeHeroChromeHeightClassName = "h-14"

export {
  homePillClassName,
  homeCardClassName,
  homeShellClassName,
  homeSectionGapClassName,
  homeDisplayClassName,
  homeHeroNavLinkClassName,
  homeHeroChromeHeightClassName,
}
