import {
  createSnapTransactionController,
  updateStatus,
} from '../controllers/midtrans.controller';
import { Router } from 'express';

const midtrans = Router();

midtrans.post('/', createSnapTransactionController);
midtrans.post('/editStatus', updateStatus);

export default midtrans;
