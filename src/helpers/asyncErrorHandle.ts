import express from 'express';
const asyncErrorHandle = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    Promise.resolve(asyncErrorHandle(req, res, next))
        .catch(next)
}
export default asyncErrorHandle;