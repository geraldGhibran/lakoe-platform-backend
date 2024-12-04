import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import * as userService from '../services/user.service';
export const login = async (req: Request, res: Response) => {
  try {
    const loginInfo = req.body;
    const result = await authService.login(loginInfo);
    res.send({
      message: 'login success',
      result: result.token,
      user: result.user,
    });
  } catch (error) {
    const err = error as Error;
    res.send(err.message);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const registerInfo = req.body;
    const result = await authService.register(registerInfo);
    res.send({
      message: 'register success',
      result: result,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const authCheck = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user;
    const result = await userService.findUserByEmail(user.email);
    res.send(result);
  } catch (error) {
    res.status(500).send(error);
  }
};
