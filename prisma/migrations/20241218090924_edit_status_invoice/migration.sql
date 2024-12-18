/*
  Warnings:

  - The values [PAID,UNPAID,PENDING] on the enum `StatusInvoice` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "StatusInvoice_new" AS ENUM ('PROCESS', 'CANCELED', 'WAIT_TO_PICKUP', 'DELIVERED');
ALTER TABLE "Invoices" ALTER COLUMN "status" TYPE "StatusInvoice_new" USING ("status"::text::"StatusInvoice_new");
ALTER TYPE "StatusInvoice" RENAME TO "StatusInvoice_old";
ALTER TYPE "StatusInvoice_new" RENAME TO "StatusInvoice";
DROP TYPE "StatusInvoice_old";
COMMIT;
