import prisma from '../libs/prisma';

export const createWithdrawRequest = async (
  storeId: number,
  amount: number,
) => {
  if (amount < 5000) {
    throw new Error('Minimal withdraw adalah 5000');
  }

  const store = await prisma.store.findUnique({
    where: { user_id: storeId },
  });

  if (!store) {
    throw new Error('Store tidak ditemukan untuk seller ini');
  }

  if (amount > store.amount) {
    throw new Error('Jumlah withdraw melebihi saldo store');
  }

  const withdraw = await prisma.withdraw.create({
    data: {
      amount,
      storeId: store.id,
      status: 'PENDING',
    },
  });

  return withdraw;
};

export const getWithdrawsByStoreId = async (storeId: number) => {
  try {
    const withdraws = await prisma.withdraw.findMany({
      where: { storeId },
      orderBy: { createAt: 'desc' },
    });
    return withdraws;
  } catch (error: Error | any) {
    throw new Error(`Failed to retrieve withdraws: ${error.message}`);
  }
};
