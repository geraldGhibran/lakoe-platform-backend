import { Router } from 'express';
import * as variantController from '../controllers/variant.controller';

const variantRoute = Router();

variantRoute.delete('delete/', variantController.deleteVariant);

export default variantRoute;
