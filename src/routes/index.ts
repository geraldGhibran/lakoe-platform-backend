import { Router } from 'express';
import ProductRoute from './product.route';
const router = Router();

router.use('/product', ProductRoute);

export default router;
