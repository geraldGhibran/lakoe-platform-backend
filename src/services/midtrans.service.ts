import prisma from '../libs/prisma';
import { MidtransClient } from 'midtrans-node-client';

const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export const createSnapTransaction = async (transactionData: any) => {
  const { transaction_details, customer_details, item_details, store_id } =
    transactionData;

  const serviceCharge = 2500;
  const grossAmountWithCharge =
    transaction_details.gross_amount + serviceCharge;

  try {
    // Ambil detail produk dari database
    const productIds = item_details.map((item: any) => item.id);

    const products = await prisma.product.findMany({
      where: {
        id: { in: productIds },
        isActive: true,
      },
      include: {
        variant_Item_values: true, // Untuk update stok
      },
    });

    if (products.length !== item_details.length) {
      throw new Error('Some products are invalid or inactive.');
    }

    // Kurangi stok di variant_item_value
    for (const item of item_details) {
      const product = products.find((p) => p.id === item.id);
      if (!product) {
        throw new Error(`Product with ID ${item.id} not found.`);
      }

      const variant = product.variant_Item_values[0]; // Ambil variant pertama (sesuai kebutuhan Anda)
      if (variant.stock < item.quantity) {
        throw new Error(
          `Insufficient stock for product ${product.name}. Requested: ${item.quantity}, Available: ${variant.stock}`,
        );
      }

      // Update stok
      await prisma.variant_item_value.update({
        where: { id: variant.id },
        data: { stock: variant.stock - item.quantity },
      });
    }

    // Simpan invoice ke database
    const invoice = await prisma.invoices.create({
      data: {
        total_amount: grossAmountWithCharge,
        amount: transaction_details.gross_amount,
        service_charge: serviceCharge,
        status: 'PROCESS',
        receiver_name: customer_details.first_name,
        receiver_phone: customer_details.phone,
        receiver_address: customer_details.address,
        receiver_district: customer_details.district || '',
        receiver_longitude: customer_details.longitude || 0,
        receiver_latitude: customer_details.latitude || 0,
        receiver_postal_code: customer_details.postal_code || 0,
        store: { connect: { id: store_id } },
        Product: {
          connect: item_details.map((item: any) => ({
            id: item.id,
          })),
        },
      },
    });

    // Buat transaksi di Midtrans
    transaction_details.gross_amount = grossAmountWithCharge;
    const midtransResponse = await snap.createTransaction(transactionData);

    return { midtransResponse, invoice };
  } catch (error: any) {
    throw new Error(
      `Failed to create Snap transaction or save invoice: ${error.message}`,
    );
  }
};
