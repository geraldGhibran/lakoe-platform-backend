/*
  Warnings:

  - Added the required column `courir_price` to the `Invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "courir_price" INTEGER NOT NULL;
