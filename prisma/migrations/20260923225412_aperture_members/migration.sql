-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('FOUNDER', 'DEVELOPER', 'DESIGNER', 'OPERATOR', 'STUDENT');

-- CreateEnum
CREATE TYPE "UpFor" AS ENUM ('COFOUNDING', 'FREELANCE', 'HIRING', 'MENTORING', 'COLLABORATING');

-- CreateEnum
CREATE TYPE "ConsentKind" AS ENUM ('TERMS', 'PRIVACY', 'AGE_DECLARATION', 'MARKETING');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "startsAt" TIMESTAMP(3),
ADD COLUMN     "venue" TEXT;

-- AlterTable
ALTER TABLE "PromoCode" ADD COLUMN     "expiresAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "Member" (
    "number" INTEGER NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "retiredAt" TIMESTAMP(3),

    CONSTRAINT "Member_pkey" PRIMARY KEY ("number")
);

-- CreateTable
CREATE TABLE "Profile" (
    "memberNumber" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "headline" TEXT NOT NULL,
    "bio" TEXT,
    "countryCode" TEXT NOT NULL,
    "city" TEXT,
    "role" "MemberRole" NOT NULL,
    "upFor" "UpFor"[],
    "linkedinUrl" TEXT,
    "xUrl" TEXT,
    "githubUrl" TEXT,
    "websiteUrl" TEXT,
    "instagramUrl" TEXT,
    "avatarUrl" TEXT,
    "showEvents" BOOLEAN NOT NULL DEFAULT false,
    "usernameChangedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("memberNumber")
);

-- CreateTable
CREATE TABLE "MemberEmail" (
    "email" TEXT NOT NULL,
    "memberNumber" INTEGER NOT NULL,

    CONSTRAINT "MemberEmail_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "Consent" (
    "id" TEXT NOT NULL,
    "memberNumber" INTEGER NOT NULL,
    "kind" "ConsentKind" NOT NULL,
    "granted" BOOLEAN NOT NULL,
    "version" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Consent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_clerkUserId_key" ON "Member"("clerkUserId");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");

-- CreateIndex
CREATE INDEX "Profile_role_idx" ON "Profile"("role");

-- CreateIndex
CREATE INDEX "Profile_countryCode_idx" ON "Profile"("countryCode");

-- CreateIndex
CREATE INDEX "MemberEmail_memberNumber_idx" ON "MemberEmail"("memberNumber");

-- CreateIndex
CREATE INDEX "Consent_memberNumber_kind_createdAt_idx" ON "Consent"("memberNumber", "kind", "createdAt");

-- CreateIndex
CREATE INDEX "EligibleEmail_email_idx" ON "EligibleEmail"("email");

-- CreateIndex
CREATE INDEX "PromoCode_redemptionId_idx" ON "PromoCode"("redemptionId");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_memberNumber_fkey" FOREIGN KEY ("memberNumber") REFERENCES "Member"("number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MemberEmail" ADD CONSTRAINT "MemberEmail_memberNumber_fkey" FOREIGN KEY ("memberNumber") REFERENCES "Member"("number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Consent" ADD CONSTRAINT "Consent_memberNumber_fkey" FOREIGN KEY ("memberNumber") REFERENCES "Member"("number") ON DELETE RESTRICT ON UPDATE CASCADE;
