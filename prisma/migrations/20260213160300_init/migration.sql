-- CreateTable
CREATE TABLE "Supervisor" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Supervisor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fellow" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "cohort" TEXT NOT NULL,
    "supervisorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Fellow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "fellowId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "sessionDate" TIMESTAMP(3) NOT NULL,
    "transcript" TEXT NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AIAnalysis" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "modelVersion" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "contentScore" INTEGER NOT NULL,
    "contentEvidence" TEXT[],
    "contentReasoning" TEXT NOT NULL,
    "facilitationScore" INTEGER NOT NULL,
    "facilitationEvidence" TEXT[],
    "facilitationReasoning" TEXT NOT NULL,
    "protocolScore" INTEGER NOT NULL,
    "protocolEvidence" TEXT[],
    "protocolReasoning" TEXT NOT NULL,
    "riskFlag" TEXT NOT NULL,
    "riskSeverity" TEXT,
    "riskConfidence" DOUBLE PRECISION NOT NULL,
    "processingTimeMs" INTEGER NOT NULL,
    "rawOutput" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AIAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RiskFlag" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "quotes" TEXT[],
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "resolvedBy" TEXT,
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RiskFlag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SupervisorOverride" (
    "id" TEXT NOT NULL,
    "analysisId" TEXT NOT NULL,
    "supervisorId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "previousFlag" TEXT NOT NULL,
    "newFlag" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupervisorOverride_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Supervisor_email_key" ON "Supervisor"("email");

-- CreateIndex
CREATE INDEX "Fellow_supervisorId_idx" ON "Fellow"("supervisorId");

-- CreateIndex
CREATE INDEX "Session_fellowId_idx" ON "Session"("fellowId");

-- CreateIndex
CREATE INDEX "Session_sessionDate_idx" ON "Session"("sessionDate");

-- CreateIndex
CREATE INDEX "AIAnalysis_sessionId_idx" ON "AIAnalysis"("sessionId");

-- CreateIndex
CREATE INDEX "AIAnalysis_createdAt_idx" ON "AIAnalysis"("createdAt");

-- CreateIndex
CREATE INDEX "RiskFlag_sessionId_idx" ON "RiskFlag"("sessionId");

-- CreateIndex
CREATE INDEX "RiskFlag_resolved_idx" ON "RiskFlag"("resolved");

-- CreateIndex
CREATE INDEX "SupervisorOverride_analysisId_idx" ON "SupervisorOverride"("analysisId");

-- CreateIndex
CREATE INDEX "SupervisorOverride_supervisorId_idx" ON "SupervisorOverride"("supervisorId");

-- AddForeignKey
ALTER TABLE "Fellow" ADD CONSTRAINT "Fellow_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Supervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_fellowId_fkey" FOREIGN KEY ("fellowId") REFERENCES "Fellow"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AIAnalysis" ADD CONSTRAINT "AIAnalysis_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskFlag" ADD CONSTRAINT "RiskFlag_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "Session"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupervisorOverride" ADD CONSTRAINT "SupervisorOverride_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "AIAnalysis"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SupervisorOverride" ADD CONSTRAINT "SupervisorOverride_supervisorId_fkey" FOREIGN KEY ("supervisorId") REFERENCES "Supervisor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
