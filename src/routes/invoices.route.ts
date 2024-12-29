import {
  getAllInvoices,
  getInvoiceDetails,
} from '../controllers/invoices.controller';
import { Router } from 'express';

const invoiceRoute = Router();

invoiceRoute.get('/', getAllInvoices);
invoiceRoute.get('/:id', getInvoiceDetails);

export default invoiceRoute;
