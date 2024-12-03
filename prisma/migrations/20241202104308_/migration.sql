-- CreateEnum
CREATE TYPE "RoleEnum" AS ENUM ('ADMIN', 'SELLER');

-- CreateEnum
CREATE TYPE "roleEnum" AS ENUM ('ADMIN', 'SELLER');

-- CreateEnum
CREATE TYPE "StatusPayment" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- CreateEnum
CREATE TYPE "StatusInvoice" AS ENUM ('PAID', 'UNPAID', 'PENDING');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "password" TEXT NOT NULL,
    "role" "roleEnum" NOT NULL DEFAULT 'SELLER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Locations" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "postal_code" INTEGER NOT NULL,
    "city_district" INTEGER NOT NULL,
    "latitude" INTEGER NOT NULL,
    "longitude" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "is_main_location" BOOLEAN NOT NULL,

    CONSTRAINT "Locations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slogan" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logo_img" TEXT NOT NULL,
    "banner_img" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bankAccount" (
    "id" SERIAL NOT NULL,
    "bank" TEXT NOT NULL,
    "acc_number" INTEGER NOT NULL,
    "acc_name" TEXT NOT NULL,
    "store_id" INTEGER NOT NULL,

    CONSTRAINT "bankAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoices" (
    "id" SERIAL NOT NULL,
    "price" INTEGER NOT NULL,
    "service_charge" INTEGER NOT NULL,
    "status" "StatusInvoice" NOT NULL,
    "receiver_longitude" INTEGER NOT NULL,
    "receiver_latitude" INTEGER NOT NULL,
    "receiver_district" TEXT NOT NULL,
    "receiver_phone" INTEGER NOT NULL,
    "receiver_address" TEXT NOT NULL,
    "receiver_name" TEXT NOT NULL,
    "invoice_number" TEXT NOT NULL,
    "payment_id" INTEGER NOT NULL,
    "courier_id" INTEGER NOT NULL,

    CONSTRAINT "Invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "bank" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" "StatusPayment" NOT NULL,
    "invoice_id" INTEGER NOT NULL,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Courier" (
    "id" SERIAL NOT NULL,
    "courier_code" TEXT NOT NULL,
    "courier_service_name" TEXT NOT NULL,
    "courier_service_code" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "invoice_id" INTEGER NOT NULL,

    CONSTRAINT "Courier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "variants_id" INTEGER NOT NULL,
    "minimum_order" INTEGER NOT NULL,
    "store_id" INTEGER NOT NULL,
    "categories_id" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant" (
    "id" SERIAL NOT NULL,
    "stock" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "variant_item_id" INTEGER NOT NULL,
    "isActive" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Variant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant_Item" (
    "id" SERIAL NOT NULL,
    "image" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "variant_id" INTEGER NOT NULL,

    CONSTRAINT "Variant_Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Variant_Item_Option" (
    "variant_id" INTEGER NOT NULL,
    "variant_item_id" INTEGER NOT NULL,

    CONSTRAINT "Variant_Item_Option_pkey" PRIMARY KEY ("variant_id","variant_item_id")
);

-- CreateTable
CREATE TABLE "Categories" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "product_id" INTEGER NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Withdraw" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "Withdraw_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Locations_user_id_key" ON "Locations"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_name_key" ON "Store"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_user_id_key" ON "Store"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "bankAccount_store_id_key" ON "bankAccount"("store_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_invoice_id_key" ON "Payments"("invoice_id");

-- CreateIndex
CREATE UNIQUE INDEX "Courier_invoice_id_key" ON "Courier"("invoice_id");

-- AddForeignKey
ALTER TABLE "Locations" ADD CONSTRAINT "Locations_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Locations" ADD CONSTRAINT "Locations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bankAccount" ADD CONSTRAINT "bankAccount_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Courier" ADD CONSTRAINT "Courier_invoice_id_fkey" FOREIGN KEY ("invoice_id") REFERENCES "Invoices"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categories_id_fkey" FOREIGN KEY ("categories_id") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant" ADD CONSTRAINT "Variant_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant_Item" ADD CONSTRAINT "Variant_Item_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant_Item_Option" ADD CONSTRAINT "Variant_Item_Option_variant_id_fkey" FOREIGN KEY ("variant_id") REFERENCES "Variant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Variant_Item_Option" ADD CONSTRAINT "Variant_Item_Option_variant_item_id_fkey" FOREIGN KEY ("variant_item_id") REFERENCES "Variant_Item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
