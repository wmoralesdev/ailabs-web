import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

const homePillClassName = cn(
  buttonVariants({ variant: "default", size: "xl" }),
  "home-action rounded-full px-5 transition-[color,background-color,border-color,box-shadow,transform]",
  "motion-safe:hover:shadow-lift motion-safe:duration-150 motion-safe:hover:-translate-y-px",
  "motion-safe:active:scale-[0.98]"
)

const homeCardClassName =
  "overflow-hidden rounded-[2rem] border border-border bg-card text-card-foreground"

const homeShellClassName = "page-gutter mx-auto w-full max-w-content"

const homeSectionGapClassName = "flex flex-col gap-10 md:gap-14"

/** Full-bleed purple poster band — pair with HomePaperArcs. */
const homePaperBandClassName = "home-paper-band relative overflow-hidden"

/** Paper sheet that alternates with purple bands below the hero; follows theme. */
const homePaperSheetClassName = "home-paper-sheet relative"

const homeBandPaddingClassName = "section-y"

const homeDisplayClassName =
  "font-display text-foreground text-4xl font-semibold tracking-tight uppercase sm:text-5xl md:text-6xl"

export {
  homePillClassName,
  homeCardClassName,
  homeShellClassName,
  homeSectionGapClassName,
  homePaperBandClassName,
  homePaperSheetClassName,
  homeBandPaddingClassName,
  homeDisplayClassName,
}
