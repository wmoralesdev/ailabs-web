"use client"

import { useState } from "react"
import type { FormEvent, ReactNode } from "react"

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
import { Textarea } from "@/components/ui/textarea"
import type {
  ApertureJoinContent,
  ApertureMeContent,
  Locale,
} from "@/content/types"
import { countryOptions, isCountryCode } from "@/lib/aperture/countries"
import { formatMeDate } from "@/lib/aperture/me-date"
import {
  isMemberRole,
  MEMBER_ROLES,
  UP_FOR_OPTIONS,
} from "@/lib/aperture/profile-input"
import type {
  ProfileDraft,
  ProfileFieldError,
  ProfileFieldErrors,
} from "@/lib/aperture/profile-input"
import { cn } from "@/lib/utils"
import { updateMeNewsletter, updateMeProfile } from "@/server/aperture/me"
import type { MeDashboard } from "@/server/aperture/me"

function errorText(
  join: ApertureJoinContent,
  error: ProfileFieldError | undefined
): string | null {
  return error ? join.fieldErrors[error] : null
}

export function MeSettings({
  dashboard,
  join,
  content,
  locale,
  onDashboard,
}: {
  dashboard: MeDashboard
  join: ApertureJoinContent
  content: ApertureMeContent
  locale: Locale
  onDashboard: (dashboard: MeDashboard) => void
}) {
  const [values, setValues] = useState<ProfileDraft>(dashboard.profile)
  const [newsletter, setNewsletter] = useState(dashboard.newsletter)
  const [fieldErrors, setFieldErrors] = useState<ProfileFieldErrors>({})
  const [cooldown, setCooldown] = useState(dashboard.usernameAvailableAt)
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [saved, setSaved] = useState(false)

  function update<TField extends keyof ProfileDraft>(
    key: TField,
    value: ProfileDraft[TField]
  ) {
    setValues((current) => ({ ...current, [key]: value }))
    setSaved(false)
    if (key in fieldErrors) {
      setFieldErrors((current) => {
        const next = { ...current }
        delete next[key]
        return next
      })
    }
  }

  async function onNewsletter(checked: boolean) {
    setNewsletter(checked)
    const result = await updateMeNewsletter({
      data: { granted: checked, locale },
    })
    if (result.status !== "ok") {
      setNewsletter(!checked)
      setFormError(content.error)
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setPending(true)
    try {
      const result = await updateMeProfile({ data: values })
      switch (result.status) {
        case "ok":
          onDashboard(result.dashboard)
          setValues(result.dashboard.profile)
          setCooldown(result.dashboard.usernameAvailableAt)
          setSaved(true)
          return
        case "invalid":
          setFieldErrors(result.fieldErrors)
          return
        case "username_taken":
          setFieldErrors({ username: "taken" })
          return
        case "username_cooldown":
          setCooldown(result.availableAt)
          setFormError(
            content.usernameCooldown.replace(
              "{date}",
              formatMeDate(result.availableAt, locale)
            )
          )
          return
        case "unauthenticated":
        case "no_member":
        case "retired":
          setFormError(content.error)
          return
        default: {
          const unhandled: never = result
          throw new Error(`Unhandled save ${JSON.stringify(unhandled)}`)
        }
      }
    } catch {
      setFormError(content.error)
    } finally {
      setPending(false)
    }
  }

  const countries = countryOptions(locale)
  const cooldownText = cooldown
    ? content.usernameCooldown.replace("{date}", formatMeDate(cooldown, locale))
    : null

  return (
    <form
      className="flex flex-col gap-8"
      onSubmit={(event) => void onSubmit(event)}
    >
      <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
        {content.settingsTitle}
      </h2>

      <SettingsGroup legend={content.settingsGroups.profile}>
        <Field data-invalid={Boolean(fieldErrors.username) || undefined}>
          <FieldLabel htmlFor="me-username">
            {join.fields.username.label}
          </FieldLabel>
          <Input
            id="me-username"
            size="xl"
            value={values.username}
            aria-invalid={Boolean(fieldErrors.username) || undefined}
            onChange={(event) => update("username", event.target.value)}
          />
          <FieldDescription>
            {cooldownText ?? join.fields.username.helper}
          </FieldDescription>
          <FieldError>{errorText(join, fieldErrors.username)}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.displayName) || undefined}>
          <FieldLabel htmlFor="me-display-name">
            {join.fields.displayName.label}
          </FieldLabel>
          <Input
            id="me-display-name"
            size="xl"
            value={values.displayName}
            aria-invalid={Boolean(fieldErrors.displayName) || undefined}
            onChange={(event) => update("displayName", event.target.value)}
          />
          <FieldError>{errorText(join, fieldErrors.displayName)}</FieldError>
        </Field>

        <Field
          className="md:col-span-2"
          data-invalid={Boolean(fieldErrors.headline) || undefined}
        >
          <FieldLabel htmlFor="me-headline">
            {join.fields.headline.label}
          </FieldLabel>
          <Input
            id="me-headline"
            size="xl"
            value={values.headline}
            aria-invalid={Boolean(fieldErrors.headline) || undefined}
            onChange={(event) => update("headline", event.target.value)}
          />
          <FieldError>{errorText(join, fieldErrors.headline)}</FieldError>
        </Field>

        <Field
          className="md:col-span-2"
          data-invalid={Boolean(fieldErrors.bio) || undefined}
        >
          <FieldLabel htmlFor="me-bio">{content.fields.bio.label}</FieldLabel>
          <Textarea
            id="me-bio"
            size="xl"
            value={values.bio ?? ""}
            placeholder={content.fields.bio.placeholder}
            aria-invalid={Boolean(fieldErrors.bio) || undefined}
            onChange={(event) => update("bio", event.target.value || null)}
          />
          <FieldDescription>{content.fields.bio.helper}</FieldDescription>
          <FieldError>{errorText(join, fieldErrors.bio)}</FieldError>
        </Field>
      </SettingsGroup>

      <SettingsGroup legend={content.settingsGroups.location} columns={3}>
        <Field data-invalid={Boolean(fieldErrors.countryCode) || undefined}>
          <FieldLabel htmlFor="me-country">
            {join.fields.country.label}
          </FieldLabel>
          <NativeSelect
            id="me-country"
            size="xl"
            className="w-full"
            value={values.countryCode}
            onChange={(event) => {
              if (isCountryCode(event.target.value)) {
                update("countryCode", event.target.value)
              }
            }}
          >
            {countries.map((country) => (
              <NativeSelectOption key={country.code} value={country.code}>
                {country.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldError>{errorText(join, fieldErrors.countryCode)}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.city) || undefined}>
          <FieldLabel htmlFor="me-city">{content.fields.city.label}</FieldLabel>
          <Input
            id="me-city"
            size="xl"
            value={values.city ?? ""}
            placeholder={content.fields.city.placeholder}
            onChange={(event) => update("city", event.target.value || null)}
          />
          <FieldError>{errorText(join, fieldErrors.city)}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.role) || undefined}>
          <FieldLabel htmlFor="me-role">{join.fields.role.label}</FieldLabel>
          <NativeSelect
            id="me-role"
            size="xl"
            className="w-full"
            value={values.role}
            onChange={(event) => {
              if (isMemberRole(event.target.value)) {
                update("role", event.target.value)
              }
            }}
          >
            {MEMBER_ROLES.map((role) => (
              <NativeSelectOption key={role} value={role}>
                {join.roleOptions[role]}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <FieldError>{errorText(join, fieldErrors.role)}</FieldError>
        </Field>

        <FieldSet className="md:col-span-2 lg:col-span-3">
          <FieldLegend variant="label" className="mb-0 text-sm">
            {join.fields.upFor.label}
          </FieldLegend>
          <div className="flex flex-wrap gap-2">
            {UP_FOR_OPTIONS.map((option) => (
              <label
                key={option}
                htmlFor={`me-up-for-${option.toLowerCase()}`}
                className={apertureChoiceChipClassName}
              >
                <Checkbox
                  id={`me-up-for-${option.toLowerCase()}`}
                  checked={values.upFor.includes(option)}
                  disabled={pending}
                  onCheckedChange={(checked) =>
                    update(
                      "upFor",
                      checked === true
                        ? [...values.upFor, option]
                        : values.upFor.filter((value) => value !== option)
                    )
                  }
                />
                <span>{join.upForOptions[option]}</span>
              </label>
            ))}
          </div>
        </FieldSet>
      </SettingsGroup>

      <SettingsGroup legend={content.settingsGroups.links}>
        {(
          [
            ["linkedinUrl", "linkedin"],
            ["xUrl", "x"],
            ["githubUrl", "github"],
            ["websiteUrl", "website"],
            ["instagramUrl", "instagram"],
          ] as const
        ).map(([key, field]) => (
          <Field
            key={key}
            data-invalid={Boolean(fieldErrors[key]) || undefined}
          >
            <FieldLabel htmlFor={`me-${field}`}>
              {content.fields[field].label}
            </FieldLabel>
            <Input
              id={`me-${field}`}
              size="xl"
              type="url"
              value={values[key] ?? ""}
              placeholder={content.fields[field].placeholder}
              aria-invalid={Boolean(fieldErrors[key]) || undefined}
              onChange={(event) => update(key, event.target.value || null)}
            />
            <FieldError>{errorText(join, fieldErrors[key])}</FieldError>
          </Field>
        ))}
      </SettingsGroup>

      <SettingsGroup legend={content.settingsGroups.visibility} columns={1}>
        <label
          htmlFor="me-show-events"
          className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug"
        >
          <Checkbox
            id="me-show-events"
            checked={values.showEvents}
            disabled={pending}
            onCheckedChange={(checked) =>
              update("showEvents", checked === true)
            }
          />
          <span>
            {content.showEventsLabel}
            <span className="mt-1 block text-xs text-muted-foreground">
              {content.showEventsHelper}
            </span>
          </span>
        </label>

        <label
          htmlFor="me-newsletter"
          className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug"
        >
          <Checkbox
            id="me-newsletter"
            checked={newsletter}
            disabled={pending}
            onCheckedChange={(checked) => void onNewsletter(checked === true)}
          />
          <span>{content.newsletterLabel}</span>
        </label>
      </SettingsGroup>

      {formError ? <FieldError>{formError}</FieldError> : null}

      <div className="flex flex-wrap items-center gap-3 border-t border-border pt-6">
        <button
          type="submit"
          className={cn(homePillClassName, "w-fit")}
          disabled={pending}
        >
          {pending ? (
            <>
              <Spinner />
              {content.saving}
            </>
          ) : (
            content.save
          )}
        </button>
        {saved ? (
          <p role="status" className="text-sm text-muted-foreground">
            {content.saved}
          </p>
        ) : null}
      </div>
    </form>
  )
}

function SettingsGroup({
  legend,
  columns = 2,
  children,
}: {
  legend: string
  /** 1 stacks the controls; 3 fits short fields on one row from `lg`. */
  columns?: 1 | 2 | 3
  children: ReactNode
}) {
  return (
    <FieldSet className="gap-5 border-t border-border pt-6">
      <FieldLegend className="mb-0 font-display text-base font-semibold tracking-tight text-foreground">
        {legend}
      </FieldLegend>
      <FieldGroup
        className={cn(
          columns > 1 && "grid gap-x-6 gap-y-5 md:grid-cols-2",
          columns === 3 && "lg:grid-cols-3"
        )}
      >
        {children}
      </FieldGroup>
    </FieldSet>
  )
}
