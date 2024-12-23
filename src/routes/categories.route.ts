import { Router } from 'express';
import categoryController from '../controllers/categories.controller';

const categoriesRoute = Router();

categoriesRoute.get('/', categoryController.getCategories);

export default categoriesRoute;
