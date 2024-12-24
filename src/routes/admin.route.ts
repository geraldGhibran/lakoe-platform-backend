import { Router } from 'express';
import * as adminController from '../controllers/admin.controller';
import { authentication } from '../middlewares/authentication';

const adminRoute = Router();

adminRoute.get('/getAllStore', authentication, adminController.getAllStore);
adminRoute.get(
  '/getStoreById/:id',
  authentication,
  adminController.getStoreById,
);
adminRoute.get('/getTopSeller', authentication, adminController.getTopSellers);
adminRoute.get('/withdraw', authentication, adminController.getWithdrawRequest);
adminRoute.post(
  '/withdraw/process',
  authentication,
  adminController.processWithdrawRequest,
);
adminRoute.get(
  '/amount',
  authentication,
  adminController.getStoreAndWithdrawsAmount,
);

export default adminRoute;
