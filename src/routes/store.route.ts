import { Router } from 'express';

import * as storeController from '../controllers/store.controller';
import { authentication } from '../middlewares/authentication';

const storeRoute = Router();

storeRoute.get(
  '/:user_id',
  authentication,
  storeController.getInformationStoreByUserId,
);

storeRoute.get('/', authentication, storeController.getAllStore);
export default storeRoute;
