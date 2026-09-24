import type { BuiltWithPart } from "@/lib/aperture/project-input"
import { cn } from "@/lib/utils"

const TONES = [
  "bg-foreground",
  "bg-foreground/75",
  "bg-foreground/55",
  "bg-foreground/35",
  "bg-muted-foreground",
] as const

export function BuiltWithBar({
  parts,
}: {
  parts: ReadonlyArray<BuiltWithPart>
}) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="flex h-2 overflow-hidden rounded-full bg-muted"
        aria-hidden="true"
      >
        {parts.map((part, index) => (
          <span
            key={`${part.name}-${index}`}
            className={cn(TONES[index % TONES.length])}
            style={{ width: `${part.percent}%` }}
          />
        ))}
      </div>
      <ul className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted-foreground">
        {parts.map((part, index) => (
          <li key={`${part.name}-${index}`}>
            {part.name} {part.percent}%
          </li>
        ))}
      </ul>
    </div>
  )
}
