import prisma from '../libs/prisma';
import { MidtransClient } from 'midtrans-node-client';
import { v4 as uuidv4 } from 'uuid';

const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export const createSnapTransaction = async (transactionData: any) => {
  const { transaction_details, customer_details, items, store_id } =
    transactionData;

  const serviceCharge = 2500;
  let totalAmount = 0;

  try {
    // Ambil data produk dari database
    const productDetails = await Promise.all(
      items.map(async (item: any) => {
        const variant = await prisma.variant_item_value.findUnique({
          where: { id: item.id },
        });

        if (!variant || !variant.is_active) {
          throw new Error(`Product with ID ${item.id} is not available.`);
        }

        if (variant.stock < item.quantity) {
          throw new Error(
            `Insufficient stock for product ID ${item.id}. Requested: ${item.quantity}, Available: ${variant.stock}`,
          );
        }

        totalAmount += variant.price * item.quantity;

        return {
          id: item.id,
          name: variant.name,
          price: variant.price,
          quantity: item.quantity,
        };
      }),
    );

    const grossAmountWithCharge = totalAmount + serviceCharge;

    // Buat invoice terlebih dahulu
    const transactionId = uuidv4();
    const invoice = await prisma.invoices.create({
      data: {
        total_amount: grossAmountWithCharge,
        amount: totalAmount,
        service_charge: serviceCharge,
        status: 'PROCESS',
        receiver_name: customer_details.first_name,
        receiver_phone: customer_details.phone,
        receiver_address: customer_details.address,
        receiver_district: customer_details.district || '',
        receiver_longitude: customer_details.longitude || 0,
        receiver_latitude: customer_details.latitude || 0,
        receiver_postal_code: customer_details.postal_code || 0,
        invoice_id: transactionId,
        store: { connect: { id: store_id } },
        Product: {
          connect: items.map((item: any) => ({ id: item.id })),
        },
      },
    });

    // Kurangi stok produk
    for (const item of productDetails) {
      await prisma.variant_item_value.update({
        where: { id: item.id },
        data: { stock: { decrement: item.quantity } },
      });
    }

    // Buat transaksi di Midtrans
    transaction_details.order_id = invoice.invoice_id;

    const midtransResponse = await snap.createTransaction({
      transaction_details: {
        order_id: invoice.invoice_id,
        gross_amount: grossAmountWithCharge,
      },
      customer_details,
      item_details: productDetails.map((item) => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
        name: item.name,
      })),
    });

    return { midtransResponse, invoice };
  } catch (error: any) {
    throw new Error(
      `Failed to create Snap transaction or save invoice: ${error.message}`,
    );
  }
};
