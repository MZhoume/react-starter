import { Request, Response, NextFunction } from 'express';
import { HttpException } from '../exceptions/http.exception';
import { ErrorMessage } from '../common/messages/error.message';

export function globalErrorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof HttpException) {
    res.status(error.statusCode).send(error);
  } else {
    console.error(error);
    res
      .status(500)
      .send(
        new ErrorMessage('An error occurred, please try again later.', error)
      );
  }
}
