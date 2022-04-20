import { Router } from "express";
import { BadRequestError } from "../common/error";
import { successResponse } from "../common/response";
import asyncHandle from "../helpers/asyncHandle";
import userModel from "../model/user";
import {authService} from "../service/auth.service";


const authRouter = Router();
authRouter.post('/login', asyncHandle(async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password) {
        throw new BadRequestError()
    }
    const data = await authService.login({email, password});
    const { accessToken, refreshToken, ...response } = data;
    const cookieOptions = { httpOnly: true, secure: true};
    
    res.cookie('x-access-token', accessToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 365 });
    res.cookie('x-refresh-token', refreshToken, { ...cookieOptions, maxAge: 1000 * 60 * 60 * 24 * 365 });
    return successResponse(res, response);
}))

authRouter.post('/register', asyncHandle(async (req, res) => {
    const {name, email, password} = req.body;
    if(!email || !password) throw new BadRequestError()
    const data = await authService.register({name, email, password});

    return successResponse(res, data);
}))

authRouter.post('/logout', asyncHandle(async (req, res) => {
    const {userId} = req.body;
    const data = await authService.logout({userId});
    return successResponse(res, data);
}))
export default authRouter;