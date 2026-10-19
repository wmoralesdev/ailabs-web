import { ClerkProvider } from "@clerk/tanstack-react-start"
import { shadcn } from "@clerk/ui/themes"
import type { ReactNode } from "react"

/** Clerk for auth routes only; public pages never download it. */
export function ClerkAuth({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider appearance={{ theme: shadcn }}>{children}</ClerkProvider>
  )
}
