/*
  Warnings:

  - Added the required column `village` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Locations" ADD COLUMN     "village" TEXT NOT NULL;
