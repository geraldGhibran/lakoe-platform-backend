/*
  Warnings:

  - Added the required column `province_code` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Locations" ADD COLUMN     "province_code" INTEGER NOT NULL;
