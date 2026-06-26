-- CreateTable
CREATE TABLE "Schema" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "currentVersionId" TEXT,
    "isPublished" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Schema_currentVersionId_fkey" FOREIGN KEY ("currentVersionId") REFERENCES "Version" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Version" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "schemaId" TEXT NOT NULL,
    "versionNumber" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "changeSummary" TEXT,
    "createdBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Version_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "Schema" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Release" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "versionId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "releasedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Release_versionId_fkey" FOREIGN KEY ("versionId") REFERENCES "Version" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Schema_name_key" ON "Schema"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Schema_currentVersionId_key" ON "Schema"("currentVersionId");

-- CreateIndex
CREATE INDEX "Schema_isPublished_idx" ON "Schema"("isPublished");

-- CreateIndex
CREATE INDEX "Version_schemaId_createdAt_idx" ON "Version"("schemaId", "createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "Version_schemaId_versionNumber_key" ON "Version"("schemaId", "versionNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Release_versionId_name_key" ON "Release"("versionId", "name");
