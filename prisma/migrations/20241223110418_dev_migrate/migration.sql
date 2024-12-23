-- AlterTable
ALTER TABLE "Courier" ADD COLUMN     "storeId" INTEGER;

-- AddForeignKey
ALTER TABLE "Courier" ADD CONSTRAINT "Courier_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
