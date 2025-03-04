import { Router } from 'express';
import productRoute from './product.route';
import variantRoute from './variant.route';
import authRoute from './auth.route';
import adminRoute from './admin.route';
import locationRoute from './location.route';
import storeRoute from './store.route';
import templateMessageRoute from './templateMessage.route';
import biteshipRoute from './biteship.route';
import midtrans from './midtrans.route';
import variantCombinationRoute from './variantCombination.route';
import categoriesRoute from './categories.route';
import withdrawRoute from './withdraw.route';
import invoiceRoute from './invoices.route';
import bankRoute from './bank.route';
import sellerRoute from './seller.route';

const router = Router();

router.use('/auth', authRoute);
router.use('/product', productRoute);
router.use('/varaint', variantRoute);
router.use('/auth', authRoute);
router.use('/admin', adminRoute);
router.use('/location', locationRoute);
router.use('/store', storeRoute);
router.use('/templateMessage', templateMessageRoute);
router.use('/biteship', biteshipRoute);
router.use('/midtrans', midtrans);
router.use('/variantCombination', variantCombinationRoute);
router.use('/categories', categoriesRoute);
router.use('/withdraw', withdrawRoute);
router.use('/invoices', invoiceRoute);
router.use('/bank', bankRoute);
router.use('/seller', sellerRoute);
export default router;
