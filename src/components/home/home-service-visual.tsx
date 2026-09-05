import { Fragment } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  BookOpen02Icon,
  CheckmarkBadge02Icon,
  PencilEdit02Icon,
  PlugSocketIcon,
  UserCheck01Icon,
  WorkflowSquare01Icon,
} from "@hugeicons/core-free-icons"

import { cn } from "@/lib/utils"

const serviceNodes = {
  academy: [
    { id: "input", icon: BookOpen02Icon },
    { id: "practice", icon: PencilEdit02Icon },
    { id: "judgment", icon: CheckmarkBadge02Icon },
  ],
  agentic: [
    { id: "integration", icon: PlugSocketIcon },
    { id: "review", icon: UserCheck01Icon },
    { id: "workflow", icon: WorkflowSquare01Icon },
  ],
} as const

type HomeServiceVisualProps = {
  service: keyof typeof serviceNodes
}

/** Decorative sequence; the adjacent service copy carries its meaning. */
function HomeServiceVisual({ service }: HomeServiceVisualProps) {
  return (
    <div
      aria-hidden="true"
      data-home-visual={service}
      data-service-part
      className="mt-6 flex h-16 w-full max-w-xs items-center gap-3 text-muted-foreground"
    >
      {serviceNodes[service].map((node, index) => (
        <Fragment key={node.id}>
          {index > 0 ? (
            <svg
              data-visual-connector
              viewBox="0 0 64 24"
              fill="none"
              className="h-6 min-w-4 flex-1 origin-left text-purple/65"
              preserveAspectRatio="none"
            >
              <path
                d="M1 12H61M55 6L61 12L55 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          ) : null}
          <span
            data-visual-node={node.id}
            className={cn(
              "flex size-12 shrink-0 items-center justify-center",
              index === 2
                ? "rounded-full bg-purple/12 text-purple"
                : "text-foreground/75"
            )}
          >
            <HugeiconsIcon icon={node.icon} size={26} strokeWidth={2} />
          </span>
        </Fragment>
      ))}
    </div>
  )
}

export { HomeServiceVisual }
