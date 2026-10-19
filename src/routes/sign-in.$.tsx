import { SignIn } from "@clerk/tanstack-react-start"
import { createFileRoute } from "@tanstack/react-router"
import { ClerkAuth } from "@/components/auth/clerk-auth"
import { ensureClerkDocument } from "@/lib/clerk-document"

export const Route = createFileRoute("/sign-in/$")({
  beforeLoad: ensureClerkDocument,
  head: () => ({
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  }),
  component: () => (
    <ClerkAuth>
      <Page />
    </ClerkAuth>
  ),
})

function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn />
    </div>
  )
}
