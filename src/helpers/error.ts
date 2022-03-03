import { Response } from 'express';

export default class ErrorHandler extends Error {
  constructor(statusCode: number, message: string) {
    super();
    this.name = statusCode.toString();
    this.message = message;
  }
}
export const handleError = (err: Error, res: Response) => {
  const { name, message } = err;
  res.status(parseInt(name, 10)).send({
    status: 'error',
    statusCode: name,
    message: message,
    success: false,
  });
};
