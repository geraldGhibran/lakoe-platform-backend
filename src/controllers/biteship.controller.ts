import { Request, Response } from 'express';
import { OrderDto } from '../dto/biteship-dto';
import {
  calculateShippingRates,
  createOrder,
  trackingOrder,
} from '../services/biteship.service';

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

// export const handleWebhook = async (req: Request, res: Response) => {
//   try {
//     const { courier_waybill_id, status } = req.body;

//     if (!courier_waybill_id || !status) {
//       return res.status(400).json({ error: 'Invalid payload' });
//     }

//     const result = await updateStatusByWaybill(courier_waybill_id, status);

//     res.status(200).json({
//       message: 'Status updated successfully',
//       updatedStatus: result.status,
//     });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const getInvoicesStatus = async (req: Request, res: Response) => {
//   try {
//     const { courierWaybillId } = req.params;

//     const invoices = await prisma.invoices.findFirst({
//       where: { Courier: { resi: courierWaybillId } },
//       select: { status: true },
//     });

//     if (!invoices) {
//       return res.status(404).json({ error: 'Order not found' });
//     }

//     res.status(200).json(invoices);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };
