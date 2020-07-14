import { Request, Response, NextFunction } from "express";
import { ErrorHandler } from "@helpers/ErrorHandler";
import { jwtVerify } from "@helpers/jwt";
import { has, get } from "lodash";
import moment from "moment";

export const sessionCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw new ErrorHandler(401, "UNAUTHORIZED");
    const token: string = authorization.split(" ")[1];
    const tokenPayload: any = await jwtVerify(token);
    if (
      !has(tokenPayload, "exp") ||
      moment().unix() >= get(tokenPayload, "exp")
    )
      throw new ErrorHandler(401, "UNAUTHORIZED");
    next();
  } catch (e) {
    next(e);
  }
};
