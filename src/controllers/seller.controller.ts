import { Request, Response } from 'express';
import * as sellerService from '../services/seller.sevice';

export const getDataSeller = async (req: Request, res: Response) => {
  try {
    const storeId = res.locals.user.storeId;

    if (!storeId) {
      res.status(400).json({ error: 'storeId is required' });
    }

    const data = await sellerService.getDataSeller(Number(storeId));
    res.send(data);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};
