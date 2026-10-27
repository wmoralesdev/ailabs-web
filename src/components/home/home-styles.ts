/** The one button shape: square, flat, purple, presses down (see `.btn`). */
const homePillClassName = "btn"

/** Flat bordered panel. Prefer spacing and hairlines over cards. */
const homeCardClassName =
  "overflow-hidden border border-border bg-card text-card-foreground"

/** Content column shared by sections. */
const homeShellClassName = "page-gutter mx-auto w-full max-w-content"

const homeSectionGapClassName = "flex flex-col gap-10 md:gap-14"

/** Full-bleed purple field, graphite ink, the same in both themes. */
const homePaperBandClassName =
  "relative overflow-hidden bg-purple text-on-purple"

/** Paper sheet that follows the page theme. */
const homePaperSheetClassName = "relative bg-background text-foreground"

const homeBandPaddingClassName = "section-y"

/** Section heading: Alan Sans display at the shared head size. */
const homeHeadingClassName = "display text-head"

const homeDisplayClassName =
  "display text-foreground text-4xl sm:text-5xl md:text-6xl"

export {
  homePillClassName,
  homeCardClassName,
  homeShellClassName,
  homeSectionGapClassName,
  homePaperBandClassName,
  homePaperSheetClassName,
  homeBandPaddingClassName,
  homeHeadingClassName,
  homeDisplayClassName,
}
