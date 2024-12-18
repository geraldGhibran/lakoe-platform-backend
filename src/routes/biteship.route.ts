import { Router } from 'express';
import {
  createShippingOrder,
  getShippingRates,
  getTracking,
} from '../controllers/biteship.controller';

const biteshipRoute = Router();

biteshipRoute.post('/rates', getShippingRates);
biteshipRoute.post('/orders', createShippingOrder);
biteshipRoute.get('/tracking', getTracking);
// biteshipRoute.post('/webhook', (req: Request, res: Response) => {
//   handleWebhook(req, res);
// });
// biteshipRoute.get(
//   '/status/:courierWaybillId',
//   (req: Request, res: Response) => {
//     handleWebhook(req, res);
//   },
// );

export default biteshipRoute;
