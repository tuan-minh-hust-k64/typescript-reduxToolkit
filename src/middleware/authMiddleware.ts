import { NextFunction, Request, Response } from 'express';
import ErrorHandler from '../helpers/error';
import userModel from '../model/user';
import { verifyJWT } from '../util/jwt.util';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { accessToken, refreshToken } = req.cookies;
  if(refreshToken){
    const decode = verifyJWT(refreshToken);
    //@ts-ignore
    const emailAuth = decode.payload.email;
    try {
      const userExit = await userModel.findOne({ email: emailAuth });
      if (userExit) {
        //@ts-ignore
        req.email = emailAuth;
        //@ts-ignore
        req.user = userExit;
      }else{
        throw new ErrorHandler(401, 'Please authenticate!');
      }
    } catch (err) {
      next(err);
    }
  }else{
    next(new ErrorHandler(401, 'Please authenticate'));
  }
  next();
};
export default authMiddleware;
