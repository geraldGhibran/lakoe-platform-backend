/*
  Warnings:

  - A unique constraint covering the columns `[invoice_id]` on the table `Invoices` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `link` to the `Courier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courier" ADD COLUMN     "link" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Invoices_invoice_id_key" ON "Invoices"("invoice_id");
