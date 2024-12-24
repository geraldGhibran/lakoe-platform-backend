-- DropForeignKey
ALTER TABLE "Courier" DROP CONSTRAINT "Courier_invoice_id_fkey";

-- AlterTable
ALTER TABLE "Courier" ADD COLUMN     "is_active" BOOLEAN DEFAULT false,
ALTER COLUMN "price" DROP NOT NULL,
ALTER COLUMN "invoice_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Courier" ADD CONSTRAINT "Courier_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
