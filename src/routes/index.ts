import { Router } from 'express';
import productRoute from './product.route';
import variantRoute from './variant.route';
import authRoute from './auth.route';
const router = Router();

router.use('/auth', authRoute);
router.use('/product', productRoute);
router.use('/varaint', variantRoute);

export default router;
