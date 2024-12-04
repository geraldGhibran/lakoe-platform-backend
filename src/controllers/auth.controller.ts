import { Express, Request, Response } from 'express';
import * as authService from '../services/auth.service';
export const login = async (req: Request, res: Response) => {
  try {
    const loginInfo = req.body;
    console.log(loginInfo);
    const result = await authService.login(loginInfo);
    console.log(result);
    res.send({
      message: 'login success',
      result: result.token,
    });
  } catch (error) {
    const err = error as Error;
    res.send(err.message);
  }
};

export const register = (req: Request, res: Response) => {
  try {
    const registerInfo = req.body;
    console.log(registerInfo);
    const result = authService.register(registerInfo);
    res.json('register success');
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
