import { Request, Response, NextFunction } from "express";
import { omit, get, has } from "lodash";
import bcrypt from "bcryptjs";
import moment from "moment";

import { handleSuccess } from "@helpers/succesHandler";
import { ErrorHandler } from "@helpers/ErrorHandler";
import { jwtSign, jwtVerify } from "@helpers/jwt";
import { findUserSvc } from "@services/user";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  try {
    const data = await findUserSvc({ username });
    if (!data) throw new ErrorHandler(400, "WRONG_USER_PASSWORD");
    const hashPass = data.password;
    const valid = await bcrypt.compare(password, hashPass);
    if (!valid) throw new ErrorHandler(400, "WRONG_USER_PASSWORD");
    const response = {
      id: data.id,
      username: data.username,
      email: data.email,
      name: data.name,
      last_name: data.last_name,
      rol: data.rol,
      department: data.department,
    };
    const jwtInfo = await jwtSign(response);
    handleSuccess(201, "LOGIN SUCCESS", res, next, {
      response,
      token: jwtInfo,
    });
  } catch (e) {
    next(e);
  }
};

export const check = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const apitoken = get(req, "headers.x-api-token", "");
    const { authorization } = req.headers;
    if (!authorization && (!apitoken || apitoken !== process.env.API_TOKEN)) throw new ErrorHandler(401, "UNAUTHORIZED");
    if (!apitoken && authorization) {
      const token: string = authorization.split(" ")[1];
      const tokenPayload: any = await jwtVerify(token);
      if (
        !has(tokenPayload, "exp") ||
        moment().unix() >= get(tokenPayload, "exp")
      ) throw new ErrorHandler(401, "UNAUTHORIZED");
      handleSuccess(
        201,
        "LOGIN SUCCESS",
        res,
        next,
        omit(tokenPayload, ["iat", "exp", "aud", "iss"])
      );
    } else {
      handleSuccess(
        201,
        "LOGIN SUCCESS",
        res,
        next,
        {}
      );
    }
  } catch (e) {
    next(e);
  }
};