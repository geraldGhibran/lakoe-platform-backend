import { OrderDto } from '../dto/biteship-dto';
import {
  calculateShippingRates,
  trackingOrder,
  getListCouriers,
  getAreaId,
} from '../services/biteship.service';
import { createOrder } from '../services/biteship.service';
import { Request, Response } from 'express';

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
  const orderData: OrderDto = req.body;

  try {
    const order = await createOrder(orderData);
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
  const { countries, input, type } = req.query;

  // Validate required parameters
  if (!countries || !input || !type) {
    res.status(400).json({
      error: 'Missing required query parameters: countries, input, type.',
    });
    return;
  }

  console.log(countries, input, type);

  try {
    const areaIds = await getAreaId(countries, input, type);
    res.status(200).json(areaIds.areas[0].id);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
