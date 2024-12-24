import { Request, Response } from 'express';
import * as withdrawService from '../services/withdraw.service';

export const createWithdrawRequest = async (req: Request, res: Response) => {
  const { storeId, amount } = req.body;

  try {
    const withdraw = await withdrawService.createWithdrawRequest(
      storeId,
      amount,
    );
    res.status(201).json({ message: 'Withdraw request created', withdraw });
  } catch (error: Error | any) {
    res.status(400).json({ error: error.message });
  }
};
