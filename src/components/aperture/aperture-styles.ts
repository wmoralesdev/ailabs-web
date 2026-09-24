const apertureShellClassName =
  "mx-auto w-full max-w-content px-1 pt-2 pb-10 sm:px-2 md:pb-16"

const aperturePanelClassName =
  "flex flex-col gap-4 rounded-3xl border border-border bg-card p-6 text-card-foreground"

const apertureQuietLinkClassName =
  "inline-flex w-fit items-center gap-1.5 rounded-sm text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"

const apertureOutlinePillClassName =
  "inline-flex min-h-11 w-fit items-center gap-2 rounded-full border border-border bg-foreground/5 px-5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/10 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none"

/** Pill label around a Checkbox; the checked state tints the whole chip. */
const apertureChoiceChipClassName =
  "flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors select-none hover:border-foreground/30 has-data-checked:border-primary has-data-checked:bg-muted"

export {
  apertureShellClassName,
  aperturePanelClassName,
  apertureQuietLinkClassName,
  apertureOutlinePillClassName,
  apertureChoiceChipClassName,
}
