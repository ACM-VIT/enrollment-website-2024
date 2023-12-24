/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Config` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Config` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Config" ADD COLUMN     "key" "ConfigKeys" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Config_key_key" ON "Config"("key");
