-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_product_id_fkey";

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
