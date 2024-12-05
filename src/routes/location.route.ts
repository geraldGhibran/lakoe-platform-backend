import { Router } from 'express';
import * as locationController from '../controllers/location.controller';
import { authentication } from '../middlewares/authentication';

const locationRoute = Router();

locationRoute.post('/', authentication, locationController.addLocation);

export default locationRoute;
