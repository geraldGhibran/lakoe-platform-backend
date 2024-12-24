/*
  Warnings:

  - Changed the type of `village_code` on the `Locations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Locations" DROP COLUMN "village_code",
ADD COLUMN     "village_code" INTEGER NOT NULL;
