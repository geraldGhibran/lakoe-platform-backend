/*
  Warnings:

  - You are about to drop the column `variant_item_id` on the `Variant` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "variant_combination" TEXT[];

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "variant_item_id";

-- AlterTable
ALTER TABLE "Variant_Item" ALTER COLUMN "image" DROP NOT NULL;
