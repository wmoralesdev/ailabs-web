import type { PrismaClient } from "../../generated/prisma/client"
import {
  parseProjectInput,
  PROJECT_LIMITS,
  slugFromTitle,
} from "@/lib/aperture/project-input"
import { isOwnedProjectImageKey } from "@/lib/aperture/project-image"
import type {
  BuiltWithPart,
  ProjectDraft,
  ProjectFieldErrors,
} from "@/lib/aperture/project-input"
import { deleteProjectImage, publicProjectImageUrl } from "@/server/aperture/r2"

export type MeProject = {
  id: string
  slug: string
  title: string
  summary: string
  url: string | null
  repoUrl: string | null
  imageKey: string | null
  imageUrl: string | null
  published: boolean
  builtWith: BuiltWithPart[]
}

export type PublicProject = Omit<MeProject, "published" | "imageKey">

export type WriteProjectResult =
  | { status: "ok"; project: MeProject }
  | { status: "no_member" }
  | { status: "retired" }
  | { status: "invalid"; fieldErrors: ProjectFieldErrors }
  | { status: "limit" }
  | { status: "not_found" }

function mapProject(row: {
  id: string
  slug: string
  title: string
  summary: string
  url: string | null
  repoUrl: string | null
  imageKey: string | null
  published: boolean
  builtWith: Array<{ name: string; percent: number }>
}): MeProject {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summary: row.summary,
    url: row.url,
    repoUrl: row.repoUrl,
    imageKey: row.imageKey,
    imageUrl: publicProjectImageUrl(row.imageKey),
    published: row.published,
    builtWith: row.builtWith.map((part) => ({
      name: part.name,
      percent: part.percent,
    })),
  }
}

function ownedImageKey(
  memberNumber: number,
  imageKey: string | null,
  errors: ProjectFieldErrors
): string | null {
  if (!imageKey) {
    return null
  }
  if (!isOwnedProjectImageKey(imageKey, memberNumber)) {
    errors.imageKey = "invalid"
    return null
  }
  return imageKey
}

async function nextSlug(
  db: PrismaClient,
  memberNumber: number,
  title: string,
  excludeId?: string
): Promise<string> {
  const base = slugFromTitle(title)
  for (let n = 1; n < 50; n += 1) {
    const slug = n === 1 ? base : `${base.slice(0, 36)}-${n}`
    const existing = await db.project.findUnique({
      where: { memberNumber_slug: { memberNumber, slug } },
      select: { id: true },
    })
    if (!existing || existing.id === excludeId) {
      return slug
    }
  }
  return `${base.slice(0, 24)}-${Date.now().toString(36)}`
}

async function requireActiveMember(
  db: PrismaClient,
  clerkUserId: string
): Promise<
  { status: "ok"; number: number } | { status: "no_member" | "retired" }
> {
  const member = await db.member.findUnique({
    where: { clerkUserId },
    select: {
      number: true,
      retiredAt: true,
      profile: { select: { username: true } },
    },
  })
  if (!member) {
    return { status: "no_member" }
  }
  if (member.retiredAt || !member.profile) {
    return member.retiredAt ? { status: "retired" } : { status: "no_member" }
  }
  return { status: "ok", number: member.number }
}

export async function listMemberProjects(
  db: PrismaClient,
  memberNumber: number,
  publicOnly = false
): Promise<MeProject[]> {
  const rows = await db.project.findMany({
    where: {
      memberNumber,
      hiddenAt: null,
      ...(publicOnly ? { published: true } : {}),
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    include: { builtWith: { orderBy: { sortOrder: "asc" } } },
  })
  return rows.map(mapProject)
}

export async function createProject(
  db: PrismaClient,
  clerkUserId: string,
  input: unknown
): Promise<WriteProjectResult> {
  const parsed = parseProjectInput(input)
  if (!parsed.ok) {
    return { status: "invalid", fieldErrors: parsed.fieldErrors }
  }
  const member = await requireActiveMember(db, clerkUserId)
  if (member.status !== "ok") {
    return member
  }
  const count = await db.project.count({
    where: { memberNumber: member.number },
  })
  if (count >= PROJECT_LIMITS.maxProjects) {
    return { status: "limit" }
  }
  const imageErrors: ProjectFieldErrors = {}
  const imageKey = ownedImageKey(
    member.number,
    parsed.draft.imageKey,
    imageErrors
  )
  if (imageErrors.imageKey) {
    return { status: "invalid", fieldErrors: imageErrors }
  }
  const slug = await nextSlug(db, member.number, parsed.draft.title)
  const created = await db.project.create({
    data: {
      memberNumber: member.number,
      slug,
      title: parsed.draft.title,
      summary: parsed.draft.summary,
      url: parsed.draft.url,
      repoUrl: parsed.draft.repoUrl,
      imageKey,
      published: parsed.draft.published,
      sortOrder: count,
      builtWith: {
        create: parsed.draft.builtWith.map((part, index) => ({
          name: part.name,
          percent: part.percent,
          sortOrder: index,
        })),
      },
    },
    include: { builtWith: { orderBy: { sortOrder: "asc" } } },
  })
  return { status: "ok", project: mapProject(created) }
}

export async function updateProject(
  db: PrismaClient,
  clerkUserId: string,
  projectId: string,
  input: unknown
): Promise<WriteProjectResult> {
  const parsed = parseProjectInput(input)
  if (!parsed.ok) {
    return { status: "invalid", fieldErrors: parsed.fieldErrors }
  }
  const member = await requireActiveMember(db, clerkUserId)
  if (member.status !== "ok") {
    return member
  }
  const existing = await db.project.findFirst({
    where: { id: projectId, memberNumber: member.number },
    select: { id: true, slug: true, title: true, imageKey: true },
  })
  if (!existing) {
    return { status: "not_found" }
  }
  const imageErrors: ProjectFieldErrors = {}
  const imageKey = ownedImageKey(
    member.number,
    parsed.draft.imageKey,
    imageErrors
  )
  if (imageErrors.imageKey) {
    return { status: "invalid", fieldErrors: imageErrors }
  }
  const slug =
    existing.title === parsed.draft.title
      ? existing.slug
      : await nextSlug(db, member.number, parsed.draft.title, existing.id)
  const updated = await db.$transaction(async (tx) => {
    await tx.projectBuiltWith.deleteMany({ where: { projectId: existing.id } })
    return tx.project.update({
      where: { id: existing.id },
      data: {
        slug,
        title: parsed.draft.title,
        summary: parsed.draft.summary,
        url: parsed.draft.url,
        repoUrl: parsed.draft.repoUrl,
        imageKey,
        published: parsed.draft.published,
        builtWith: {
          create: parsed.draft.builtWith.map((part, index) => ({
            name: part.name,
            percent: part.percent,
            sortOrder: index,
          })),
        },
      },
      include: { builtWith: { orderBy: { sortOrder: "asc" } } },
    })
  })
  if (existing.imageKey && existing.imageKey !== imageKey) {
    await deleteProjectImage(existing.imageKey)
  }
  return { status: "ok", project: mapProject(updated) }
}

export async function deleteProject(
  db: PrismaClient,
  clerkUserId: string,
  projectId: string
): Promise<WriteProjectResult> {
  const member = await requireActiveMember(db, clerkUserId)
  if (member.status !== "ok") {
    return member
  }
  const existing = await db.project.findFirst({
    where: { id: projectId, memberNumber: member.number },
    select: { id: true, imageKey: true },
  })
  if (!existing) {
    return { status: "not_found" }
  }
  const deleted = await db.project.delete({
    where: { id: existing.id },
    include: { builtWith: { orderBy: { sortOrder: "asc" } } },
  })
  await deleteProjectImage(existing.imageKey)
  return { status: "ok", project: mapProject(deleted) }
}

export function toPublicProjects(projects: MeProject[]): PublicProject[] {
  return projects
    .filter((project) => project.published)
    .map(
      ({ published: _published, imageKey: _imageKey, ...project }) => project
    )
}

export type { ProjectDraft }
