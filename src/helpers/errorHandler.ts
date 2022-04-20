import { failureResponse, errorResponse } from './../common/response';
import { NextFunction, Request, Response } from "express";
import { ServerError } from "../common/error";

export const handleApiError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err) {
        if(err instanceof ServerError) {
            const {status, message, data} = err;
            if(status === 200) {
                return failureResponse(res, {message, data});
            }
            return errorResponse(res, status, {message, data});
        }
        return errorResponse(res, 500, {message: 'Internal Server Error'});
    }
    return next();
}
export const handleNotFoundErr = (err: Error, req: Request, res: Response, next: NextFunction) => {
    errorResponse(res, 404, {message: "Not Found"});
    return next();
}