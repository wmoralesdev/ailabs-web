import type { ComponentProps } from "react"
import { cva } from "class-variance-authority"
import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const eyebrowVariants = cva(
  "inline-flex w-fit items-center text-xs font-semibold tracking-wider uppercase",
  {
    variants: {
      tone: {
        default: "text-muted-foreground",
        onDark: "text-on-dark/80",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  }
)

type EyebrowProps = ComponentProps<"span"> &
  VariantProps<typeof eyebrowVariants>

function Eyebrow({ className, tone = "default", ...props }: EyebrowProps) {
  return (
    <span className={cn(eyebrowVariants({ tone }), className)} {...props} />
  )
}

export { Eyebrow, eyebrowVariants }
export type { EyebrowProps }
