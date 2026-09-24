"use client"

import { useEffect, useState } from "react"
import type { FormEvent } from "react"
import { Link } from "@tanstack/react-router"
import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"

import { apertureChoiceChipClassName } from "@/components/aperture/aperture-styles"
import { homePillClassName } from "@/components/home/home-styles"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select"
import { Spinner } from "@/components/ui/spinner"
import type { ApertureJoinContent, Locale } from "@/content/types"
import { parseClaimForm } from "@/lib/aperture/claim-input"
import { countryOptions } from "@/lib/aperture/countries"
import { MEMBER_ROLES, UP_FOR_OPTIONS } from "@/lib/aperture/profile-input"
import type {
  ProfileFieldError,
  ProfileFieldErrors,
} from "@/lib/aperture/profile-input"
import { cn } from "@/lib/utils"
import { checkUsername, claimApertureMembership } from "@/server/aperture/claim"
import type { UsernameCheck } from "@/server/aperture/username-lookup"

const USERNAME_CHECK_MS = 400

export type JoinFormClaimed = {
  number: number
  username: string
}

type JoinFormValues = {
  username: string
  displayName: string
  headline: string
  countryCode: string
  role: string
  upFor: string[]
  acceptLegal: boolean
  acceptAge: boolean
  marketing: boolean
}

function emptyValues(displayName: string): JoinFormValues {
  return {
    username: "",
    displayName,
    headline: "",
    countryCode: "SV",
    role: "",
    upFor: [],
    acceptLegal: false,
    acceptAge: false,
    marketing: false,
  }
}

function errorText(
  content: ApertureJoinContent,
  error: ProfileFieldError | undefined
): string | null {
  return error ? content.fieldErrors[error] : null
}

function LegalAcceptLabel({ content }: { content: ApertureJoinContent }) {
  const parts = content.legalAccept.split(/(\{terms\}|\{privacy\})/)
  return (
    <span>
      {parts.map((part, index) => {
        if (part === "{terms}") {
          return (
            <Link
              key={`terms-${index}`}
              to="/terms"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {content.legalTerms}
            </Link>
          )
        }
        if (part === "{privacy}") {
          return (
            <Link
              key={`privacy-${index}`}
              to="/privacy"
              className="underline underline-offset-4 hover:text-foreground"
            >
              {content.legalPrivacy}
            </Link>
          )
        }
        return <span key={`text-${index}`}>{part}</span>
      })}
    </span>
  )
}

export function JoinForm({
  content,
  locale,
  displayName,
  onClaimed,
}: {
  content: ApertureJoinContent
  locale: Locale
  displayName: string
  onClaimed: (result: JoinFormClaimed) => void
}) {
  const [values, setValues] = useState(() => emptyValues(displayName))
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({})
  const [usernameCheck, setUsernameCheck] = useState<UsernameCheck | null>(null)
  const [checkingUsername, setCheckingUsername] = useState(false)
  const [consentError, setConsentError] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  useEffect(() => {
    const username = values.username.trim()
    if (!username) {
      setUsernameCheck(null)
      setCheckingUsername(false)
      return
    }

    let cancelled = false
    setCheckingUsername(true)
    const timer = window.setTimeout(() => {
      void checkUsername({ data: { username } })
        .then((result) => {
          if (!cancelled) {
            setUsernameCheck(result)
          }
        })
        .catch(() => {
          if (!cancelled) {
            setUsernameCheck(null)
          }
        })
        .finally(() => {
          if (!cancelled) {
            setCheckingUsername(false)
          }
        })
    }, USERNAME_CHECK_MS)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [values.username])

  function update<TField extends keyof JoinFormValues>(
    key: TField,
    value: JoinFormValues[TField]
  ) {
    setValues((current) => ({ ...current, [key]: value }))
    if (key in fieldErrors) {
      setFieldErrors((current) => {
        const next = { ...current }
        delete next[key as keyof ProfileFieldErrors]
        return next
      })
    }
    if (key === "acceptLegal" || key === "acceptAge") {
      setConsentError(false)
    }
  }

  function toggleUpFor(option: string, checked: boolean) {
    update(
      "upFor",
      checked
        ? [...values.upFor, option]
        : values.upFor.filter((value) => value !== option)
    )
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    const payload = {
      username: values.username,
      displayName: values.displayName,
      headline: values.headline,
      countryCode: values.countryCode,
      role: values.role,
      upFor: values.upFor,
      acceptLegal: values.acceptLegal,
      acceptAge: values.acceptAge,
      marketing: values.marketing,
      locale,
    }
    const parsed = parseClaimForm(payload)
    if (!parsed.ok) {
      if (parsed.status === "invalid") {
        setFieldErrors(parsed.fieldErrors)
      } else {
        setConsentError(true)
      }
      return
    }
    setPending(true)
    try {
      const result = await claimApertureMembership({
        data: payload,
      })

      switch (result.status) {
        case "claimed":
        case "existing":
          onClaimed({ number: result.number, username: result.username })
          return
        case "invalid":
          setFieldErrors(result.fieldErrors)
          return
        case "consent_required":
          setConsentError(true)
          return
        case "username_taken":
          setFieldErrors({ username: "taken" })
          setUsernameCheck("taken")
          return
        case "closed":
          setFormError(content.error)
          return
        case "unauthenticated":
        case "no_verified_email":
        case "retired":
          setFormError(content.error)
          return
        default: {
          const unhandled: never = result
          throw new Error(`Unhandled claim ${JSON.stringify(unhandled)}`)
        }
      }
    } catch {
      setFormError(content.error)
    } finally {
      setPending(false)
    }
  }

  const usernameError = errorText(
    content,
    fieldErrors.username ??
      (usernameCheck === "taken" ||
      usernameCheck === "reserved" ||
      usernameCheck === "invalid"
        ? usernameCheck
        : undefined)
  )
  const usernameStatus = checkingUsername
    ? content.usernameChecking
    : usernameCheck === "available" && !fieldErrors.username
      ? content.usernameAvailable
      : null

  const countries = countryOptions(locale)

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={(event) => void onSubmit(event)}
    >
      <FieldGroup>
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
          <Field data-invalid={Boolean(fieldErrors.username) || undefined}>
            <FieldLabel htmlFor="join-username">
              {content.fields.username.label}
            </FieldLabel>
            <Input
              id="join-username"
              size="xl"
              autoComplete="username"
              placeholder={content.fields.username.placeholder}
              value={values.username}
              aria-invalid={Boolean(fieldErrors.username) || undefined}
              onChange={(event) => update("username", event.target.value)}
            />
            <FieldDescription>
              {usernameStatus ?? content.fields.username.helper}
            </FieldDescription>
            <FieldError>{usernameError}</FieldError>
          </Field>

          <Field data-invalid={Boolean(fieldErrors.displayName) || undefined}>
            <FieldLabel htmlFor="join-display-name">
              {content.fields.displayName.label}
            </FieldLabel>
            <Input
              id="join-display-name"
              size="xl"
              autoComplete="name"
              placeholder={content.fields.displayName.placeholder}
              value={values.displayName}
              aria-invalid={Boolean(fieldErrors.displayName) || undefined}
              onChange={(event) => update("displayName", event.target.value)}
            />
            <FieldError>
              {errorText(content, fieldErrors.displayName)}
            </FieldError>
          </Field>
        </div>

        <Field data-invalid={Boolean(fieldErrors.headline) || undefined}>
          <FieldLabel htmlFor="join-headline">
            {content.fields.headline.label}
          </FieldLabel>
          <Input
            id="join-headline"
            size="xl"
            placeholder={content.fields.headline.placeholder}
            value={values.headline}
            aria-invalid={Boolean(fieldErrors.headline) || undefined}
            onChange={(event) => update("headline", event.target.value)}
          />
          <FieldDescription>{content.fields.headline.helper}</FieldDescription>
          <FieldError>{errorText(content, fieldErrors.headline)}</FieldError>
        </Field>

        <div className="grid gap-6 sm:grid-cols-2 sm:gap-4">
          <Field data-invalid={Boolean(fieldErrors.countryCode) || undefined}>
            <FieldLabel htmlFor="join-country">
              {content.fields.country.label}
            </FieldLabel>
            <NativeSelect
              id="join-country"
              size="xl"
              className="w-full"
              value={values.countryCode}
              aria-invalid={Boolean(fieldErrors.countryCode) || undefined}
              onChange={(event) => update("countryCode", event.target.value)}
            >
              <NativeSelectOption value="" disabled>
                {content.fields.country.placeholder}
              </NativeSelectOption>
              {countries.map((country) => (
                <NativeSelectOption key={country.code} value={country.code}>
                  {country.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>
              {errorText(content, fieldErrors.countryCode)}
            </FieldError>
          </Field>

          <Field data-invalid={Boolean(fieldErrors.role) || undefined}>
            <FieldLabel htmlFor="join-role">
              {content.fields.role.label}
            </FieldLabel>
            <NativeSelect
              id="join-role"
              size="xl"
              className="w-full"
              value={values.role}
              aria-invalid={Boolean(fieldErrors.role) || undefined}
              onChange={(event) => update("role", event.target.value)}
            >
              <NativeSelectOption value="" disabled>
                {content.fields.role.placeholder}
              </NativeSelectOption>
              {MEMBER_ROLES.map((role) => (
                <NativeSelectOption key={role} value={role}>
                  {content.roleOptions[role]}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <FieldError>{errorText(content, fieldErrors.role)}</FieldError>
          </Field>
        </div>

        <FieldSet>
          <FieldLegend>{content.fields.upFor.label}</FieldLegend>
          <FieldDescription>{content.fields.upFor.helper}</FieldDescription>
          <div className="flex flex-wrap gap-2">
            {UP_FOR_OPTIONS.map((option) => (
              <label
                key={option}
                htmlFor={`join-up-for-${option.toLowerCase()}`}
                className={apertureChoiceChipClassName}
              >
                <Checkbox
                  id={`join-up-for-${option.toLowerCase()}`}
                  checked={values.upFor.includes(option)}
                  disabled={pending}
                  onCheckedChange={(checked) =>
                    toggleUpFor(option, checked === true)
                  }
                />
                <span>{content.upForOptions[option]}</span>
              </label>
            ))}
          </div>
        </FieldSet>

        <FieldSet className="rounded-2xl border border-border bg-muted/40 p-4 sm:p-5">
          <div className="flex flex-col gap-3.5">
            <label
              htmlFor="join-legal"
              className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-foreground"
            >
              <Checkbox
                id="join-legal"
                checked={values.acceptLegal}
                disabled={pending}
                aria-invalid={consentError || undefined}
                onCheckedChange={(checked) =>
                  update("acceptLegal", checked === true)
                }
              />
              <LegalAcceptLabel content={content} />
            </label>
            <label
              htmlFor="join-age"
              className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-foreground"
            >
              <Checkbox
                id="join-age"
                checked={values.acceptAge}
                disabled={pending}
                aria-invalid={consentError || undefined}
                onCheckedChange={(checked) =>
                  update("acceptAge", checked === true)
                }
              />
              <span>{content.ageAccept}</span>
            </label>
            <label
              htmlFor="join-newsletter"
              className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-muted-foreground"
            >
              <Checkbox
                id="join-newsletter"
                checked={values.marketing}
                disabled={pending}
                onCheckedChange={(checked) =>
                  update("marketing", checked === true)
                }
              />
              <span>{content.newsletterAccept}</span>
            </label>
          </div>
          {consentError ? (
            <FieldError>{content.fieldErrors.required}</FieldError>
          ) : null}
        </FieldSet>
      </FieldGroup>

      {formError ? <FieldError>{formError}</FieldError> : null}

      <button
        type="submit"
        className={cn(homePillClassName, "w-fit")}
        disabled={pending}
      >
        {pending ? (
          <>
            <Spinner />
            {content.submitting}
          </>
        ) : (
          <>
            {content.submit}
            <HugeiconsIcon icon={ArrowRight01Icon} strokeWidth={2} />
          </>
        )}
      </button>
    </form>
  )
}
