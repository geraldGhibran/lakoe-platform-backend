import { Router } from 'express';
import * as variantCombinationController from '../controllers/variantCombination.controller';
import { authentication } from '../middlewares/authentication';
import upload from '../middlewares/file-upload';

const variantCombinationRoute = Router();

variantCombinationRoute.post(
  '/update',
  authentication,
  upload.single('images'),
  variantCombinationController.updateVariantItemValue,
);

export default variantCombinationRoute;
