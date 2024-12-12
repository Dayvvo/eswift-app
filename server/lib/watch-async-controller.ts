/*
  The purpose of this is to properly resolve async requests
  without the need for third party package.

  Essentially it is used for handling exceptions, before passing them to
  error handlers.

  Check the Inspection Router to see how it is used.
*/

import { Request, Response, NextFunction } from "express";
import { ExpressController } from "../utils/interfaces/types";

export const WatchAsyncController =
  (fn: ExpressController) =>
  (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(fn(req, res).catch(next));