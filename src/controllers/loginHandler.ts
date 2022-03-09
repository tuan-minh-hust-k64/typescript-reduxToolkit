import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import ErrorHandler from '../helpers/error';
import { signJWT, verifyJWT } from '../util/jwt.util';
import { createSession, invalidateSession } from '../db';
import userModel from '../model/user';

export async function loginHandler(req: Request | any, res: Response) {
  const isPassWord = await bcrypt.compare(req.body.password, req.user.password);
  if (!isPassWord) {
    throw new ErrorHandler(404, 'Password Invalid!');
  } else {
    req.user.password = '';
    const session = createSession(req.user.email);

    // create access token
    const accessToken = signJWT({ email: req.user.email, sessionId: session.sessionId }, '10h');

    const refreshToken = signJWT({ sessionId: session.sessionId, email: req.user.email }, '1y');

    // set access token in cookie
    res.cookie('accessToken', accessToken, {
      maxAge: 300000, // 5 minutes
      httpOnly: true,
    });
 
    res.cookie('refreshToken', refreshToken, {
      maxAge: 3.154e10, // 1 year
      httpOnly: true,
    });

    // send user back
    return res.send({
      success: true, 
      user: req.user
    });
  }
}
export function getSessionHandler(req: any, res: Response) {
  // @ts-ignore
  return res.send(req.user);
}
export function deleteSessionHandler(req: Request, res: Response) {
  res.cookie('accessToken', '', {
    maxAge: 0,
    httpOnly: true,
  });

  res.cookie('refreshToken', '', {
    maxAge: 0,
    httpOnly: true,
  });


  return res.send({
    success: true,
  });
}
