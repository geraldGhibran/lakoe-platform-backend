/*
  Warnings:

  - You are about to drop the column `user_id` on the `Locations` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Locations" DROP CONSTRAINT "Locations_user_id_fkey";

-- DropIndex
DROP INDEX "Locations_user_id_key";

-- AlterTable
ALTER TABLE "Locations" DROP COLUMN "user_id";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "locationsId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_locationsId_fkey" FOREIGN KEY ("locationsId") REFERENCES "Locations"("id") ON DELETE SET NULL ON UPDATE CASCADE;
