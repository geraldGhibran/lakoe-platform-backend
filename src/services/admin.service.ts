import prisma from '../libs/prisma';

export const getAllStore = async () => {
  try {
    const stores = await prisma.store.findMany({
      where: {
        user: {
          role: 'SELLER',
        },
      },
      include: {
        Locations: true,
        bankAccount: true,
        products: true,
        user: true,
        invoices: true,
      },
    });
    return stores;
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};

export const getStoreByUserId = async (user_id: number) => {
  try {
    const stores = await prisma.store.findUnique({
      where: {
        user_id,
      },
      include: {
        Locations: true,
        bankAccount: true,
        products: {
          include: {
            image: true,
          },
        },
        user: true,
        Withdraw: {
          where: {
            status: 'PENDING',
          },
          select: {
            amount: true,
          },
        },
      },
    });
    const totalPendingWithdrawAmount =
      stores?.Withdraw.reduce((sum, withdraw) => sum + withdraw.amount, 0) || 0;
    return {
      ...stores,
      totalPendingWithdrawAmount,
    };
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};

export const getTopSellers = async () => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        Locations: true,
        bankAccount: true,
        products: true,
        user: true,
      },
      orderBy: {
        amount: 'desc',
      },
      take: 1,
    });
    return stores;
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};

export const getWithdraw = async () => {
  try {
    const withdraws = await prisma.withdraw.findMany({
      where: { status: 'PENDING' },
      include: {
        store: {
          select: {
            name: true,
            logo_img: true,
            bankAccount: true,
          },
        },
      },
      orderBy: { createAt: 'desc' },
    });
    return withdraws;
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};

export const processWithdrawRequest = async (
  withdrawId: number,
  action: string,
) => {
  const withdraw = await prisma.withdraw.findUnique({
    where: { id: withdrawId },
    include: { store: true },
  });

  if (!withdraw) {
    throw new Error('Withdraw request tidak ditemukan');
  }

  if (withdraw.status !== 'PENDING') {
    throw new Error('Withdraw request sudah diproses sebelumnya');
  }

  if (action === 'accept') {
    await prisma.$transaction([
      prisma.withdraw.update({
        where: { id: withdrawId },
        data: { status: 'SUCCESS' },
      }),
      prisma.store.update({
        where: { id: withdraw.storeId },
        data: { amount: withdraw.store.amount - withdraw.amount },
      }),
    ]);
  } else if (action === 'reject') {
    await prisma.withdraw.update({
      where: { id: withdrawId },
      data: { status: 'FAILED' },
    });
  } else {
    throw new Error(
      "Aksi tidak valid. Hanya 'accept' atau 'reject' yang diperbolehkan.",
    );
  }

  return {
    message: `Withdraw request ${action === 'accept' ? 'accepted' : 'rejected'}`,
  };
};

export const getStoreAndWithdrawAmount = async () => {
  try {
    const stores = await prisma.store.findMany({
      select: {
        id: true,
        amount: true,
      },
    });
    const totalStoreAmount = stores.reduce(
      (sum, store) => sum + store.amount,
      0,
    );
    const pendingWithdraws = await prisma.withdraw.findMany({
      where: {
        status: 'PENDING',
      },
      select: {
        amount: true,
      },
    });
    const totalPendingAmount = pendingWithdraws.reduce(
      (sum, withdraw) => sum + withdraw.amount,
      0,
    );
    const successWithdraws = await prisma.withdraw.findMany({
      where: {
        status: 'SUCCESS',
      },
      select: {
        amount: true,
      },
    });
    const totalSuccessAmount = successWithdraws.reduce(
      (sum, withdraw) => sum + withdraw.amount,
      0,
    );

    const feeAmount = await prisma.invoices.findMany({
      where: {
        status: 'DELIVERED',
      },
      select: {
        service_charge: true,
      },
    });
    const totalFeeAmount = feeAmount.reduce(
      (sum, invoice) => sum + invoice.service_charge,
      0,
    );

    return {
      stores,
      pendingWithdraws,
      successWithdraws,
      totalStoreAmount,
      totalPendingAmount,
      totalSuccessAmount,
      totalFeeAmount,
    };
  } catch (error: Error | any) {
    throw new Error(`Error fetching stores: ${error.message}`);
  }
};
