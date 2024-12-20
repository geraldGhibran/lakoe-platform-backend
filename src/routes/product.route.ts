import { Router } from 'express';
import upload from '../middlewares/file-upload';
import * as productController from '../controllers/product.controller';
import { authentication } from '../middlewares/authentication';

const ProductRoute = Router();

ProductRoute.post(
  '/create',
  authentication,

  upload.array('images', 4),
  productController.createProduct,
);

ProductRoute.get('/', authentication, productController.getAllProductByStoreId);
ProductRoute.post(
  '/getByName',
  authentication,
  productController.getProductByName,
);
ProductRoute.delete(
  'delete/',
  authentication,
  productController.deleteProductById,
);
ProductRoute.get('/:url', productController.getProductByUrl);

ProductRoute.delete(
  '/deleteMany',
  authentication,
  productController.DeleteManyProduct,
);

// ProductRoute.post('/test', authentication, upload.array('images', 4)
//   , productController.testFormData)
export default ProductRoute;
