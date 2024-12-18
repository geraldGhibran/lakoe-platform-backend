/*
  Warnings:

  - Added the required column `resi` to the `Courier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courier" ADD COLUMN     "resi" TEXT NOT NULL;
