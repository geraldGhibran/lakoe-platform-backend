/*
  Warnings:

  - Changed the type of `receiver_phone` on the `Invoices` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Invoices" DROP COLUMN "receiver_phone",
ADD COLUMN     "receiver_phone" INTEGER NOT NULL;
