import { Router } from 'express';
import productRoute from './product.route';
import variantRoute from './variant.route';
import authRoute from './auth.route';
import adminRoute from './admin.route';
import locationRoute from './location.route';
import storeRoute from './store.route';
import templateMessageRoute from './templateMessage.route';
const router = Router();

router.use('/auth', authRoute);
router.use('/product', productRoute);
router.use('/varaint', variantRoute);
router.use('/auth', authRoute);
router.use('/admin', adminRoute);
router.use('/location', locationRoute);
router.use('/store', storeRoute);
router.use('/templateMessage', templateMessageRoute);
export default router;
