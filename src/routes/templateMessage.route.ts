import * as templateMessageController from '../controllers/templateMessage.controller';
import { Router } from 'express';
import { authentication } from '../middlewares/authentication';

const templateMessageRoute = Router();

templateMessageRoute.post(
  '/create',
  authentication,
  templateMessageController.createTemplateMessage,
);

templateMessageRoute.get(
  '/',
  authentication,
  templateMessageController.getAllTemplateMessage,
);

templateMessageRoute.delete(
  '/delete/',
  authentication,
  templateMessageController.deleteTemplateMessage,
);

templateMessageRoute.put(
  '/edit/',
  authentication,
  templateMessageController.updateTemplateMessage,
);

export default templateMessageRoute;
