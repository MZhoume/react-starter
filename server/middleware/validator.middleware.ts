import { RequestHandler } from 'express';
import { validate } from 'class-validator';

export function validatorFor<T>(
  type: new (...args: any[]) => T
): RequestHandler {
  return async (req, res, next) => {
    const body = new type();
    Object.assign(body, req.body);

    const errors = await validate(body);
    if (errors.length > 0) {
      res.status(400).send(
        errors.map(e => ({
          name: e.property,
          message: Object.keys(e.constraints).map(k => e.constraints[k])
        }))
      );
    } else {
      req.body = body;
      next();
    }
  };
}
