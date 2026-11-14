import { useMemo } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { QrCodeIcon } from "@hugeicons/core-free-icons"
import { encode } from "uqr"

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

type CommunityQrProps = {
  /** Absolute URL the code opens. */
  url: string
  label: string
  /** Names the dialog for assistive tech; it is not shown. */
  title: string
}

/** Quiet zone around the code, in modules. */
const QUIET = 3

/**
 * A floating button that opens the QR code of `url` alone, as large as the
 * screen allows, so a room can scan it from the presenter's screen. Escape or
 * a click outside closes it. Data modules print as
 * halftone dots; the three finder patterns stay solid so every camera reads
 * them. Ink on snow in both themes, because scanners need a light field.
 */
function CommunityQr({ url, label, title }: CommunityQrProps) {
  return (
    <Dialog>
      <DialogTrigger
        aria-label={label}
        className="btn btn-ink fixed right-4 bottom-4 z-40 shadow-lg sm:right-6 sm:bottom-6"
      >
        <HugeiconsIcon icon={QrCodeIcon} strokeWidth={2} className="size-5" />
        <span className="hidden sm:inline">{label}</span>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="block w-[min(90vw,85svh)] max-w-none overflow-hidden rounded-3xl bg-snow p-0 ring-0 sm:max-w-none"
      >
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <QrCodeSvg value={url} />
      </DialogContent>
    </Dialog>
  )
}

function QrCodeSvg({ value }: { value: string }) {
  const { size, dots, finders } = useMemo(() => {
    const qr = encode(value, { ecc: "Q", border: 0 })
    const n = qr.size
    const isFinder = (x: number, y: number) =>
      (x < 7 && y < 7) || (x >= n - 7 && y < 7) || (x < 7 && y >= n - 7)
    const cells: Array<[number, number]> = []
    qr.data.forEach((row, y) => {
      row.forEach((dark, x) => {
        if (dark && !isFinder(x, y)) {
          cells.push([x, y])
        }
      })
    })
    return {
      size: n,
      dots: cells,
      finders: [
        [0, 0],
        [n - 7, 0],
        [0, n - 7],
      ] as Array<[number, number]>,
    }
  }, [value])

  const box = size + QUIET * 2
  return (
    <svg
      viewBox={`${-QUIET} ${-QUIET} ${box} ${box}`}
      role="img"
      aria-label={value}
      className="block h-auto w-full"
    >
      <rect
        x={-QUIET}
        y={-QUIET}
        width={box}
        height={box}
        fill="var(--color-snow)"
      />
      <g fill="var(--color-night)">
        {dots.map(([x, y]) => (
          <circle key={`${x}-${y}`} cx={x + 0.5} cy={y + 0.5} r={0.5} />
        ))}
        {finders.map(([x, y]) => (
          <FinderPattern key={`${x}-${y}`} x={x} y={y} />
        ))}
      </g>
    </svg>
  )
}

/** One finder pattern: a 7-module ring around a 3-module square. */
function FinderPattern({ x, y }: { x: number; y: number }) {
  return (
    <>
      <path
        fillRule="evenodd"
        d={`M${x + 1.6} ${y}h3.8a1.6 1.6 0 0 1 1.6 1.6v3.8a1.6 1.6 0 0 1-1.6 1.6h-3.8a1.6 1.6 0 0 1-1.6-1.6v-3.8a1.6 1.6 0 0 1 1.6-1.6Z M${x + 1.8} ${y + 1}h3.4a.8.8 0 0 1 .8.8v3.4a.8.8 0 0 1-.8.8h-3.4a.8.8 0 0 1-.8-.8v-3.4a.8.8 0 0 1 .8-.8Z`}
      />
      <rect x={x + 2} y={y + 2} width={3} height={3} rx={0.8} />
    </>
  )
}

export { CommunityQr }
