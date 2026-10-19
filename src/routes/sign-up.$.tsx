import { SignUp } from "@clerk/tanstack-react-start"
import { createFileRoute } from "@tanstack/react-router"
import { ClerkAuth } from "@/components/auth/clerk-auth"
import { ensureClerkDocument } from "@/lib/clerk-document"

export const Route = createFileRoute("/sign-up/$")({
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
      <SignUp />
    </div>
  )
}
