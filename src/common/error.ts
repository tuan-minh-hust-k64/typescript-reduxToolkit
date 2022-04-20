export class ServerError extends Error {
    status: number;
    message: string;
    data?: any;
    constructor(args: {status?: number, message?: string, data?: any}){
        super();
        this.status = args.status?? 200;
        this.message = args.message?? 'success';
        this.data = args.data;
    }
}

export class BadRequestError extends ServerError {
    constructor({...payload}: any = {}){
        super({status: 400, message: 'Bad Request', ...payload});

    }
}
export class UnauthorizedError extends ServerError {
    constructor({...payload}: any = {}){
        super({status: 401, message: 'Unauthorized!', ...payload});
    }
}
export class ForbiddenError extends ServerError {
    constructor({...payload}: any = {}){
        super({status: 403, message: 'Forbidden Error', ...payload});
    }
}
export class NotFoundError extends ServerError {
    constructor({...payload}: any = {}){
        super({status: 404, message: "Not Found", ...payload});
    }
}
export class IntervalServerError extends ServerError {
    constructor({...payload}: any = {}){
        super({status:500, message:'IntervalServerError', ...payload});
    }
}