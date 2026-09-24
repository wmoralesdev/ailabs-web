-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Product" AS ENUM ('CURSOR', 'CODEX', 'OPENAI', 'CODEX_OPENAI');

-- CreateEnum
CREATE TYPE "Pool" AS ENUM ('CURSOR', 'CODEX', 'OPENAI');

-- CreateEnum
CREATE TYPE "WorkshopRegistrationStatus" AS ENUM ('PENDING', 'PAID', 'FAILED', 'EXPIRED');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "product" "Product" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibleEmail" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "EligibleEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Redemption" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Redemption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromoCode" (
    "id" TEXT NOT NULL,
    "eventId" TEXT,
    "pool" "Pool" NOT NULL,
    "code" TEXT NOT NULL,
    "redemptionId" TEXT,
    "claimedAt" TIMESTAMP(3),
    "allocatedAt" TIMESTAMP(3),
    "exportedAt" TIMESTAMP(3),
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromoCode_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditOperation" (
    "id" UUID NOT NULL,
    "ownerId" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "pool" "Pool" NOT NULL,
    "eventId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "request" JSONB NOT NULL,
    "result" JSONB NOT NULL DEFAULT '{}',
    "version" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CampusLeaderApplication" (
    "id" TEXT NOT NULL,
    "cohort" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "linkedin" TEXT,
    "instagram" TEXT,
    "x" TEXT,
    "campus" TEXT NOT NULL,
    "career" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "reach" TEXT NOT NULL,
    "aiToday" TEXT NOT NULL,
    "whyLeader" TEXT NOT NULL,
    "quietRoom" TEXT NOT NULL,
    "inviteMessage" TEXT NOT NULL,
    "roomPlan" TEXT NOT NULL,
    "sessionPrefs" TEXT[],
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CampusLeaderApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Workshop" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "priceCents" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "capacity" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Workshop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkshopRegistration" (
    "id" TEXT NOT NULL,
    "workshopId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "status" "WorkshopRegistrationStatus" NOT NULL DEFAULT 'PENDING',
    "commerceLinkId" TEXT NOT NULL,
    "wompiEnlaceId" INTEGER,
    "wompiTransactionId" TEXT,
    "wompiAuthorizationCode" TEXT,
    "checkoutUrl" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkshopRegistration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ContactInquiry" (
    "id" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "interest" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "locale" TEXT NOT NULL,

    CONSTRAINT "ContactInquiry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_deletedAt_createdAt_idx" ON "Event"("deletedAt", "createdAt");

-- CreateIndex
CREATE INDEX "EligibleEmail_eventId_idx" ON "EligibleEmail"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "EligibleEmail_eventId_email_key" ON "EligibleEmail"("eventId", "email");

-- CreateIndex
CREATE INDEX "Redemption_eventId_idx" ON "Redemption"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "Redemption_eventId_email_key" ON "Redemption"("eventId", "email");

-- CreateIndex
CREATE INDEX "PromoCode_eventId_pool_redemptionId_idx" ON "PromoCode"("eventId", "pool", "redemptionId");

-- CreateIndex
CREATE INDEX "PromoCode_pool_eventId_redemptionId_idx" ON "PromoCode"("pool", "eventId", "redemptionId");

-- CreateIndex
CREATE INDEX "PromoCode_pool_allocatedAt_idx" ON "PromoCode"("pool", "allocatedAt");

-- CreateIndex
CREATE INDEX "PromoCode_pool_exportedAt_idx" ON "PromoCode"("pool", "exportedAt");

-- CreateIndex
CREATE INDEX "PromoCode_pool_deletedAt_idx" ON "PromoCode"("pool", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "PromoCode_pool_code_key" ON "PromoCode"("pool", "code");

-- CreateIndex
CREATE INDEX "CreditOperation_pool_createdAt_idx" ON "CreditOperation"("pool", "createdAt");

-- CreateIndex
CREATE INDEX "CreditOperation_ownerId_idx" ON "CreditOperation"("ownerId");

-- CreateIndex
CREATE INDEX "CampusLeaderApplication_cohort_idx" ON "CampusLeaderApplication"("cohort");

-- CreateIndex
CREATE INDEX "CampusLeaderApplication_campus_career_idx" ON "CampusLeaderApplication"("campus", "career");

-- CreateIndex
CREATE INDEX "CampusLeaderApplication_createdAt_idx" ON "CampusLeaderApplication"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Workshop_slug_key" ON "Workshop"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopRegistration_commerceLinkId_key" ON "WorkshopRegistration"("commerceLinkId");

-- CreateIndex
CREATE INDEX "WorkshopRegistration_workshopId_status_idx" ON "WorkshopRegistration"("workshopId", "status");

-- CreateIndex
CREATE INDEX "WorkshopRegistration_status_createdAt_idx" ON "WorkshopRegistration"("status", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "WorkshopRegistration_workshopId_email_key" ON "WorkshopRegistration"("workshopId", "email");

-- CreateIndex
CREATE INDEX "ContactInquiry_email_createdAt_idx" ON "ContactInquiry"("email", "createdAt");

-- CreateIndex
CREATE INDEX "ContactInquiry_createdAt_idx" ON "ContactInquiry"("createdAt");

-- AddForeignKey
ALTER TABLE "EligibleEmail" ADD CONSTRAINT "EligibleEmail_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Redemption" ADD CONSTRAINT "Redemption_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoCode" ADD CONSTRAINT "PromoCode_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromoCode" ADD CONSTRAINT "PromoCode_redemptionId_fkey" FOREIGN KEY ("redemptionId") REFERENCES "Redemption"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkshopRegistration" ADD CONSTRAINT "WorkshopRegistration_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
