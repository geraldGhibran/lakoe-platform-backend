/*
  Warnings:

  - You are about to drop the column `receicer_postal_code` on the `Invoices` table. All the data in the column will be lost.
  - Added the required column `receiver_postal_code` to the `Invoices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoices" DROP COLUMN "receicer_postal_code",
ADD COLUMN     "receiver_postal_code" INTEGER NOT NULL;
