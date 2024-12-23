import { Router } from 'express';
import {
  createShippingOrder,
  getShippingRates,
  getTracking,
  getCouriers,
  // getAreaIds
  getAreaIds,
} from '../controllers/biteship.controller';
import { authentication } from '../middlewares/authentication';

const biteshipRoute = Router();

biteshipRoute.post('/rates', getShippingRates);
biteshipRoute.post('/orders', createShippingOrder);
biteshipRoute.get('/tracking', getTracking);
biteshipRoute.get('/couriers', authentication, getCouriers);
biteshipRoute.get('/areaId', getAreaIds);
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
