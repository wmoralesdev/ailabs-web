import { useEffect, useId, useState } from "react"
import type { FormEvent } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import type { ContactInterestId, HomeContactContent } from "@/content"
import { CanvasRevealBanner } from "@/components/ui/canvas-reveal-banner"
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
import {
  homeDisplayClassName,
  homePillClassName,
} from "@/components/home/home-styles"

type HomeContactProps = {
  contact: HomeContactContent
}

type FormStatus = "idle" | "submitting" | "success" | "error"

/** Sizing lives in the `xl` control variant; this only carries the card surface. */
const fieldClassName = "border-border bg-background shadow-none"

const textareaClassName = "min-h-28 border-border bg-background shadow-none"

const labelClassName = "text-sm font-medium text-foreground"

/** QA: message body `fail` (any case) simulates a delivery error. */
function shouldSimulateFailure(message: string) {
  return message.trim().toLowerCase() === "fail"
}

const DEFAULT_INTEREST: ContactInterestId = "academy"

function HomeContact({ contact }: HomeContactProps) {
  const titleId = useId()
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [interest, setInterest] = useState<ContactInterestId>(
    contact.interestOptions[0]?.value ?? DEFAULT_INTEREST
  )

  const busy = status === "submitting"

  useEffect(() => {
    if (!open) {
      return
    }
    setStatus("idle")
  }, [open])

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const formData = new FormData(form)
    const message = String(formData.get("message") ?? "")

    setStatus("submitting")
    window.setTimeout(() => {
      if (shouldSimulateFailure(message)) {
        setStatus("error")
        return
      }
      setStatus("success")
      form.reset()
      setInterest(contact.interestOptions[0]?.value ?? DEFAULT_INTEREST)
    }, 400)
  }

  return (
    <>
      <CanvasRevealBanner
        id="contact"
        action={
          <Button
            type="button"
            onClick={() => setOpen(true)}
            className={cn(homePillClassName, "h-12 px-8")}
          >
            {contact.cta}
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </Button>
        }
      >
        <h2
          className={cn(
            homeDisplayClassName,
            "text-on-dark text-3xl normal-case sm:text-4xl md:text-5xl"
          )}
        >
          {contact.title}
        </h2>
        <p className="text-base leading-relaxed text-on-dark/75 md:text-lg">
          {contact.lead}
        </p>
      </CanvasRevealBanner>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          showCloseButton
          className="flex max-h-[min(92dvh,44rem)] w-full max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-xl"
          aria-labelledby={titleId}
        >
          <DialogHeader className="border-border shrink-0 space-y-0 border-b px-5 pt-4 pb-5 sm:px-6">
            <DialogTitle
              id={titleId}
              className="text-xl font-semibold tracking-tight"
            >
              {contact.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mt-1.5 text-sm">
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
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <Label htmlFor="contact-name" className={labelClassName}>
                    {contact.nameLabel}
                  </Label>
                  <Input
                    id="contact-name"
                    name="name"
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
                        "inline-flex min-h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors",
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
                        className="sr-only"
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
                  required
                  rows={4}
                  placeholder={contact.messagePlaceholder}
                  size="xl"
                  className={textareaClassName}
                  disabled={busy}
                />
              </div>
            </div>

            <div className="border-border flex shrink-0 flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:px-6">
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
              {status === "error" ? (
                <p className="text-destructive text-sm" role="alert">
                  {contact.error}
                </p>
              ) : null}
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export { HomeContact }
