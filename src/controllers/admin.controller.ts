import { Request, Response } from 'express';
import * as adminService from '../services/admin.service';

export const getAllStore = async (req: Request, res: Response) => {
  try {
    const stores = await adminService.getAllStore();
    res.send(stores);
  } catch (error) {
    res.status(500).send(error);
  }
};
