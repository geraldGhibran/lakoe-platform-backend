import { BankAccountDto } from '../dto/bank-account-dto';
import prisma from '../libs/prisma';

export const findBankAccountById = async (id: number, store_id: number) => {
  return await prisma.bankAccount.findUnique({
    where: {
      id,
      store_id,
    },
  });
};

export const findBankAccountByStoreId = async (storeId: number) => {
  try {
    const bankAccount = await prisma.bankAccount.findMany({
      where: {
        store_id: storeId,
      },
    });
    return bankAccount;
  } catch (error: Error | any) {
    throw new Error(
      `Error fetching bankAccount for store_id ${storeId}: ${error.message}`,
    );
  }
};

export const updateBankAccount = async (
  id: number,
  data: Partial<BankAccountDto>,
) => {
  const { ...updateData } = data;

  const bankAccount = await prisma.bankAccount.findUnique({ where: { id } });
  if (!bankAccount) {
    throw new Error('Bank Account not found');
  }

  const updatedBankAccount = await prisma.bankAccount.update({
    where: { id },
    data: updateData,
  });

  return { updatedBankAccount };
};

export const deleteBankAccount = async (id: number) => {
  const bankAccount = await prisma.bankAccount.findUnique({ where: { id } });
  if (!bankAccount) {
    throw new Error('Bank account not found');
  }

  await prisma.bankAccount.delete({ where: { id } });
};

export async function createBankAccount(data: {
  bank: string;
  acc_number: number;
  acc_name: string;
  store_id: number;
}) {
  const existingAccount = await prisma.bankAccount.findFirst();

  if (existingAccount) {
    throw new Error(
      'A bank account already exists. Only one record is allowed.',
    );
  }

  return await prisma.bankAccount.create({
    data,
  });
}
