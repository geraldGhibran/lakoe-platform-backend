import { Router } from 'express';
import { authentication } from '../middlewares/authentication';
import * as sellerController from '../controllers/seller.controller';

const sellerRoute = Router();

sellerRoute.get('/', authentication, sellerController.getDataSeller);

export default sellerRoute;
