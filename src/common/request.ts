import { Request } from "express";

export type Credentials = {
    userId: String;
    userName: String;
}
export interface AuthRequest extends Request {
    credentials?: Credentials
}