"use client"

import { useState } from "react"
import type { FormEvent } from "react"

import { homePillClassName } from "@/components/home/home-styles"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { Textarea } from "@/components/ui/textarea"
import type { ApertureMeContent } from "@/content/types"
import { PROJECT_LIMITS } from "@/lib/aperture/project-input"
import type {
  BuiltWithPart,
  ProjectDraft,
  ProjectFieldError,
  ProjectFieldErrors,
} from "@/lib/aperture/project-input"
import { cn } from "@/lib/utils"
import {
  createMeProject,
  createMeProjectImageUpload,
  deleteMeProject,
  updateMeProject,
} from "@/server/aperture/me"
import type { MeDashboard, MeProject } from "@/server/aperture/me"

function emptyDraft(): ProjectDraft {
  return {
    title: "",
    summary: "",
    url: null,
    repoUrl: null,
    imageKey: null,
    published: true,
    builtWith: [{ name: "", percent: 100 }],
  }
}

function draftFromProject(project: MeProject): ProjectDraft {
  return {
    title: project.title,
    summary: project.summary,
    url: project.url,
    repoUrl: project.repoUrl,
    imageKey: project.imageKey,
    published: project.published,
    builtWith: project.builtWith,
  }
}

function errorText(
  content: ApertureMeContent,
  error: ProjectFieldError | undefined
): string | null {
  return error ? content.projectErrors[error] : null
}

export function MeProjects({
  dashboard,
  content,
  onDashboard,
}: {
  dashboard: MeDashboard
  content: ApertureMeContent
  onDashboard: (dashboard: MeDashboard) => void
}) {
  const [editingId, setEditingId] = useState<string | "new" | null>(null)

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h2 className="font-display text-xl font-semibold tracking-tight text-foreground">
          {content.projectsTitle}
        </h2>
        <p className="text-sm text-muted-foreground">
          {content.projectsHelper}
        </p>
      </div>

      {dashboard.projects.length === 0 && editingId !== "new" ? (
        <p className="text-sm text-muted-foreground">{content.projectsEmpty}</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {dashboard.projects.map((project) =>
            editingId === project.id ? (
              <li key={project.id}>
                <ProjectEditor
                  content={content}
                  initial={draftFromProject(project)}
                  imageUrl={project.imageUrl}
                  projectId={project.id}
                  onCancel={() => setEditingId(null)}
                  onDashboard={(next) => {
                    onDashboard(next)
                    setEditingId(null)
                  }}
                />
              </li>
            ) : (
              <li
                key={project.id}
                className="flex flex-col gap-2 rounded-2xl border border-border/60 bg-background/70 p-4"
              >
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt=""
                    className="h-28 w-full rounded-xl border border-border object-cover"
                  />
                ) : null}
                <p className="font-medium text-foreground">{project.title}</p>
                <p className="text-sm text-muted-foreground">
                  {project.summary}
                </p>
                <p className="text-xs text-muted-foreground">
                  {project.builtWith
                    .map((part) => `${part.name} ${part.percent}%`)
                    .join(" · ")}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    className="text-sm font-medium text-foreground underline underline-offset-4"
                    onClick={() => setEditingId(project.id)}
                  >
                    {content.editProject}
                  </button>
                  <DeleteButton
                    projectId={project.id}
                    content={content}
                    onDashboard={onDashboard}
                  />
                </div>
              </li>
            )
          )}
        </ul>
      )}

      {editingId === "new" ? (
        <ProjectEditor
          content={content}
          initial={emptyDraft()}
          onCancel={() => setEditingId(null)}
          onDashboard={(next) => {
            onDashboard(next)
            setEditingId(null)
          }}
        />
      ) : dashboard.projects.length >= PROJECT_LIMITS.maxProjects ? (
        <p className="text-sm text-muted-foreground">{content.projectLimit}</p>
      ) : (
        <button
          type="button"
          className={cn(homePillClassName, "w-fit")}
          onClick={() => setEditingId("new")}
        >
          {content.addProject}
        </button>
      )}
    </section>
  )
}

function ProjectEditor({
  content,
  initial,
  imageUrl,
  projectId,
  onCancel,
  onDashboard,
}: {
  content: ApertureMeContent
  initial: ProjectDraft
  imageUrl?: string | null
  projectId?: string
  onCancel: () => void
  onDashboard: (dashboard: MeDashboard) => void
}) {
  const [values, setValues] = useState<ProjectDraft>(initial)
  const [fieldErrors, setFieldErrors] = useState<ProjectFieldErrors>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(imageUrl ?? null)

  function setPart(index: number, next: BuiltWithPart) {
    setValues((current) => ({
      ...current,
      builtWith: current.builtWith.map((part, partIndex) =>
        partIndex === index ? next : part
      ),
    }))
  }

  async function uploadIfNeeded(): Promise<ProjectDraft | null> {
    if (!file) {
      return values
    }
    const signed = await createMeProjectImageUpload({
      data: { contentType: file.type, byteLength: file.size },
    })
    if (signed.status === "unavailable") {
      setFormError(content.imageUnavailable)
      return null
    }
    if (signed.status !== "ok") {
      setFieldErrors({ imageKey: "invalid" })
      return null
    }
    const put = await fetch(signed.uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": file.type },
      body: file,
    })
    if (!put.ok) {
      setFormError(content.error)
      return null
    }
    return { ...values, imageKey: signed.key }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)
    setPending(true)
    try {
      const payload = await uploadIfNeeded()
      if (!payload) {
        return
      }
      const result = projectId
        ? await updateMeProject({
            data: { id: projectId, project: payload },
          })
        : await createMeProject({ data: payload })
      switch (result.status) {
        case "ok":
          onDashboard(result.dashboard)
          return
        case "invalid":
          setFieldErrors(result.fieldErrors)
          return
        case "limit":
          setFormError(content.projectLimit)
          return
        case "unauthenticated":
        case "no_member":
        case "retired":
        case "not_found":
          setFormError(content.error)
          return
        default: {
          const unhandled: never = result
          throw new Error(`Unhandled project save ${JSON.stringify(unhandled)}`)
        }
      }
    } catch {
      setFormError(content.error)
    } finally {
      setPending(false)
    }
  }

  return (
    <form
      className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-5"
      onSubmit={(event) => void onSubmit(event)}
    >
      <FieldGroup>
        <Field data-invalid={Boolean(fieldErrors.title) || undefined}>
          <FieldLabel htmlFor="project-title">
            {content.fields.title.label}
          </FieldLabel>
          <Input
            id="project-title"
            size="xl"
            value={values.title}
            placeholder={content.fields.title.placeholder}
            aria-invalid={Boolean(fieldErrors.title) || undefined}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                title: event.target.value,
              }))
            }
          />
          <FieldError>{errorText(content, fieldErrors.title)}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.summary) || undefined}>
          <FieldLabel htmlFor="project-summary">
            {content.fields.summary.label}
          </FieldLabel>
          <Textarea
            id="project-summary"
            size="xl"
            value={values.summary}
            placeholder={content.fields.summary.placeholder}
            aria-invalid={Boolean(fieldErrors.summary) || undefined}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                summary: event.target.value,
              }))
            }
          />
          <FieldDescription>{content.fields.summary.helper}</FieldDescription>
          <FieldError>{errorText(content, fieldErrors.summary)}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.url) || undefined}>
          <FieldLabel htmlFor="project-url">
            {content.fields.url.label}
          </FieldLabel>
          <Input
            id="project-url"
            size="xl"
            value={values.url ?? ""}
            placeholder={content.fields.url.placeholder}
            aria-invalid={Boolean(fieldErrors.url) || undefined}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                url: event.target.value || null,
              }))
            }
          />
          <FieldError>{errorText(content, fieldErrors.url)}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.repoUrl) || undefined}>
          <FieldLabel htmlFor="project-repo">
            {content.fields.repoUrl.label}
          </FieldLabel>
          <Input
            id="project-repo"
            size="xl"
            value={values.repoUrl ?? ""}
            placeholder={content.fields.repoUrl.placeholder}
            aria-invalid={Boolean(fieldErrors.repoUrl) || undefined}
            onChange={(event) =>
              setValues((current) => ({
                ...current,
                repoUrl: event.target.value || null,
              }))
            }
          />
          <FieldError>{errorText(content, fieldErrors.repoUrl)}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.imageKey) || undefined}>
          <FieldLabel htmlFor="project-image">{content.imageLabel}</FieldLabel>
          {preview ? (
            <img
              src={preview}
              alt=""
              className="h-36 w-full rounded-xl border border-border object-cover"
            />
          ) : null}
          <Input
            id="project-image"
            size="xl"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            aria-invalid={Boolean(fieldErrors.imageKey) || undefined}
            onChange={(event) => {
              const next = event.target.files?.[0] ?? null
              setFile(next)
              setPreview(next ? URL.createObjectURL(next) : preview)
            }}
          />
          <FieldDescription>{content.imageHelper}</FieldDescription>
          {values.imageKey || preview ? (
            <button
              type="button"
              className="w-fit text-sm font-medium text-foreground underline underline-offset-4"
              onClick={() => {
                setFile(null)
                setPreview(null)
                setValues((current) => ({ ...current, imageKey: null }))
              }}
            >
              {content.removeImage}
            </button>
          ) : null}
          <FieldError>{errorText(content, fieldErrors.imageKey)}</FieldError>
        </Field>

        <Field data-invalid={Boolean(fieldErrors.builtWith) || undefined}>
          <FieldLabel>{content.builtWithTitle}</FieldLabel>
          <FieldDescription>{content.builtWithHelper}</FieldDescription>
          <ul className="flex flex-col gap-2">
            {values.builtWith.map((part, index) => (
              <li key={index} className="grid grid-cols-[1fr_5rem_auto] gap-2">
                <Input
                  size="xl"
                  aria-label={content.toolNameLabel}
                  value={part.name}
                  onChange={(event) =>
                    setPart(index, { ...part, name: event.target.value })
                  }
                />
                <Input
                  size="xl"
                  type="number"
                  min={1}
                  max={100}
                  aria-label={content.percentLabel}
                  value={part.percent}
                  onChange={(event) =>
                    setPart(index, {
                      ...part,
                      percent: Number(event.target.value),
                    })
                  }
                />
                {values.builtWith.length > 1 ? (
                  <button
                    type="button"
                    className="text-sm text-muted-foreground underline underline-offset-4"
                    onClick={() =>
                      setValues((current) => ({
                        ...current,
                        builtWith: current.builtWith.filter(
                          (_, partIndex) => partIndex !== index
                        ),
                      }))
                    }
                  >
                    {content.removeTool}
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
          {values.builtWith.length < PROJECT_LIMITS.maxParts ? (
            <button
              type="button"
              className="w-fit text-sm font-medium text-foreground underline underline-offset-4"
              onClick={() =>
                setValues((current) => ({
                  ...current,
                  builtWith: [...current.builtWith, { name: "", percent: 1 }],
                }))
              }
            >
              {content.addTool}
            </button>
          ) : null}
          <FieldError>{errorText(content, fieldErrors.builtWith)}</FieldError>
        </Field>

        <label className="flex items-start gap-3 text-sm text-foreground">
          <Checkbox
            checked={values.published}
            onCheckedChange={(checked) =>
              setValues((current) => ({
                ...current,
                published: checked === true,
              }))
            }
          />
          <span>{content.publishedLabel}</span>
        </label>
      </FieldGroup>

      {formError ? (
        <p className="text-sm text-destructive">{formError}</p>
      ) : null}

      <div className="flex flex-wrap gap-3">
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
            content.saveProject
          )}
        </button>
        <button
          type="button"
          className="text-sm font-medium text-muted-foreground underline underline-offset-4"
          onClick={onCancel}
        >
          {content.cancelProject}
        </button>
      </div>
    </form>
  )
}

function DeleteButton({
  projectId,
  content,
  onDashboard,
}: {
  projectId: string
  content: ApertureMeContent
  onDashboard: (dashboard: MeDashboard) => void
}) {
  const [pending, setPending] = useState(false)

  async function onDelete() {
    setPending(true)
    try {
      const result = await deleteMeProject({ data: { id: projectId } })
      if (result.status === "ok") {
        onDashboard(result.dashboard)
        return
      }
    } finally {
      setPending(false)
    }
  }

  return (
    <button
      type="button"
      className="text-sm font-medium text-muted-foreground underline underline-offset-4"
      disabled={pending}
      onClick={() => void onDelete()}
    >
      {content.deleteProject}
    </button>
  )
}
