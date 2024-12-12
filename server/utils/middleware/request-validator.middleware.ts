/*
  This is a middleware that does exactly as the name says it does, validates the request body.
  This is another mechanism in ensuring that the right data is passed to the request body.

  Refer to the inspection router to see how it is used.
*/

import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import {  IUserInRequest } from "../interfaces";

export interface ExpressRequest extends Request {
  user: IUserInRequest; // Make it optional, if user may not always exist
}

export const validateRequestMiddleware =(validationSchema: Joi.ObjectSchema, type: string) => (req: Request, res: Response, next: NextFunction) => {
  const getType = {
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
    file: req.file,
  };

  const options = { messages: { key: '{{key}} ' } };
  const data = (getType as Record<string, any>)[type];

  const validationResult = validationSchema.validate(data, options);
  if (!validationResult.error) {
    return next();
  };
  const { message } = validationResult.error.details[0];
  return res.status(422).json({
    status: 'error',
    statusCode: 422,
    message: message.replace(/"/gi, ''),
  });
};
