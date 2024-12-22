-- AlterTable
ALTER TABLE "variant_item_value" ADD COLUMN     "invoiceId" TEXT;

-- AddForeignKey
ALTER TABLE "variant_item_value" ADD CONSTRAINT "variant_item_value_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
