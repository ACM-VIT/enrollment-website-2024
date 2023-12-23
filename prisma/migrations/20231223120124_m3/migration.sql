/*
  Warnings:

  - The values [PENDING,APPROVED,REJECTED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - The values [TEXT,MULTIPLE_CHOICE,SINGLE_CHOICE] on the enum `Type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'init';
ALTER TYPE "Status" ADD VALUE 'form_submitted';
ALTER TYPE "Status" ADD VALUE 'round1_result_updated';
ALTER TYPE "Status"DROP VALUE 'PENDING';
ALTER TYPE "Status"DROP VALUE 'APPROVED';
ALTER TYPE "Status"DROP VALUE 'REJECTED';

-- AlterEnum
ALTER TYPE "Type" ADD VALUE 'st';
ALTER TYPE "Type" ADD VALUE 'lt';
ALTER TYPE "Type" ADD VALUE 'scq';
ALTER TYPE "Type" ADD VALUE 'mcq';
ALTER TYPE "Type"DROP VALUE 'TEXT';
ALTER TYPE "Type"DROP VALUE 'MULTIPLE_CHOICE';
ALTER TYPE "Type"DROP VALUE 'SINGLE_CHOICE';
