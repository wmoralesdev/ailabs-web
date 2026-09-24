import "dotenv/config"
import { pathToFileURL } from "node:url"

import { signedRequest, userEventPayload } from "./lib/clerk-webhook-fixture"

const EVENT_TYPES = ["user.created", "user.updated", "user.deleted"] as const

type EventType = (typeof EVENT_TYPES)[number]

function isEventType(value: string): value is EventType {
  return (EVENT_TYPES as ReadonlyArray<string>).includes(value)
}

function arg(name: string): string | undefined {
  return process.argv
    .find((value) => value.startsWith(`--${name}=`))
    ?.slice(name.length + 3)
}

function args(name: string): Array<string> {
  const prefix = `--${name}=`
  return process.argv
    .filter((value) => value.startsWith(prefix))
    .map((value) => value.slice(prefix.length))
}

export function parseSendArgs(argv: ReadonlyArray<string>) {
  const type = argv.find((value) => isEventType(value))
  if (!type) {
    throw new Error(
      "Usage: pnpm tsx scripts/clerk-webhook-send.ts <user.created|user.updated|user.deleted> --user=<id>"
    )
  }
  const user = argv
    .find((value) => value.startsWith("--user="))
    ?.slice("--user=".length)
  if (!user) {
    throw new Error("--user is required")
  }
  const countRaw = argv
    .find((value) => value.startsWith("--count="))
    ?.slice("--count=".length)
  const count = countRaw ? Number(countRaw) : 1
  if (!Number.isInteger(count) || count < 1) {
    throw new Error("--count must be a positive integer")
  }
  const minutesAgoRaw = argv
    .find((value) => value.startsWith("--minutes-ago="))
    ?.slice("--minutes-ago=".length)
  const minutesAgo = minutesAgoRaw ? Number(minutesAgoRaw) : 0
  if (!Number.isFinite(minutesAgo) || minutesAgo < 0) {
    throw new Error("--minutes-ago must be a non-negative number")
  }
  return { type, user, count, minutesAgo }
}

async function main() {
  const secret = process.env.CLERK_WEBHOOK_SIGNING_SECRET
  if (!secret) {
    throw new Error("CLERK_WEBHOOK_SIGNING_SECRET is not set")
  }
  const { type, user, count, minutesAgo } = parseSendArgs(process.argv)
  const origin = (
    arg("url") ??
    process.env.SITE_URL ??
    "http://localhost:3000"
  ).replace(/\/$/, "")
  const emails = [
    ...args("email").map((address) => ({ address, verified: true })),
    ...args("unverified").map((address) => ({ address, verified: false })),
  ]
  const payload =
    type === "user.deleted"
      ? userEventPayload("user.deleted", { id: user })
      : userEventPayload(type, {
          id: user,
          emails,
          imageUrl: arg("image") ?? null,
        })
  const timestamp = new Date(Date.now() - minutesAgo * 60 * 1000)
  const url = `${origin}/api/webhooks/clerk`
  const timings: Array<number> = []
  let last: Response | undefined
  let lastBody = ""

  for (let i = 0; i < count; i++) {
    const started = performance.now()
    last = await fetch(signedRequest(secret, payload, { url, timestamp }))
    lastBody = await last.text()
    timings.push(performance.now() - started)
  }

  if (!last) {
    throw new Error("No webhook request was sent")
  }
  if (count > 1) {
    const p95 = [...timings].sort((a, b) => a - b)[
      Math.min(timings.length - 1, Math.ceil(timings.length * 0.95) - 1)
    ]
    console.log(`sent ${count}, p95 ${Math.round(p95)} ms`)
  }
  console.log(last.status)
  if (lastBody) {
    console.log(lastBody)
  }
  if (!last.ok) {
    process.exitCode = 1
  }
}

const entrypoint = process.argv[1]
if (entrypoint && import.meta.url === pathToFileURL(entrypoint).href) {
  main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  })
}
