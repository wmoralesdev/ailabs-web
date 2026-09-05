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
import type { GetCompetitiveQuickContent } from "@/events/get-competitive-quick/content"
import { startWorkshopCheckout } from "@/server/workshop-registration"

type RegistrationFormProps = {
  slug: string
  copy: GetCompetitiveQuickContent["form"]
  soldOut: boolean
  soldOutLabel: string
}

const questionnaireItems = [
  { name: "name", required: true },
  { name: "email", required: true },
  { name: "whatsapp", required: true },
] as const

const inputClassName = "min-h-11 text-base sm:min-h-11 md:text-sm"

function RegistrationForm({
  slug,
  copy,
  soldOut,
  soldOutLabel,
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
        <p className="font-mono text-sm font-semibold tracking-[0.14em] text-foreground/85 uppercase">
          {soldOutLabel}
        </p>
      </div>
    )
  }

  return (
    <div className="px-5 py-5 sm:px-6" aria-busy={pending}>
      <p className="font-mono text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
        {copy.eyebrow}
      </p>

      <Questionnaire
        className="mt-4"
        items={[...questionnaireItems]}
        noValidate={false}
        onSubmit={onSubmit}
      >
        <QuestionnaireProgress className="text-xs" />

        <QuestionnaireItem name="name" required>
          <QuestionnaireTitle>{copy.name.title}</QuestionnaireTitle>
          <QuestionnaireDescription>
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
          <QuestionnaireTitle>{copy.email.title}</QuestionnaireTitle>
          <QuestionnaireDescription>
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
          <QuestionnaireTitle>{copy.whatsapp.title}</QuestionnaireTitle>
          <QuestionnaireDescription>
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
          <p className="text-sm/relaxed text-destructive" role="alert">
            {error}
          </p>
        ) : null}

        <QuestionnaireActions className="min-h-11 gap-2">
          <QuestionnairePrevious size="xl" disabled={pending}>
            {copy.previousLabel}
          </QuestionnairePrevious>
          <QuestionnaireNext size="xl" disabled={pending}>
            {copy.nextLabel}
          </QuestionnaireNext>
          <QuestionnaireSubmit size="xl" disabled={pending} className="gap-2">
            {pending ? (
              copy.submittingLabel
            ) : (
              <>
                <img
                  src="/brand/wompi.png"
                  alt=""
                  width={72}
                  height={28}
                  className="h-5 w-auto"
                />
                <span>{copy.submitLabel}</span>
              </>
            )}
          </QuestionnaireSubmit>
        </QuestionnaireActions>
      </Questionnaire>
    </div>
  )
}

export { RegistrationForm }
