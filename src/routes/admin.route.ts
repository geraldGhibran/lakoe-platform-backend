import { Router } from 'express';
import * as adminController from '../controllers/admin.controller';
import { authentication } from '../middlewares/authentication';

const adminRoute = Router();

adminRoute.get('/getAllStore', authentication, adminController.getAllStore);

export default adminRoute;
