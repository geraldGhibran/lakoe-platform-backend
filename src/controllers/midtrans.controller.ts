import { Request, Response } from 'express';
import { createSnapTransactionWithInvoice } from '../services/midtrans.service';

export const createSnapTransactionController = async (
  req: Request,
  res: Response,
) => {
  const { customer_details, items, courierPrice } = req.body;

  try {
    const transaction = await createSnapTransactionWithInvoice(
      customer_details,
      items,
      courierPrice,
    );

    res.status(201).json(transaction);
  } catch (error: any) {
    console.error('Controller Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getStatusMidtrans = async (req: Request, res: Response) => {
  const { transaction_status, ...rest } = req.body;
  switch (transaction_status) {
    case 'settlement':
      console.log('PAID');
      break;
    case 'expire':
      console.log('CANCELED');
      break;
    case 'cancel':
      console.log('CANCELED');
      break;
    case 'failure':
      console.log('CANCELED');
      break;
  }
  console.log(transaction_status);
  res.send('success');
};
