import prisma from '../libs/prisma';

export const getDataSeller = async (storeId: number) => {
  try {
    const data = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
      include: {
        user: true,
        invoices: true,
        products: {
          include: {
            Invoices: true,
          },
        },
      },
    });
    return data;
  } catch {
    throw new Error('Error fetching stores');
  }
};
