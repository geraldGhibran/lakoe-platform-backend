import {
  getShippingRates,
  createShippingOrder,
  getTracking,
  getCouriers,
  // getAreaIds
  getAreaIds,
} from '../controllers/biteship.controller';
import { Router } from 'express';
import { authentication } from '../middlewares/authentication';

const biteshipRoute = Router();

biteshipRoute.post('/rates', getShippingRates);
biteshipRoute.post('/orders', createShippingOrder);
biteshipRoute.get('/tracking', getTracking);
biteshipRoute.get('/couriers', authentication, getCouriers);
biteshipRoute.get('/areaId', getAreaIds);

export default biteshipRoute;
