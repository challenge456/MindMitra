ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'GOVERNMENT_ADMIN';

CREATE TYPE "ProgramStatus" AS ENUM ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED');
CREATE TYPE "ExportFormat" AS ENUM ('CSV', 'PDF');

CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "GovernmentProgram" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "status" "ProgramStatus" NOT NULL DEFAULT 'DRAFT',
    "startsAt" TIMESTAMP(3),
    "endsAt" TIMESTAMP(3),
    "supportedLanguages" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "enabledGameSlugs" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "reminderCategories" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "GovernmentProgram_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProgramRegion" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "district" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProgramRegion_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ProgramEnrollment" (
    "id" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "district" TEXT,
    "enrolledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ProgramEnrollment_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "GovernmentAdmin" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "organizationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GovernmentAdmin_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL,
    "actorId" TEXT,
    "programId" TEXT,
    "action" TEXT NOT NULL,
    "resource" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ReportExport" (
    "id" TEXT NOT NULL,
    "requestedById" TEXT NOT NULL,
    "programId" TEXT NOT NULL,
    "format" "ExportFormat" NOT NULL,
    "periodStart" TIMESTAMP(3) NOT NULL,
    "periodEnd" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "ReportExport_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "ProgramRegion_programId_state_district_key" ON "ProgramRegion"("programId", "state", "district");
CREATE INDEX "ProgramRegion_state_idx" ON "ProgramRegion"("state");
CREATE UNIQUE INDEX "ProgramEnrollment_programId_userId_key" ON "ProgramEnrollment"("programId", "userId");
CREATE INDEX "ProgramEnrollment_programId_region_idx" ON "ProgramEnrollment"("programId", "region");
CREATE UNIQUE INDEX "GovernmentAdmin_userId_key" ON "GovernmentAdmin"("userId");
CREATE INDEX "GovernmentAdmin_organizationId_idx" ON "GovernmentAdmin"("organizationId");
CREATE INDEX "GovernmentProgram_organizationId_status_idx" ON "GovernmentProgram"("organizationId", "status");
CREATE INDEX "AuditLog_programId_createdAt_idx" ON "AuditLog"("programId", "createdAt");
CREATE INDEX "ReportExport_programId_createdAt_idx" ON "ReportExport"("programId", "createdAt");

ALTER TABLE "GovernmentProgram" ADD CONSTRAINT "GovernmentProgram_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProgramRegion" ADD CONSTRAINT "ProgramRegion_programId_fkey" FOREIGN KEY ("programId") REFERENCES "GovernmentProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProgramEnrollment" ADD CONSTRAINT "ProgramEnrollment_programId_fkey" FOREIGN KEY ("programId") REFERENCES "GovernmentProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ProgramEnrollment" ADD CONSTRAINT "ProgramEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GovernmentAdmin" ADD CONSTRAINT "GovernmentAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "GovernmentAdmin" ADD CONSTRAINT "GovernmentAdmin_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_programId_fkey" FOREIGN KEY ("programId") REFERENCES "GovernmentProgram"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "ReportExport" ADD CONSTRAINT "ReportExport_requestedById_fkey" FOREIGN KEY ("requestedById") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ReportExport" ADD CONSTRAINT "ReportExport_programId_fkey" FOREIGN KEY ("programId") REFERENCES "GovernmentProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;
