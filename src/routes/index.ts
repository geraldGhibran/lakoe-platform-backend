import { Router } from 'express';
import productRoute from './product.route';
import variantRoute from './variant.route';
const router = Router();

router.use('/product', productRoute);
router.use('/varaint', variantRoute);

export default router;
