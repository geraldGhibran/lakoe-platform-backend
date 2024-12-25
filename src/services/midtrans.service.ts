import { PrismaClient } from '@prisma/client';
import { MidtransClient } from 'midtrans-node-client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const snap = new MidtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY!,
  clientKey: process.env.MIDTRANS_CLIENT_KEY!,
});

export const createSnapTransactionWithInvoice = async (
  customerDetails: any,
  items: { id: number; quantity: number }[],
  courierPrice: number,
) => {
  try {
    const order_id = uuidv4();

    const itemDetails = await Promise.all(
      items.map(async ({ id, quantity }) => {
        const variant = await prisma.variant_item_value.findUnique({
          where: { id },
          include: { product: true },
        });

        if (!variant || !variant.is_active) {
          throw new Error(`Variant with id ${id} not found or not active.`);
        }

        if (variant.stock < quantity) {
          throw new Error(`Insufficient stock for variant ${variant.name}.`);
        }

        // Update stock
        await prisma.variant_item_value.update({
          where: { id },
          data: { stock: variant.stock - quantity },
        });

        return {
          id: variant.id,
          name: variant.name,
          price: variant.price,
          quantity,
          productId: variant.product.id,
        };
      }),
    );

    const gross_amount =
      itemDetails.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ) +
      2500 +
      courierPrice;

    // Create invoice in database
    const invoice = await prisma.invoices.create({
      data: {
        amount: gross_amount - 2500 - courierPrice,
        total_amount: gross_amount,
        courier_price: courierPrice,
        service_charge: 2500,
        status: 'PROCESS',
        receiver_name: customerDetails.name,
        receiver_phone: +customerDetails.phone,
        receiver_address: customerDetails.address,
        receiver_postal_code: customerDetails.postal_code,
        receiver_longitude: customerDetails.receiver_longitude,
        receiver_latitude: customerDetails.receiver_latitude,
        receiver_district: customerDetails.receiver_district,
        invoice_id: order_id,
        store_id: customerDetails.store_id,
        variantItemValues: {
          connect: itemDetails.map((item) => ({ id: item.id })),
        },
        Product: {
          connect: itemDetails.map((item) => ({ id: item.productId })),
        },
      },
    });

    const transactionData = {
      transaction_details: {
        order_id: invoice.invoice_id,
        gross_amount,
      },
      customer_details: {
        first_name: customerDetails.name,
        email: customerDetails.email,
        phone: customerDetails.phone,
      },
    };

    try {
      const snapResponse = await snap.createTransaction(transactionData);
      return snapResponse;
    } catch (midtransError: any) {
      console.error(
        'Midtrans Error:',
        midtransError.response?.data || midtransError.message,
      );
      throw new Error(
        `Failed to create Snap transaction: ${midtransError.response?.data?.message || midtransError.message}`,
      );
    }
  } catch (error: any) {
    throw new Error(
      `Failed to create Snap transaction with invoice: ${error.message}`,
    );
  }
};
