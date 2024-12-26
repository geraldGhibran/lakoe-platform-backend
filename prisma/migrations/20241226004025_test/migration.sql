/*
  Warnings:

  - Added the required column `receiver_email` to the `Invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoices" ADD COLUMN     "receiver_email" TEXT NOT NULL;
