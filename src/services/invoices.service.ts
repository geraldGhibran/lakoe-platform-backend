import prisma from '../libs/prisma';
import { StatusInvoice } from '@prisma/client';

export const getInvoices = async () => {
  try {
    const invoices = await prisma.invoices.findMany({
      include: {
        store: true,
        Courier: true,
        Product: {
          include: {
            image: true,
          },
        },
      },
    });

    return invoices;
  } catch (error: any) {
    throw new Error(`Failed to fetch invoices: ${error.message}`);
  }
};

export const getInvoiceById = async (id: number) => {
  try {
    const invoice = await prisma.invoices.findUnique({
      where: { id },
      include: {
        store: true,
        Courier: true,
        Product: {
          include: {
            variant_Item_values: true,
            image: true,
          },
        },
      },
    });

    const transformedData = invoice
      ? {
          ...invoice,
          receiver_phone: invoice.receiver_phone
            ? invoice.receiver_phone.toString()
            : '',
        }
      : null;

    if (!invoice) {
      throw new Error(`Invoice with ID ${id} not found`);
    }

    return transformedData;
  } catch (error: any) {
    throw new Error(`Failed to fetch invoice by ID: ${error.message}`);
  }
};
