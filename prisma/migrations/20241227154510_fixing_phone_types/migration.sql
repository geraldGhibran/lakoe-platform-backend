-- AlterTable
ALTER TABLE "Invoices" ALTER COLUMN "receiver_phone" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "phone" DROP NOT NULL;
