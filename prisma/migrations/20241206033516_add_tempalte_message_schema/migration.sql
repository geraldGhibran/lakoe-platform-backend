-- CreateTable
CREATE TABLE "Template_Message" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "storeId" INTEGER,

    CONSTRAINT "Template_Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Template_Message" ADD CONSTRAINT "Template_Message_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE SET NULL ON UPDATE CASCADE;
