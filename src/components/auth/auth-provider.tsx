import type { ReactNode } from "react"
import { ClerkProvider } from "@clerk/tanstack-react-start"
import { shadcn } from "@clerk/ui/themes"

/**
 * Clerk loads its browser SDK from clerk.ailabs.sv when the provider mounts,
 * so only routes that need auth render it. See `ClerkInitState` for how
 * client-side navigation into these routes gets the server auth state.
 */
function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>{children}</ClerkProvider>
  )
}

export { AuthProvider }
