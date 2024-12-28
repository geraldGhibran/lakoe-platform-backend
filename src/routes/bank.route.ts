import { Router } from 'express';
import * as bankController from '../controllers/bank.controller';
import { authentication } from '../middlewares/authentication';

const bankRoute = Router();

bankRoute.get(
  '/storeId',
  authentication,
  bankController.getBankAccountByStoreId,
);

bankRoute.get('/:id', authentication, bankController.getBankById);

bankRoute.post('/', authentication, bankController.createBank);
bankRoute.put('/:id', authentication, bankController.updateBankById);
bankRoute.delete('/:id', authentication, bankController.deleteBankById);

export default bankRoute;
