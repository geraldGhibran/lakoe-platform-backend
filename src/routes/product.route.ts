import { Router } from 'express';

import * as productController from '../controllers/product.controller';
import { authentication } from '../middlewares/authentication';

const ProductRoute = Router();

ProductRoute.get('/', authentication, productController.getAllProductByStoreId);
ProductRoute.get(
  'getByName/',
  authentication,
  productController.getProductByName,
);
ProductRoute.delete(
  'delete/',
  authentication,
  productController.deleteProductById,
);
ProductRoute.get('/:id', productController.getProductById);

export default ProductRoute;
