/*
  Warnings:

  - Added the required column `subdistrict` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `city_district` on the `Locations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Locations" ADD COLUMN     "subdistrict" INTEGER NOT NULL,
DROP COLUMN "city_district",
ADD COLUMN     "city_district" INTEGER NOT NULL;
