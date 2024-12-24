import { Request, Response } from 'express';
import * as adminService from '../services/admin.service';

export const getAllStore = async (req: Request, res: Response) => {
  try {
    const stores = await adminService.getAllStore();
    res.send(stores);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const getStoreById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const store = await adminService.getStoreByUserId(Number(id));
    res.send(store);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const getTopSellers = async (req: Request, res: Response) => {
  try {
    const stores = await adminService.getTopSellers();
    res.send(stores);
  } catch (error) {
    const err = error as Error;
    res.status(500).send(err.message);
  }
};

export const getWithdrawRequest = async (req: Request, res: Response) => {
  try {
    const withdraws = await adminService.getWithdraw();
    res.status(200).json(withdraws);
  } catch (error) {
    res.status(500).json({ error: 'Gagal mengambil daftar withdraw' });
  }
};

export const processWithdrawRequest = async (req: Request, res: Response) => {
  const { withdrawId, action } = req.body;

  try {
    const result = await adminService.processWithdrawRequest(
      withdrawId,
      action,
    );
    res.status(200).json(result);
  } catch (error: Error | any) {
    res.status(400).json({ error: error.message });
  }
};

export const getStoreAndWithdrawsAmount = async (
  req: Request,
  res: Response,
) => {
  try {
    const data = await adminService.getStoreAndWithdrawAmount();
    res.status(200).json(data);
  } catch (error: Error | any) {
    res.status(400).json({ error: error.message });
  }
};
