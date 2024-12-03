import { Express, Request, Response } from 'express';
import * as authService from '../services/auth.service';
export const login = (req: Request, res: Response) => {
  const loginInfo = req.body;
  try {
    const result = authService.login(loginInfo);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const register = (req: Request, res: Response) => {
  const registerInfo = req.body;
  try {
    const result = authService.register(registerInfo);
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const authCheck = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    // disini harus ditambahkan validasi token
    // dan cek apakah user ada di database dan memiliki toko
  } catch (error) {
    res.status(500).send(error);
  }
};
