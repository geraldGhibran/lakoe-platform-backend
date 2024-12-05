import * as storeService from '../services/store.service';
import { Request, Response } from 'express';

export const getInformationStoreByUserId = async (
  req: Request,
  res: Response,
) => {
  try {
    const { user_id } = req.params;
    const stores = await storeService.getStoreByUserId(Number(user_id));
    res.send(stores);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAllStore = async (req: Request, res: Response) => {
  try {
    const stores = await storeService.getAllStore();
    res.send(stores);
  } catch (error) {
    res.status(500).send(error);
  }
};
