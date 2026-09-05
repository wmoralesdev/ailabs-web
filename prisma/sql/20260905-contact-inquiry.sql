-- Additive only. Apply once to the selected database before the contact release.
-- This repository has no migration baseline: do not run migrate reset or db push.
BEGIN;
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
CREATE INDEX "ContactInquiry_email_createdAt_idx" ON "ContactInquiry"("email", "createdAt");
CREATE INDEX "ContactInquiry_createdAt_idx" ON "ContactInquiry"("createdAt");
COMMIT;
