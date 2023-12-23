/*
  Warnings:

  - The values [CC,WEB,APP,RESEARCH,MANAGEMENT,DESIGN] on the enum `Domain` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[status,registrationId]` on the table `RegistrationStatus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[questionId,registrationId]` on the table `Response` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "Domain" ADD VALUE 'cc';
ALTER TYPE "Domain" ADD VALUE 'web';
ALTER TYPE "Domain" ADD VALUE 'app';
ALTER TYPE "Domain" ADD VALUE 'research';
ALTER TYPE "Domain" ADD VALUE 'management';
ALTER TYPE "Domain" ADD VALUE 'design';
ALTER TYPE "Domain"DROP VALUE 'CC';
ALTER TYPE "Domain"DROP VALUE 'WEB';
ALTER TYPE "Domain"DROP VALUE 'APP';
ALTER TYPE "Domain"DROP VALUE 'RESEARCH';
ALTER TYPE "Domain"DROP VALUE 'MANAGEMENT';
ALTER TYPE "Domain"DROP VALUE 'DESIGN';

-- CreateIndex
CREATE UNIQUE INDEX "RegistrationStatus_status_registrationId_key" ON "RegistrationStatus"("status", "registrationId");

-- CreateIndex
CREATE UNIQUE INDEX "Response_questionId_registrationId_key" ON "Response"("questionId", "registrationId");
