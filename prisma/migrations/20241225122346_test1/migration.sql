/*
  Warnings:

  - You are about to drop the column `courir_price` on the `Invoices` table. All the data in the column will be lost.
  - Added the required column `courier_price` to the `Invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoices" DROP COLUMN "courir_price",
ADD COLUMN     "courier_price" INTEGER NOT NULL;
