import { useEffect, useId, useState } from "react"
import type { FormEvent, ReactNode } from "react"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Tick02Icon,
} from "@hugeicons/core-free-icons"

import type {
  CampusLeaderContent,
  CampusLeaderFieldOption,
} from "@/content/types"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ErrorBoundary } from "@/components/ui/error-boundary"
import { Input } from "@/components/ui/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select"
import { Textarea } from "@/components/ui/textarea"
import {
  submitCampusLeaderApplication,
  type CampusLeaderApplicationInput,
} from "@/server/campus-leader"
import { toHttpUrl } from "@/lib/http-url"
import { cn } from "@/lib/utils"
import { homePillClassName } from "@/components/home/home-styles"

type FormStatus = "idle" | "submitting" | "success" | "error"

const TOTAL_STEPS = 3

/** Cohort Aster is El Salvador only, so the country code is fixed, not typed. */
const WHATSAPP_PREFIX = "+503"
const WHATSAPP_LENGTH = 8

/** Keeps the 8 local digits, tolerating a pasted `+503`/`503` prefix. */
function toLocalDigits(raw: string) {
  const digits = raw.replace(/\D/g, "")
  const local =
    digits.length > WHATSAPP_LENGTH && digits.startsWith("503")
      ? digits.slice(3)
      : digits
  return local.slice(0, WHATSAPP_LENGTH)
}

type SocialField = "instagram" | "linkedin" | "x"

const SOCIAL_HOSTS: Record<SocialField, string> = {
  instagram: "instagram.com",
  linkedin: "linkedin.com/in",
  x: "x.com",
}

function socialUrl(key: SocialField, value: string) {
  return toHttpUrl(value, { host: SOCIAL_HOSTS[key] })
}

type FormValues = {
  name: string
  email: string
  whatsapp: string
  instagram: string
  linkedin: string
  x: string
  campus: string
  career: string
  year: string
  bio: string
  reach: string
  aiToday: string
  whyLeader: string
  quietRoom: string
  inviteMessage: string
  roomPlan: string
  notes: string
}

const EMPTY_VALUES: FormValues = {
  name: "",
  email: "",
  whatsapp: "",
  instagram: "",
  linkedin: "",
  x: "",
  campus: "",
  career: "",
  year: "",
  bio: "",
  reach: "",
  aiToday: "",
  whyLeader: "",
  quietRoom: "",
  inviteMessage: "",
  roomPlan: "",
  notes: "",
}

const STEP_REQUIRED: Record<number, ReadonlyArray<keyof FormValues>> = {
  0: ["name", "email", "whatsapp", "instagram", "campus", "career", "year"],
  1: ["bio", "reach", "aiToday", "whyLeader"],
  2: ["quietRoom", "inviteMessage", "roomPlan"],
}

/** Optional controls on step 2 (sessionPrefs is outside FormValues). */
const STEP_2_OPTIONAL_COUNT = 2

type FieldMark = "optional" | "required" | null

function fieldMarkForStep(step: number): FieldMark {
  const requiredCount = STEP_REQUIRED[step]?.length ?? 0
  if (step === 2) {
    return STEP_2_OPTIONAL_COUNT < requiredCount ? "optional" : "required"
  }
  // Steps 0–1 are all required — no marks clutter the denser grids.
  return null
}

type CampusLeaderFormProps = {
  content: CampusLeaderContent
  open: boolean
  onOpenChange: (open: boolean) => void
}

function CampusLeaderForm({
  content,
  open,
  onOpenChange,
}: CampusLeaderFormProps) {
  const [formKey, setFormKey] = useState(0)

  return (
    <ErrorBoundary
      key={formKey}
      resetKeys={[open]}
      onError={(error, info) => {
        console.error("Campus Leader form crashed", error, info.componentStack)
      }}
      fallback={({ reset }) => (
        <CampusLeaderFormCrashFallback
          content={content}
          open={open}
          onOpenChange={onOpenChange}
          onRetry={() => {
            reset()
            setFormKey((current) => current + 1)
          }}
        />
      )}
    >
      <CampusLeaderFormDialog
        content={content}
        open={open}
        onOpenChange={onOpenChange}
      />
    </ErrorBoundary>
  )
}

function CampusLeaderFormCrashFallback({
  content,
  open,
  onOpenChange,
  onRetry,
}: CampusLeaderFormProps & { onRetry: () => void }) {
  const titleId = useId()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex w-full max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-lg"
        aria-labelledby={titleId}
      >
        <DialogHeader className="border-border shrink-0 space-y-0 border-b px-5 pt-4 pb-5 sm:px-6">
          <DialogTitle
            id={titleId}
            className="text-xl font-semibold tracking-tight"
          >
            {content.formCrashTitle}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
            {content.error}
          </DialogDescription>
        </DialogHeader>
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
          <Button
            type="button"
            variant="outline"
            size="xl"
            onClick={() => onOpenChange(false)}
          >
            {content.formClose}
          </Button>
          <Button
            type="button"
            size="xl"
            className={homePillClassName}
            onClick={onRetry}
          >
            {content.formRetry}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function CampusLeaderFormDialog({
  content,
  open,
  onOpenChange,
}: CampusLeaderFormProps) {
  const titleId = useId()
  const careerSelectId = useId()
  const yearSelectId = useId()
  const skipInstagramId = useId()
  const [step, setStep] = useState(0)
  const [values, setValues] = useState<FormValues>(EMPTY_VALUES)
  const [sessionPrefs, setSessionPrefs] = useState<string[]>([])
  const [noInstagram, setNoInstagram] = useState(false)
  const [status, setStatus] = useState<FormStatus>("idle")
  const [stepError, setStepError] = useState(false)
  const busy = status === "submitting"
  const markMode = fieldMarkForStep(step)

  useEffect(() => {
    if (!open) {
      return
    }
    setStep(0)
    setStatus("idle")
    setStepError(false)
    setNoInstagram(false)
  }, [open])

  function updateField<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((current) => ({ ...current, [key]: value }))
    setStepError(false)
  }

  function setInstagramSkip(skip: boolean) {
    setNoInstagram(skip)
    setStepError(false)
    if (skip) {
      setValues((current) => ({ ...current, instagram: "" }))
    }
  }

  function isFilled(key: keyof FormValues) {
    if (key === "whatsapp") {
      return values.whatsapp.length === WHATSAPP_LENGTH
    }
    if (key === "instagram") {
      return noInstagram || socialUrl("instagram", values.instagram) !== undefined
    }
    return values[key].trim().length > 0
  }

  function isMissing(key: keyof FormValues) {
    return !isFilled(key)
  }

  function hasInvalidOptionalLink(key: Exclude<SocialField, "instagram">) {
    const trimmed = values[key].trim()
    return trimmed.length > 0 && socialUrl(key, trimmed) === undefined
  }

  function stepHasInvalidLinks(index: number) {
    if (index !== 0) {
      return false
    }
    return (
      (!noInstagram &&
        values.instagram.trim().length > 0 &&
        socialUrl("instagram", values.instagram) === undefined) ||
      hasInvalidOptionalLink("linkedin") ||
      hasInvalidOptionalLink("x")
    )
  }

  function stepIsComplete(index: number) {
    const keys = STEP_REQUIRED[index]
    if (!keys) {
      return false
    }
    return keys.every(isFilled) && !stepHasInvalidLinks(index)
  }

  /** Blur before swapping step trees so Dialog focus trap never tracks a dying node. */
  function releaseFieldFocus() {
    const active = document.activeElement
    if (active instanceof HTMLElement && active !== document.body) {
      active.blur()
    }
  }

  function goNext() {
    if (!stepIsComplete(step)) {
      setStepError(true)
      return
    }
    setStepError(false)
    releaseFieldFocus()
    setStep((current) => Math.min(current + 1, TOTAL_STEPS - 1))
  }

  function goBack() {
    setStepError(false)
    releaseFieldFocus()
    setStep((current) => Math.max(current - 1, 0))
  }

  function toggleSessionPref(value: string) {
    setSessionPrefs((current) =>
      current.includes(value)
        ? current.filter((entry) => entry !== value)
        : [...current, value]
    )
    setStepError(false)
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (step < TOTAL_STEPS - 1) {
      goNext()
      return
    }
    if (!stepIsComplete(step)) {
      setStepError(true)
      return
    }
    if (!content.applicationsOpen) {
      return
    }

    setStatus("submitting")
    try {
      const payload = {
        cohort: content.cohort,
        applicationsOpen: content.applicationsOpen,
        ...values,
        whatsapp: `${WHATSAPP_PREFIX}${values.whatsapp}`,
        instagram: noInstagram
          ? undefined
          : socialUrl("instagram", values.instagram),
        linkedin: socialUrl("linkedin", values.linkedin),
        x: socialUrl("x", values.x),
        sessionPrefs,
      } as CampusLeaderApplicationInput

      const result = await submitCampusLeaderApplication({ data: payload })
      if (result.status === "ok") {
        setStatus("success")
        setValues(EMPTY_VALUES)
        setSessionPrefs([])
        setNoInstagram(false)
        return
      }
      setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  const stepLabel = content.formStepLabel
    .replace("{current}", String(step + 1))
    .replace("{total}", String(TOTAL_STEPS))

  const stepMeta = [
    {
      label: content.logisticsLabel,
      intro: content.logisticsIntro,
    },
    {
      label: content.deeperLabel,
      intro: content.deeperIntro,
    },
    {
      label: content.roomLabel,
      intro: content.roomIntro,
    },
  ][step]!

  const { fields } = content
  const markLabel =
    markMode === "optional"
      ? content.formOptional
      : markMode === "required"
        ? content.formRequired
        : null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="flex max-h-[min(92dvh,52rem)] w-full max-w-[calc(100%-1.5rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl"
        aria-labelledby={titleId}
      >
        <DialogHeader className="border-border shrink-0 space-y-0 border-b px-5 pt-4 pb-5 sm:px-6">
          <DialogTitle
            id={titleId}
            className="text-xl font-semibold tracking-tight"
          >
            {content.formTitle}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground mt-1.5 text-sm">
            {content.careerHint}
          </DialogDescription>
          <div className="mt-5 flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-xs font-semibold tracking-[0.14em] text-purple uppercase">
                {stepLabel}
              </p>
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                {stepMeta.label}
              </p>
            </div>
            <div
              className="bg-muted flex h-1.5 gap-1 overflow-hidden rounded-full"
              aria-hidden
            >
              {Array.from({ length: TOTAL_STEPS }, (_, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-full flex-1 rounded-full transition-colors duration-200",
                    index <= step ? "bg-purple" : "bg-transparent"
                  )}
                />
              ))}
            </div>
          </div>
        </DialogHeader>

        <form
          className="flex min-h-0 flex-1 flex-col"
          onSubmit={handleSubmit}
          noValidate
          aria-busy={busy}
        >
          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-6">
            {status === "success" ? (
              <p
                className="border-border bg-muted/40 text-foreground rounded-lg border px-4 py-6 text-sm leading-relaxed"
                role="status"
              >
                {content.success}
              </p>
            ) : (
              <div className="flex flex-col gap-6">
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {stepMeta.intro}
                </p>

                {stepError ? (
                  <p
                    className="border-destructive/40 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-sm"
                    role="alert"
                  >
                    {stepHasInvalidLinks(step)
                      ? content.invalidLink
                      : content.stepIncomplete}
                  </p>
                ) : null}

                {status === "error" ? (
                  <p
                    className="border-destructive/40 bg-destructive/10 text-destructive rounded-lg border px-3 py-2 text-sm"
                    role="alert"
                  >
                    {content.error}
                  </p>
                ) : null}

                {step === 0 ? (
                  <div className="grid gap-x-4 gap-y-5 sm:grid-cols-2">
                    <Field
                      id="cl-name"
                      label={fields.name.label}
                      placeholder={fields.name.placeholder}
                      autoComplete="name"
                      value={values.name}
                      onChange={(value) => updateField("name", value)}
                      invalid={stepError && isMissing("name")}
                    />
                    <Field
                      id="cl-email"
                      type="email"
                      label={fields.email.label}
                      placeholder={fields.email.placeholder}
                      helper={fields.email.helper}
                      autoComplete="email"
                      value={values.email}
                      onChange={(value) => updateField("email", value)}
                      invalid={stepError && isMissing("email")}
                    />
                    <FieldShell
                      id="cl-whatsapp"
                      label={fields.whatsapp.label}
                      helper={fields.whatsapp.helper}
                    >
                      <InputGroup
                        size="xl"
                        data-disabled={busy ? true : undefined}
                      >
                        <InputGroupAddon className="text-foreground">
                          {WHATSAPP_PREFIX}
                        </InputGroupAddon>
                        <InputGroupInput
                          id="cl-whatsapp"
                          type="tel"
                          inputMode="numeric"
                          autoComplete="tel-national"
                          placeholder={fields.whatsapp.placeholder}
                          value={values.whatsapp}
                          aria-invalid={
                            (stepError && isMissing("whatsapp")) || undefined
                          }
                          onChange={(event) =>
                            updateField(
                              "whatsapp",
                              toLocalDigits(event.target.value)
                            )
                          }
                        />
                      </InputGroup>
                    </FieldShell>
                    <SelectField
                      id={yearSelectId}
                      label={fields.year.label}
                      placeholder={fields.year.placeholder}
                      options={content.yearOptions}
                      value={values.year}
                      onChange={(value) => updateField("year", value)}
                      invalid={stepError && isMissing("year")}
                    />
                    <div className="flex flex-col gap-2.5 sm:col-span-2">
                      <FieldShell
                        id="cl-instagram"
                        label={fields.instagram.label}
                        helper={
                          noInstagram ? undefined : fields.instagram.helper
                        }
                      >
                        <Input
                          id="cl-instagram"
                          type="url"
                          size="xl"
                          autoComplete="url"
                          placeholder={fields.instagram.placeholder}
                          value={values.instagram}
                          disabled={noInstagram || busy}
                          aria-invalid={
                            (stepError &&
                              !noInstagram &&
                              (isMissing("instagram") ||
                                (values.instagram.trim().length > 0 &&
                                  socialUrl("instagram", values.instagram) ===
                                    undefined))) ||
                            undefined
                          }
                          onChange={(event) =>
                            updateField("instagram", event.target.value)
                          }
                        />
                      </FieldShell>
                      <label
                        htmlFor={skipInstagramId}
                        className="text-muted-foreground flex cursor-pointer items-center gap-2.5 text-sm leading-snug"
                      >
                        <Checkbox
                          id={skipInstagramId}
                          checked={noInstagram}
                          disabled={busy}
                          onCheckedChange={(checked) =>
                            setInstagramSkip(checked === true)
                          }
                        />
                        <span>{fields.instagram.skipLabel}</span>
                      </label>
                    </div>
                    <Field
                      id="cl-linkedin"
                      type="url"
                      label={fields.linkedin.label}
                      placeholder={fields.linkedin.placeholder}
                      autoComplete="url"
                      value={values.linkedin}
                      onChange={(value) => updateField("linkedin", value)}
                      invalid={stepError && hasInvalidOptionalLink("linkedin")}
                      mark={content.formOptional}
                    />
                    <Field
                      id="cl-x"
                      type="url"
                      label={fields.x.label}
                      placeholder={fields.x.placeholder}
                      autoComplete="url"
                      value={values.x}
                      onChange={(value) => updateField("x", value)}
                      invalid={stepError && hasInvalidOptionalLink("x")}
                      mark={content.formOptional}
                    />
                    <Field
                      id="cl-campus"
                      label={fields.campus.label}
                      placeholder={fields.campus.placeholder}
                      helper={fields.campus.helper}
                      value={values.campus}
                      onChange={(value) => updateField("campus", value)}
                      invalid={stepError && isMissing("campus")}
                      className="sm:col-span-2"
                    />
                    <SelectField
                      id={careerSelectId}
                      label={fields.career.label}
                      placeholder={fields.career.placeholder}
                      helper={fields.career.helper}
                      options={content.careerOptions}
                      value={values.career}
                      onChange={(value) => updateField("career", value)}
                      invalid={stepError && isMissing("career")}
                      className="sm:col-span-2"
                    />
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="flex flex-col gap-5">
                    <TextAreaField
                      id="cl-bio"
                      label={fields.bio.label}
                      placeholder={fields.bio.placeholder}
                      helper={fields.bio.helper}
                      value={values.bio}
                      onChange={(value) => updateField("bio", value)}
                      invalid={stepError && isMissing("bio")}
                      maxLength={400}
                    />
                    <TextAreaField
                      id="cl-reach"
                      label={fields.reach.label}
                      placeholder={fields.reach.placeholder}
                      helper={fields.reach.helper}
                      value={values.reach}
                      onChange={(value) => updateField("reach", value)}
                      invalid={stepError && isMissing("reach")}
                    />
                    <TextAreaField
                      id="cl-aiToday"
                      label={fields.aiToday.label}
                      placeholder={fields.aiToday.placeholder}
                      value={values.aiToday}
                      onChange={(value) => updateField("aiToday", value)}
                      invalid={stepError && isMissing("aiToday")}
                    />
                    <TextAreaField
                      id="cl-whyLeader"
                      label={fields.whyLeader.label}
                      placeholder={fields.whyLeader.placeholder}
                      value={values.whyLeader}
                      onChange={(value) => updateField("whyLeader", value)}
                      invalid={stepError && isMissing("whyLeader")}
                    />
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="flex flex-col gap-5">
                    <TextAreaField
                      id="cl-quietRoom"
                      label={fields.quietRoom.label}
                      placeholder={fields.quietRoom.placeholder}
                      value={values.quietRoom}
                      onChange={(value) => updateField("quietRoom", value)}
                      invalid={stepError && isMissing("quietRoom")}
                      mark={markMode === "required" ? markLabel : null}
                    />
                    <TextAreaField
                      id="cl-inviteMessage"
                      label={fields.inviteMessage.label}
                      placeholder={fields.inviteMessage.placeholder}
                      value={values.inviteMessage}
                      onChange={(value) => updateField("inviteMessage", value)}
                      invalid={stepError && isMissing("inviteMessage")}
                      mark={markMode === "required" ? markLabel : null}
                    />
                    <TextAreaField
                      id="cl-roomPlan"
                      label={fields.roomPlan.label}
                      placeholder={fields.roomPlan.placeholder}
                      value={values.roomPlan}
                      onChange={(value) => updateField("roomPlan", value)}
                      invalid={stepError && isMissing("roomPlan")}
                      mark={markMode === "required" ? markLabel : null}
                    />
                    <div className="flex flex-col gap-2">
                      <FieldLabel
                        mark={markMode === "optional" ? markLabel : null}
                      >
                        {fields.sessionPrefs.label}
                      </FieldLabel>
                      {/*
                        Plain buttons instead of Base UI ToggleGroup: Composite
                        roving-focus inside Dialog is the same crash class as the
                        old Select portal (focus trap fights the nested manager).
                      */}
                      <div
                        role="group"
                        aria-label={fields.sessionPrefs.label}
                        className="flex w-full flex-wrap gap-2"
                      >
                        {content.sessionPrefOptions.map((option) => {
                          const selected = sessionPrefs.includes(option.value)
                          return (
                            <Button
                              key={option.value}
                              type="button"
                              variant="outline"
                              size="xl"
                              aria-pressed={selected}
                              disabled={busy}
                              onClick={() => toggleSessionPref(option.value)}
                              className={cn(
                                "gap-1.5",
                                selected &&
                                  "border-purple/50 bg-purple/10 text-foreground"
                              )}
                            >
                              {selected ? (
                                <HugeiconsIcon
                                  icon={Tick02Icon}
                                  strokeWidth={2.5}
                                  className="text-purple size-4"
                                />
                              ) : null}
                              {option.label}
                            </Button>
                          )
                        })}
                      </div>
                    </div>
                    <TextAreaField
                      id="cl-notes"
                      label={fields.notes.label}
                      placeholder={fields.notes.placeholder}
                      value={values.notes}
                      onChange={(value) => updateField("notes", value)}
                      mark={markMode === "optional" ? markLabel : null}
                    />
                    <p className="text-muted-foreground text-xs leading-relaxed">
                      {content.creditsNote}
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          <div className="border-border flex shrink-0 flex-wrap items-center justify-between gap-3 border-t px-5 py-4 sm:px-6">
            {status === "success" ? (
              <Button
                type="button"
                variant="outline"
                size="xl"
                onClick={() => onOpenChange(false)}
              >
                {content.formClose}
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="ghost"
                  size="xl"
                  disabled={busy || step === 0}
                  onClick={goBack}
                >
                  <HugeiconsIcon
                    icon={ArrowLeft01Icon}
                    strokeWidth={2}
                    className="size-4"
                  />
                  {content.formBack}
                </Button>
                {step < TOTAL_STEPS - 1 ? (
                  <Button
                    type="submit"
                    disabled={busy}
                    className={homePillClassName}
                  >
                    {content.formNext}
                    <HugeiconsIcon
                      icon={ArrowRight01Icon}
                      strokeWidth={2}
                      className="size-4"
                    />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={busy}
                    className={homePillClassName}
                  >
                    {busy ? content.submitting : content.submit}
                  </Button>
                )}
              </>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function FieldLabel({
  htmlFor,
  children,
  mark,
}: {
  htmlFor?: string
  children: ReactNode
  mark?: string | null
}) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <Label htmlFor={htmlFor} className="text-sm font-medium">
        {children}
      </Label>
      {mark ? (
        <span className="text-muted-foreground shrink-0 text-xs">{mark}</span>
      ) : null}
    </div>
  )
}

/**
 * Label sits one step away from the control; the helper stays tucked under it so
 * it reads as part of the same field instead of a floating line of copy.
 */
function FieldShell({
  id,
  label,
  helper,
  mark,
  className,
  children,
}: {
  id?: string
  label: string
  helper?: string
  mark?: string | null
  className?: string
  children: ReactNode
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <FieldLabel htmlFor={id} mark={mark}>
        {label}
      </FieldLabel>
      <div className="flex flex-col gap-1.5">
        {children}
        {helper ? (
          <p className="text-muted-foreground text-xs leading-relaxed">
            {helper}
          </p>
        ) : null}
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  placeholder,
  helper,
  type = "text",
  autoComplete,
  invalid,
  mark,
  className,
  value,
  onChange,
}: {
  id: string
  label: string
  placeholder?: string
  helper?: string
  type?: string
  autoComplete?: string
  invalid?: boolean
  mark?: string | null
  className?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <FieldShell
      id={id}
      label={label}
      helper={helper}
      mark={mark}
      className={className}
    >
      <Input
        id={id}
        type={type}
        size="xl"
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        aria-invalid={invalid || undefined}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  )
}

function SelectField({
  id,
  label,
  placeholder,
  helper,
  options,
  invalid,
  mark,
  className,
  value,
  onChange,
}: {
  id: string
  label: string
  placeholder?: string
  helper?: string
  options: ReadonlyArray<CampusLeaderFieldOption>
  invalid?: boolean
  mark?: string | null
  className?: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <FieldShell
      id={id}
      label={label}
      helper={helper}
      mark={mark}
      className={className}
    >
      {/*
        Native <select> inside the apply Dialog — Base UI Select portals into a
        nested modal layer and has known hit-test / dismiss bugs there. A form
        item click was the reported crash path.
      */}
      <NativeSelect
        id={id}
        size="xl"
        className="w-full"
        value={value}
        aria-invalid={invalid || undefined}
        onChange={(event) => onChange(event.target.value)}
      >
        <NativeSelectOption value="" disabled>
          {placeholder}
        </NativeSelectOption>
        {options.map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </FieldShell>
  )
}

function TextAreaField({
  id,
  label,
  placeholder,
  helper,
  invalid,
  mark,
  maxLength,
  value,
  onChange,
}: {
  id: string
  label: string
  placeholder?: string
  helper?: string
  invalid?: boolean
  mark?: string | null
  maxLength?: number
  value: string
  onChange: (value: string) => void
}) {
  return (
    <FieldShell id={id} label={label} helper={helper} mark={mark}>
      <Textarea
        id={id}
        size="xl"
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        aria-invalid={invalid || undefined}
        onChange={(event) => onChange(event.target.value)}
      />
    </FieldShell>
  )
}

export { CampusLeaderForm }
