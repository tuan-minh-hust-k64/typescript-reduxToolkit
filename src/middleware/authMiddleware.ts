import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../helpers/error";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const {accessToken, refreshToken} = req.cookies;
    if(!refreshToken){
        throw new ErrorHandler(401, 'Please authenticate!');
    }
    next();
}
export default authMiddleware;