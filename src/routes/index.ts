import { Router } from 'express';
import productRoute from './product.route';
import variantRoute from './variant.route';
import authRoute from './auth.route';
import adminRoute from './admin.route';
const router = Router();

router.use('/auth', authRoute);
router.use('/product', productRoute);
router.use('/varaint', variantRoute);
router.use('/auth', authRoute);
router.use('/admin', adminRoute);

export default router;
