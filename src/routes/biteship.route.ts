import {
  getShippingRates,
  createShippingOrder,
  getTracking,
} from '../controllers/biteship.controller';
import { Router } from 'express';

const biteshipRoute = Router();

biteshipRoute.post('/rates', getShippingRates);
biteshipRoute.post('/orders', createShippingOrder);
biteshipRoute.get('/tracking', getTracking);

export default biteshipRoute;
