import {
  getShippingRates,
  createShippingOrder,
} from '../controllers/biteship.controller';
import { Router } from 'express';

const biteshipRoute = Router();

biteshipRoute.post('/rates', getShippingRates);
biteshipRoute.post('/orders', createShippingOrder);

export default biteshipRoute;
