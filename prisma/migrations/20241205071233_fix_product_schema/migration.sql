/*
  Warnings:

  - You are about to drop the column `store_id` on the `Product` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_store_id_fkey";

-- DropIndex
DROP INDEX "Product_store_id_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "store_id",
ADD COLUMN     "storeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
