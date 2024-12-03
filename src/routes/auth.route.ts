import { Router } from 'express';
import * as authController from '../controllers/auth.controller';

const authRoute = Router();

authRoute.post('/login', authController.login);
authRoute.post('/register', authController.register);
authRoute;

export default authRoute;
