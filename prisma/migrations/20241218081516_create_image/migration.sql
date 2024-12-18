/*
  Warnings:

  - You are about to drop the `variant_Item_value` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "variant_Item_value";

-- CreateTable
CREATE TABLE "variant_item_value" (
    "id" SERIAL NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "stock" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "product_id" INTEGER NOT NULL,
    "image" TEXT,

    CONSTRAINT "variant_item_value_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "variant_item_value" ADD CONSTRAINT "variant_item_value_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
