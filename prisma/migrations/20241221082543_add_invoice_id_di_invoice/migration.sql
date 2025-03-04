/*
  Warnings:

  - The primary key for the `Invoices` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Invoices` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `invoicesId` column on the `Product` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `invoiceId` column on the `variant_item_value` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `invoice_id` on the `Courier` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `invoice_id` on the `Payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Courier" DROP CONSTRAINT "Courier_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_invoice_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_invoicesId_fkey";

-- DropForeignKey
ALTER TABLE "variant_item_value" DROP CONSTRAINT "variant_item_value_invoiceId_fkey";

-- AlterTable
ALTER TABLE "Courier" DROP COLUMN "invoice_id",
ADD COLUMN     "invoice_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_pkey",
ADD COLUMN     "invoice_id" TEXT,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "invoice_id",
ADD COLUMN     "invoice_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "invoicesId",
ADD COLUMN     "invoicesId" INTEGER;

-- AlterTable
ALTER TABLE "variant_item_value" DROP COLUMN "invoiceId",
ADD COLUMN     "invoiceId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Courier_invoice_id_key" ON "Courier"("invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_invoice_id_key" ON "Payments"("invoice_id");

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courier" ADD CONSTRAINT "Courier_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_invoicesId_fkey" FOREIGN KEY ("invoicesId") REFERENCES "Invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "variant_item_value" ADD CONSTRAINT "variant_item_value_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoices"("id") ON DELETE SET NULL ON UPDATE CASCADE;
