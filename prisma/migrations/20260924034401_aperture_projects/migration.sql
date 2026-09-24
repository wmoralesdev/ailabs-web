-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "memberNumber" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "url" TEXT,
    "repoUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "hiddenAt" TIMESTAMP(3),
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectBuiltWith" (
    "id" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "percent" INTEGER NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ProjectBuiltWith_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Project_memberNumber_sortOrder_idx" ON "Project"("memberNumber", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "Project_memberNumber_slug_key" ON "Project"("memberNumber", "slug");

-- CreateIndex
CREATE INDEX "ProjectBuiltWith_projectId_sortOrder_idx" ON "ProjectBuiltWith"("projectId", "sortOrder");

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_memberNumber_fkey" FOREIGN KEY ("memberNumber") REFERENCES "Member"("number") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectBuiltWith" ADD CONSTRAINT "ProjectBuiltWith_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
