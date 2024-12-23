/*
  Warnings:

  - Added the required column `area_id` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_district_code` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `province` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subdistrict_code` to the `Locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `village_code` to the `Locations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Locations" ADD COLUMN     "area_id" TEXT NOT NULL,
ADD COLUMN     "city_district_code" INTEGER NOT NULL,
ADD COLUMN     "province" TEXT NOT NULL,
ADD COLUMN     "subdistrict_code" INTEGER NOT NULL,
ADD COLUMN     "village_code" TEXT NOT NULL,
ALTER COLUMN "city_district" SET DATA TYPE TEXT,
ALTER COLUMN "subdistrict" SET DATA TYPE TEXT;
