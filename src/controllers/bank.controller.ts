import { Request, Response } from 'express';
import {
  createBankAccount,
  findBankAccountById,
  findBankAccountByStoreId,
  updateBankAccount,
  deleteBankAccount,
} from '../services/bank.service';
import { BankAccountDto } from '../dto/bank-account-dto';

export const getBankAccountByStoreId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const storeId = res.locals.user.storeId;

  try {
    const bank_accounts = await findBankAccountByStoreId(Number(storeId));
    res.status(200).json(bank_accounts || []);
  } catch (error: any) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: 'An error occurred while fetching bank accounts' });
  }
};

export const createBank = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const bankData: BankAccountDto = req.body;

    const store_id = res.locals.user.storeId;

    // Validate that bankData contains the necessary fields
    const { bank, acc_number, acc_name } = bankData; // Destructure to ensure all fields are present
    if (!bank || !acc_number || !acc_name) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const bankDatas = await createBankAccount({
      // Pass the required fields to createBankAccount
      bank,
      acc_number,
      acc_name,
      store_id,
    });
    res.status(201).json({
      message: 'Bank Account created successfully',
      data: bankDatas,
    });
  } catch (error: any) {
    console.error('Error creating bank account:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const updateBankById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const bankData: Partial<BankAccountDto> = req.body;

  if (!id) {
    res.status(400).json({ error: 'Bank Account ID is required' });
    return;
  }

  try {
    const updatedBank = await updateBankAccount(Number(id), bankData);
    res.status(200).json({
      message: 'Bank Account updated successfully',
      data: updatedBank,
    });
  } catch (error: any) {
    console.error('Error updating bank account:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const deleteBankById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;

  if (!id) {
    res.status(400).json({ error: 'Bank Account ID is required' });
    return;
  }

  try {
    await deleteBankAccount(Number(id));
    res.status(200).json({ message: 'Bank Account deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting bank account:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getBankById = async (req: Request, res: Response) => {
  try {
    const store_id = res.locals.user.storeId;
    const { id } = req.params;
    const result = await findBankAccountById(Number(id), Number(store_id));
    res.send(result);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};
