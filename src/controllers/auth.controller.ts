import { Express, Request, Response } from 'express';
import * as authService from '../services/auth.service';
export const login = (req: Request, res: Response) => {
  const loginInfo = req.body;
  try {
    const result = authService.login(loginInfo);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};

export const register = (req: Request, res: Response) => {
  const registerInfo = req.body;
  try {
    const result = authService.register(registerInfo);
    res.json(result);
  } catch (error) {
    res.json(error);
  }
};
