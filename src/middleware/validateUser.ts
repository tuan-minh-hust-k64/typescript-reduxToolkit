import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../helpers/error';
import userModel from '../model/user';
import {IUser} from '../model';

async function validateUser(req: Request | any, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new ErrorHandler(404, 'Invalid email or password!');
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      throw new ErrorHandler(404, 'User not found!');
    }
    //@ts-ignore
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
}
export default validateUser;
