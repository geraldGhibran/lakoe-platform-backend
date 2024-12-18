import { OrderDto } from '../dto/biteship-dto';
import {
  calculateShippingRates,
  trackingOrder,
} from '../services/biteship.service';
import { createOrder } from '../services/biteship.service';
import { Request, Response } from 'express';

export const getShippingRates = async (req: Request, res: Response) => {
  const { origin_postal_code, destination_postal_code, couriers, items } =
    req.body;

  try {
    const rates = await calculateShippingRates({
      origin_postal_code,
      destination_postal_code,
      couriers,
      items,
    });
    res.status(200).json(rates);
  } catch (error: any) {
    if (!origin_postal_code || !destination_postal_code) {
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
