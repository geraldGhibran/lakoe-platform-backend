import { Router } from 'express';

import * as storeController from '../controllers/store.controller';
import { authentication } from '../middlewares/authentication';
import upload from '../middlewares/file-upload';

const storeRoute = Router();

storeRoute.get(
  '/:user_id',
  authentication,
  storeController.getInformationStoreByUserId,
);

storeRoute.get('/', authentication, storeController.getAllStore);

storeRoute.put(
  '/edit/:user_id',
  authentication,
  upload.fields([{ name: 'logo_img', maxCount: 1 }]),
  storeController.editStoreByUserId,
);
export default storeRoute;
