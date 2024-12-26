import { authentication } from '../middlewares/authentication';
import { Router } from 'express';

import * as withdrawController from '../controllers/withdraw.controller';

const withdrawRoute = Router();

withdrawRoute.post(
  '/',
  authentication,
  withdrawController.createWithdrawRequest,
);

export default withdrawRoute;
