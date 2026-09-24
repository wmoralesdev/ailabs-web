import { createServerFn } from "@tanstack/react-start"

import { prisma } from "@/lib/prisma"
import {
  listDirectoryMembers,
  loadPublicProfile,
} from "@/server/aperture/public-profile"
import type {
  DirectoryMember,
  PublicProfile,
} from "@/server/aperture/public-profile"

export type { DirectoryMember, PublicProfile }

function usernameInput(data: unknown): { username: string } {
  if (typeof data !== "object" || data === null || !("username" in data)) {
    throw new Error("Invalid username")
  }
  const username = data.username
  if (typeof username !== "string") {
    throw new Error("Invalid username")
  }
  return { username }
}

export const getPublicProfile = createServerFn({ method: "GET" })
  .validator(usernameInput)
  .handler(async ({ data }): Promise<PublicProfile | null> => {
    return loadPublicProfile(prisma, data.username)
  })

export const listApertureMembers = createServerFn({ method: "GET" }).handler(
  async (): Promise<DirectoryMember[]> => {
    return listDirectoryMembers(prisma)
  }
)
