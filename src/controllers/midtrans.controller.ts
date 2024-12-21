import { Request, Response } from 'express';
import { createSnapTransaction } from '../services/midtrans.service';

export const createSnapTransactionController = async (
  req: Request,
  res: Response,
) => {
  const { gross_amount, customer_details, items, store_id } = req.body;

  try {
    const transactionData = {
      transaction_details: {
        order_id: '', // Diisi setelah invoice dibuat
        gross_amount,
      },
      customer_details,
      items,
      store_id,
    };

    const { midtransResponse, invoice } =
      await createSnapTransaction(transactionData);

    res.status(201).json({
      message: 'Transaction created successfully.',
      midtrans: midtransResponse,
      invoice,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
