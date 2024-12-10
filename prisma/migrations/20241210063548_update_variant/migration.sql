/*
  Warnings:

  - You are about to drop the column `price` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Variant` table. All the data in the column will be lost.
  - You are about to drop the `Variant_Item_Option` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `price` to the `Variant_Item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Variant_Item_Option" DROP CONSTRAINT "Variant_Item_Option_variant_id_fkey";

-- DropForeignKey
ALTER TABLE "Variant_Item_Option" DROP CONSTRAINT "Variant_Item_Option_variant_item_id_fkey";

-- AlterTable
ALTER TABLE "Variant" DROP COLUMN "price",
DROP COLUMN "stock",
DROP COLUMN "weight";

-- AlterTable
ALTER TABLE "Variant_Item" ADD COLUMN     "price" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Variant_Item_Option";
