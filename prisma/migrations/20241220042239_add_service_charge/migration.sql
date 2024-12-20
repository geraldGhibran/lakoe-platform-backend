/*
  Warnings:

  - The primary key for the `Invoices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `receicer_postal_code` to the `Invoices` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Courier" DROP CONSTRAINT "Courier_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_invoicesId_fkey";

-- AlterTable
ALTER TABLE "Courier" ALTER COLUMN "invoice_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_pkey",
ADD COLUMN     "receicer_postal_code" INTEGER NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "service_charge" SET DEFAULT 0,
ALTER COLUMN "payment_id" DROP NOT NULL,
ALTER COLUMN "courier_id" DROP NOT NULL,
ADD CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Invoices_id_seq";

-- AlterTable
ALTER TABLE "Payments" ALTER COLUMN "invoice_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "invoicesId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courier" ADD CONSTRAINT "Courier_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_invoicesId_fkey" FOREIGN KEY ("invoicesId") REFERENCES "Invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
