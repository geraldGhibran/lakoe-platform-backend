import prisma from '../libs/prisma';

export const getStoreByUserId = async (user_id: number) => {
  try {
    const stores = await prisma.store.findUnique({
      where: {
        user_id,
      },
      include: {
        Locations: true,
        bankAccount: true,
        products: true,
        user: true,
      },
    });
    return stores;
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};

export const getAllStore = async () => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        Locations: true,
        bankAccount: true,
        products: true,
        user: true,
      },
    });
    return stores;
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};
