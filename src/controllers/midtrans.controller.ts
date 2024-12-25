import { Request, Response } from 'express';
import {
  createSnapTransactionWithInvoice,
  updateStatusInvoice,
} from '../services/midtrans.service';

enum StatusInvoice {
  PROCESS = 'PROCESS',
  CANCELED = 'CANCELED',
  WAIT_TO_PICKUP = 'WAIT_TO_PICKUP',
  DELIVERED = 'DELIVERED',
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  DELIVERING = 'DELIVERING',
}
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

export const updateStatus = async (req: Request, res: Response) => {
  try {
    const { transaction_status, order_id, ...rest } = req.body;
    console.log(transaction_status, order_id);
    if (transaction_status === 'settlement') {
      await updateStatusInvoice(order_id, StatusInvoice.PAID);
    }
    res.send('success');
  } catch (error) {
    const err = error as Error;
    console.log(err);
    res.status(500).send(err.message);
  }
};
