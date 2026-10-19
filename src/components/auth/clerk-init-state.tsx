import { ScriptOnce } from "@tanstack/react-router"
import { getGlobalStartContext } from "@tanstack/react-start"

/**
 * `ClerkProvider` reads its keys and SSR auth state from
 * `window.__clerk_init_state`, which only the server can write. The provider
 * is mounted by auth routes alone, so every document emits the state here
 * and client-side navigation into an auth route matches a direct visit.
 */
function ClerkInitState() {
  return (
    <ScriptOnce>
      {`window.__clerk_init_state = ${JSON.stringify(
        getGlobalStartContext()?.clerkInitialState ?? {}
      ).replace(/</g, "\\u003c")}`}
    </ScriptOnce>
  )
}

export { ClerkInitState }
