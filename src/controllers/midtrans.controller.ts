import { Request, Response } from 'express';
import { createSnapTransactionWithInvoice } from '../services/midtrans.service';

export const createSnapTransactionController = async (
  req: Request,
  res: Response,
) => {
  const { customer_details, items } = req.body;

  try {
    const transaction = await createSnapTransactionWithInvoice(
      customer_details,
      items,
    );

    res.status(201).json(transaction);
  } catch (error: any) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
