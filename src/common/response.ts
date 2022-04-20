import { Response } from "express";

export const successResponse = (response: Response, data?: any) => {
    return response.json({success: true, data: data});
}
export const failureResponse = (response: Response, {...payload}: any = {}) => {    
    return response.json({success: false, ...payload});
}
export const errorResponse = (response: Response, status: number, {...payload}: any = {}) => {
    return response.status(status).json({success: false, ...payload});
}