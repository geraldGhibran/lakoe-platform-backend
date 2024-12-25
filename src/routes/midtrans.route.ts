import {
  createSnapTransactionController,
  getStatusMidtrans,
} from '../controllers/midtrans.controller';
import { Router } from 'express';

const midtrans = Router();

midtrans.post('/', createSnapTransactionController);

export default midtrans;

midtrans.post('/editStatus', getStatusMidtrans);
