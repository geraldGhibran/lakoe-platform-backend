/*
  Warnings:

  - You are about to drop the `variant_Item_value` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "variant_Item_value" DROP CONSTRAINT "variant_Item_value_productId_fkey";

-- DropTable
DROP TABLE "variant_Item_value";
