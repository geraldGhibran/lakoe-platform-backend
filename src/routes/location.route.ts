import { Router } from 'express';
import * as locationController from '../controllers/location.controller';
import { authentication } from '../middlewares/authentication';

const locationRoute = Router();

locationRoute.get(
  '/:storeId',
  authentication,
  locationController.getLocationsByStoreId,
);

locationRoute.get(
  '/byId/:id',
  authentication,
  locationController.getLocationsById,
);
locationRoute.post('/', authentication, locationController.addLocation);
locationRoute.put(
  '/:id',
  authentication,
  locationController.updateLocationById,
);
locationRoute.delete(
  '/:id',
  authentication,
  locationController.deleteLocationById,
);

export default locationRoute;
