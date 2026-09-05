import { useState } from "react"
import type { FormEvent } from "react"

import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@/components/ui/questionnaire"
import type { ModoFundadorContent } from "@/events/modo-fundador/content"
import { startWorkshopCheckout } from "@/server/workshop-registration"
import { wompiPayButtonClassName } from "@/lib/wompi-pay-button"

type RegistrationFormProps = {
  slug: string
  copy: ModoFundadorContent["form"]
  soldOut: boolean
  soldOutLabel: string
  soldOutNote: string
}

const questionnaireItems = [
  { name: "name", required: true },
  { name: "email", required: true },
  { name: "whatsapp", required: true },
] as const

// text-base on mobile keeps iOS from zooming the viewport on focus.
const inputClassName =
  "border-foreground/25 bg-foreground/[0.03] hover:border-foreground/40 min-h-11 rounded-lg px-3 text-base sm:min-h-11 md:text-sm"

/**
 * Body only — the page owns the card surface so the form inherits the
 * theme-invariant paper island it sits on.
 */
function RegistrationForm({
  slug,
  copy,
  soldOut,
  soldOutLabel,
  soldOutNote,
}: RegistrationFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (soldOut || pending) {
      return
    }

    setError(null)
    setPending(true)

    try {
      const result = await startWorkshopCheckout({
        data: {
          slug,
          name: name.trim(),
          email: email.trim(),
          whatsapp: whatsapp.trim(),
        },
      })

      switch (result.status) {
        case "ok":
          window.location.assign(result.checkoutUrl)
          return
        case "sold_out":
          setError(copy.errorSoldOut)
          break
        case "invalid":
          setError(result.message || copy.errorInvalid)
          break
        case "error":
          setError(copy.errorGeneric)
          break
        default: {
          const _exhaustive: never = result
          return _exhaustive
        }
      }
    } catch {
      setError(copy.errorGeneric)
    } finally {
      setPending(false)
    }
  }

  if (soldOut) {
    return (
      <div className="px-5 py-6 sm:px-6">
        <p className="font-mono text-sm font-semibold tracking-[0.14em] text-foreground uppercase">
          {soldOutLabel}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-pretty text-foreground/70">
          {soldOutNote}
        </p>
      </div>
    )
  }

  return (
    <div className="px-5 py-6 sm:px-6" aria-busy={pending}>
      <Questionnaire
        items={[...questionnaireItems]}
        noValidate={false}
        onSubmit={onSubmit}
      >
        <QuestionnaireProgress className="font-mono text-[0.7rem] font-semibold tracking-[0.14em] text-foreground/60 uppercase" />

        <QuestionnaireItem name="name" required>
          <QuestionnaireTitle className="text-base">
            {copy.name.title}
          </QuestionnaireTitle>
          <QuestionnaireDescription className="text-foreground/65">
            {copy.name.description}
          </QuestionnaireDescription>
          <QuestionnaireInput
            type="text"
            autoComplete="name"
            placeholder={copy.name.placeholder}
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={pending}
            className={inputClassName}
          />
          <QuestionnaireError>{copy.name.error}</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireItem name="email" required>
          <QuestionnaireTitle className="text-base">
            {copy.email.title}
          </QuestionnaireTitle>
          <QuestionnaireDescription className="text-foreground/65">
            {copy.email.description}
          </QuestionnaireDescription>
          <QuestionnaireInput
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder={copy.email.placeholder}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={pending}
            className={inputClassName}
          />
          <QuestionnaireError>{copy.email.error}</QuestionnaireError>
        </QuestionnaireItem>

        <QuestionnaireItem name="whatsapp" required>
          <QuestionnaireTitle className="text-base">
            {copy.whatsapp.title}
          </QuestionnaireTitle>
          <QuestionnaireDescription className="text-foreground/65">
            {copy.whatsapp.description}
          </QuestionnaireDescription>
          <QuestionnaireInput
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            placeholder={copy.whatsapp.placeholder}
            value={whatsapp}
            onChange={(event) => setWhatsapp(event.target.value)}
            disabled={pending}
            className={inputClassName}
          />
          <QuestionnaireError>{copy.whatsapp.error}</QuestionnaireError>
        </QuestionnaireItem>

        {error ? (
          <p
            className="border-l-2 border-destructive/50 py-1 pl-3 text-xs/relaxed text-pretty text-destructive"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <QuestionnaireActions className="gap-2">
          <QuestionnairePrevious
            size="xl"
            disabled={pending}
            className="border-foreground/25 hover:bg-foreground/5"
          >
            {copy.previousLabel}
          </QuestionnairePrevious>
          <QuestionnaireNext
            size="xl"
            disabled={pending}
            className="bg-foreground text-background hover:bg-foreground/85"
          >
            {copy.nextLabel}
          </QuestionnaireNext>
          <QuestionnaireSubmit
            size="xl"
            disabled={pending}
            className={wompiPayButtonClassName}
          >
            {pending ? copy.submittingLabel : copy.submitLabel}
          </QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>

      <p className="mt-5 border-t border-foreground/12 pt-3 text-xs leading-relaxed text-pretty text-foreground/60">
        {copy.secureNote}
      </p>
    </div>
  )
}

export { RegistrationForm }
