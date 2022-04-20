import { NextFunction, RequestHandler, Response } from 'express';
import { AuthRequest } from './../common/request';
type AsyncRequestHandler = (req: AuthRequest, res: Response, next?: NextFunction) => Promise<any>;

export default function asyncHandle(fn: AsyncRequestHandler): RequestHandler {
    return (req, res, next) => fn(req, res, next).catch(next);
}