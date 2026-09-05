import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  useState,
} from "react"
import type { FormEvent, ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { ContactInterestId, HomeContactContent, Locale } from "@/content"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { homePillClassName } from "@/components/home/home-styles"
import { submitContact } from "@/server/contact"
import type { ContactInput } from "@/server/contact-input"

type FormStatus =
  "idle" | "submitting" | "success" | "error" | "invalid" | "rate_limited"
type Draft = Pick<
  ContactInput,
  "name" | "email" | "company" | "message" | "website"
>
const EMPTY_DRAFT: Draft = {
  name: "",
  email: "",
  company: "",
  message: "",
  website: "",
}
const DEFAULT_INTEREST: ContactInterestId = "discovery"
const fieldClassName = "border-border bg-background shadow-none"
const textareaClassName = "min-h-28 border-border bg-background shadow-none"
const labelClassName = "text-sm font-medium text-foreground"
const ContactContext = createContext<{
  openContact: (interest?: ContactInterestId) => void
} | null>(null)

export function useContact() {
  const context = useContext(ContactContext)
  if (!context) throw new Error("useContact requires ContactProvider")
  return context
}

export function ContactProvider({
  contact,
  locale,
  children,
}: {
  contact: HomeContactContent
  locale: Locale
  children: ReactNode
}) {
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [interest, setInterest] = useState<ContactInterestId>(DEFAULT_INTEREST)
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)
  const busyRef = useRef(false)
  const returnFocus = useRef<HTMLElement | null>(null)
  const submission = useRef<{ signature: string; id: string } | null>(null)
  const busy = status === "submitting"

  const openContact = useCallback(
    (nextInterest: ContactInterestId = DEFAULT_INTEREST) => {
      returnFocus.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null
      if (!busyRef.current) {
        setInterest(nextInterest)
        setStatus("idle")
      }
      setOpen(true)
    },
    []
  )
  const context = useMemo(() => ({ openContact }), [openContact])

  function updateDraft(key: keyof Draft, value: string) {
    setDraft((current) => ({ ...current, [key]: value }))
    setStatus("idle")
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (busyRef.current) return
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    const fields = { ...draft, interest, locale }
    const signature = JSON.stringify(fields)
    if (submission.current?.signature !== signature) {
      submission.current = { signature, id: crypto.randomUUID() }
    }
    busyRef.current = true
    setStatus("submitting")
    try {
      const result = await submitContact({
        data: { ...fields, submissionId: submission.current.id },
      })
      if (result.status === "received") {
        setStatus("success")
        setDraft(EMPTY_DRAFT)
        setInterest(DEFAULT_INTEREST)
        submission.current = null
      } else {
        setStatus(result.status)
      }
    } catch {
      setStatus("error")
    } finally {
      busyRef.current = false
    }
  }

  return (
    <ContactContext.Provider value={context}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          closeLabel={contact.closeLabel}
          overlayClassName="contact-overlay"
          finalFocus={() =>
            returnFocus.current?.isConnected
              ? returnFocus.current
              : (document.querySelector<HTMLElement>(
                  "[data-contact-focus-fallback]"
                ) ?? false)
          }
          className="contact-dialog flex max-h-[min(92dvh,44rem)] w-full max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl"
          aria-labelledby={titleId}
        >
          <DialogHeader className="shrink-0 space-y-0 border-b border-border px-5 pt-4 pb-5 sm:px-6">
            <DialogTitle
              id={titleId}
              className="text-xl font-semibold tracking-tight"
            >
              {contact.title}
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
              {contact.lead}
            </DialogDescription>
          </DialogHeader>

          <form
            className="flex min-h-0 flex-1 flex-col"
            onSubmit={handleSubmit}
            noValidate
            aria-busy={busy}
          >
            <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-5 py-5 sm:px-6">
              <div hidden aria-hidden="true">
                <input
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={draft.website}
                  onChange={(event) =>
                    updateDraft("website", event.target.value)
                  }
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-name" className={labelClassName}>
                    {contact.nameLabel}
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
                    value={draft.name}
                    onChange={(event) =>
                      updateDraft("name", event.target.value)
                    }
                    maxLength={120}
                    required
                    autoComplete="name"
                    placeholder={contact.namePlaceholder}
                    size="xl"
                    className={fieldClassName}
                    disabled={busy}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-email" className={labelClassName}>
                    {contact.emailLabel}
                  </Label>
                  <Input
                    id="contact-email"
                    name="email"
                    value={draft.email}
                    onChange={(event) =>
                      updateDraft("email", event.target.value)
                    }
                    maxLength={254}
                    type="email"
                    required
                    autoComplete="email"
                    placeholder={contact.emailPlaceholder}
                    size="xl"
                    className={fieldClassName}
                    disabled={busy}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-company" className={labelClassName}>
                  {contact.companyLabel}
                </Label>
                <Input
                  id="contact-company"
                  name="company"
                  value={draft.company}
                  onChange={(event) =>
                    updateDraft("company", event.target.value)
                  }
                  maxLength={160}
                  autoComplete="organization"
                  placeholder={contact.companyPlaceholder}
                  size="xl"
                  className={fieldClassName}
                  disabled={busy}
                />
              </div>

              <fieldset className="flex flex-col gap-3" disabled={busy}>
                <legend className={cn(labelClassName, "mb-2")}>
                  {contact.interestLabel}
                </legend>
                <div className="flex flex-wrap gap-2">
                  {contact.interestOptions.map((option) => (
                    <label
                      key={option.value}
                      className={cn(
                        "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
                        interest === option.value
                          ? "border-purple bg-background text-foreground"
                          : "border-border bg-background/70 text-muted-foreground hover:text-foreground",
                        busy && "pointer-events-none opacity-50"
                      )}
                    >
                      <input
                        type="radio"
                        name="interest"
                        value={option.value}
                        checked={interest === option.value}
                        onChange={() => setInterest(option.value)}
                        className="size-4 shrink-0 accent-purple"
                        required
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="flex flex-col gap-2">
                <Label htmlFor="contact-message" className={labelClassName}>
                  {contact.messageLabel}
                </Label>
                <Textarea
                  id="contact-message"
                  name="message"
                  value={draft.message}
                  onChange={(event) =>
                    updateDraft("message", event.target.value)
                  }
                  maxLength={5000}
                  required
                  rows={4}
                  placeholder={contact.messagePlaceholder}
                  size="xl"
                  className={textareaClassName}
                  disabled={busy}
                />
              </div>
            </div>

            <div className="flex shrink-0 flex-col gap-3 border-t border-border px-5 py-4 sm:flex-row sm:items-center sm:px-6">
              <Button
                type="submit"
                disabled={busy}
                className={homePillClassName}
              >
                {busy ? contact.submitting : contact.submit}
                {busy ? null : (
                  <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
                )}
              </Button>
              {status === "success" ? (
                <p className="text-sm text-foreground" role="status">
                  {contact.success}
                </p>
              ) : null}
              {status === "error" ||
              status === "invalid" ||
              status === "rate_limited" ? (
                <p className="text-sm text-destructive" role="alert">
                  {status === "rate_limited"
                    ? contact.rateLimited
                    : status === "invalid"
                      ? contact.invalid
                      : contact.error}
                </p>
              ) : null}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </ContactContext.Provider>
  )
}
