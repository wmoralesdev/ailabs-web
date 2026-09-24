import type { BuiltWithPart } from "@/lib/aperture/project-input"
import { cn } from "@/lib/utils"

const TONES = [
  "bg-chart-1",
  "bg-chart-4",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-5",
] as const

export function BuiltWithBar({
  parts,
  title,
}: {
  parts: ReadonlyArray<BuiltWithPart>
  title?: string
}) {
  return (
    <div className="flex flex-col gap-3">
      {title ? (
        <p className="text-xs font-medium text-muted-foreground">{title}</p>
      ) : null}
      <div
        className="flex h-2.5 gap-0.5 overflow-hidden rounded-full bg-muted"
        aria-hidden="true"
      >
        {parts.map((part, index) => (
          <span
            key={`${part.name}-${index}`}
            className={cn("h-full basis-0", TONES[index % TONES.length])}
            style={{ flexGrow: part.percent }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-4 gap-y-1.5 text-sm">
        {parts.map((part, index) => (
          <li
            key={`${part.name}-${index}`}
            className="inline-flex items-center gap-1.5"
          >
            <span
              aria-hidden="true"
              className={cn(
                "size-2.5 shrink-0 rounded-full",
                TONES[index % TONES.length]
              )}
            />
            <span className="text-foreground">{part.name}</span>
            <span className="text-muted-foreground tabular-nums">
              {part.percent}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
