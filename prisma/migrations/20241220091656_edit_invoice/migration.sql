/*
  Warnings:

  - You are about to drop the column `invoice_number` on the `Invoices` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Invoices` table. All the data in the column will be lost.
  - Added the required column `amount` to the `Invoices` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_amount` to the `Invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoices" DROP COLUMN "invoice_number",
DROP COLUMN "price",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "total_amount" INTEGER NOT NULL;
