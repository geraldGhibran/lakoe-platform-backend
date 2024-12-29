/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `bankAccount` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "bankAccount" ALTER COLUMN "id" SET DEFAULT 1,
ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "bankAccount_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "bankAccount_id_key" ON "bankAccount"("id");
