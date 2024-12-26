import { Request, Response } from 'express';
import prisma from '../libs/prisma';
import {
  calculateShippingRates,
  createOrder,
  getAreaId,
  getListCouriers,
  trackingOrder,
  updateStatusByWaybill,
} from '../services/biteship.service';

export const getShippingRates = async (req: Request, res: Response) => {
  const { origin_area_id, destination_area_id, couriers, items } = req.body;

  try {
    const rates = await calculateShippingRates({
      origin_area_id,
      destination_area_id,
      couriers,
      items,
    });
    res.status(200).json(rates);
  } catch (error: any) {
    if (!origin_area_id || !destination_area_id) {
      res.status(400).json({ error: 'Origin and destination are required' });
      return;
    }
    res.status(500).json({ error: error.message });
  }
};

export const createShippingOrder = async (req: Request, res: Response) => {
  const { invoiceId } = req.body;

  if (!invoiceId) {
    res.status(400).json({ error: 'Invoice ID is required' });
    return;
  }

  try {
    const order = await createOrder(invoiceId);
    res.status(201).json(order);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getTracking = async (req: Request, res: Response) => {
  const { resi, service } = req.body;

  try {
    const tracking = await trackingOrder(resi, service);
    res.status(201).json(tracking);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCouriers = async (req: Request, res: Response) => {
  try {
    const storeId = res.locals.user.storeId;
    const couriers = await getListCouriers(storeId);
    res.status(200).json(couriers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAreaIds = async (req: Request, res: Response) => {
  const { input } = req.query;

  // Validate required parameters
  if (!input) {
    res.status(400).json({
      error: 'Missing required query parameters:  input',
    });
    return;
  }

  try {
    const areaIds = await getAreaId(input);
    res.status(200).json(areaIds.areas[0].id);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const handleWebhook = async (req: Request, res: Response) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(200).json({ message: 'OK' });
    }
    const { courier_waybill_id, status } = req.body;
    // console.log('cek sini', req.body);

    if (!courier_waybill_id || !status) {
      return res.status(400).json({ error: 'Invalid payload' });
    }

    const result = await updateStatusByWaybill(courier_waybill_id, status);

    res.status(200).json({
      message: 'Status updated successfully',
      updatedStatus: result.status,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getInvoicesStatus = async (req: Request, res: Response) => {
  try {
    const { courierWaybillId } = req.params;

    const invoices = await prisma.invoices.findFirst({
      where: { Courier: { resi: courierWaybillId } },
      select: { status: true },
    });

    if (!invoices) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.status(200).json(invoices);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
