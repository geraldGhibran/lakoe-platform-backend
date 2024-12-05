/*
  Warnings:

  - A unique constraint covering the columns `[store_id]` on the table `Product` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Product_store_id_key" ON "Product"("store_id");
