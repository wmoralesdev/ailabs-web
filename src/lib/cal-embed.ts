/**
 * cal.com's embed loader as a module. It is the official snippet with types:
 * `window.Cal` queues every instruction in `q` until `embed.js` arrives, and
 * the script then turns each queue's `push` into a direct call, so the same
 * namespace keeps working after load. Browser only.
 */
const EMBED_SCRIPT = "https://app.cal.com/embed/embed.js"

export const CAL_ORIGIN = "https://app.cal.com"

type Queue = unknown[][]

export type CalNamespace = ((...args: unknown[]) => void) & { q: Queue }

type CalGlobal = ((...args: unknown[]) => void) & {
  q: Queue
  ns: Record<string, CalNamespace>
  loaded?: boolean
}

declare global {
  interface Window {
    Cal?: CalGlobal
  }
}

function enqueue(target: { q: Queue }, args: unknown[]) {
  target.q.push(args)
}

function createGlobal(): CalGlobal {
  const cal: CalGlobal = Object.assign(
    (...args: unknown[]) => {
      if (!cal.loaded) {
        const script = document.createElement("script")
        script.src = EMBED_SCRIPT
        document.head.appendChild(script)
        cal.loaded = true
      }
      if (args[0] === "init" && typeof args[1] === "string") {
        const namespace = args[1]
        const api: CalNamespace = Object.assign(
          (...calls: unknown[]) => enqueue(api, calls),
          { q: [] as Queue }
        )
        if (!Object.hasOwn(cal.ns, namespace)) {
          cal.ns[namespace] = api
        }
        enqueue(cal.ns[namespace], args)
        enqueue(cal, ["initNamespace", namespace])
        return
      }
      enqueue(cal, args)
    },
    { q: [], ns: {} }
  )
  return cal
}

/** Loads the script on first use and returns the namespaced embed API. */
export function getCalNamespace(namespace: string): CalNamespace {
  const cal = (window.Cal ??= createGlobal())
  if (!(namespace in cal.ns)) {
    cal("init", namespace, { origin: CAL_ORIGIN })
  }
  return cal.ns[namespace]
}
