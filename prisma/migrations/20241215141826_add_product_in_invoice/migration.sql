-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "invoicesId" INTEGER;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_invoicesId_fkey" FOREIGN KEY ("invoicesId") REFERENCES "Invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
