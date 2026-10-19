import { SignUp } from "@clerk/tanstack-react-start"
import { createFileRoute } from "@tanstack/react-router"

import { AuthProvider } from "@/components/auth/auth-provider"

export const Route = createFileRoute("/sign-up/$")({
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: Page,
})

function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AuthProvider>
        <SignUp />
      </AuthProvider>
    </div>
  )
}
