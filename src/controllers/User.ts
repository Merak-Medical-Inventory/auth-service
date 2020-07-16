import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";

import { createUserSvc, findUserSvc, updateUserSvc, deleteUserSvc, findAllUserSvc } from "@services/user";
import { handleSuccess } from "@helpers/succesHandler";
import { ErrorHandler } from "@helpers/ErrorHandler/";
import { findAllUser } from '@db/entity/user/UserDao';

interface IRequest extends Request {
  [key: string]: any;
}

export const getProfileCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const id = process.env.USER_ID
  try {
    const data = await findUserSvc({id});
    if(!data) throw new ErrorHandler(404, "User no encontrado");
    handleSuccess(200, "User information", res, next, data);
  } catch (e) {
    console.error("ERROR: controller -> getProfileCtrl", e);
    next(e);
  }
};

export const getAllUsersCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const id = process.env.USER_ID
  try {
    const data = await findAllUserSvc({});
    handleSuccess(200, "Users information", res, next, data);
  } catch (e) {
    console.error("ERROR: controller -> getProfileCtrl", e);
    next(e);
  }
};

export const getUserByIdCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const {id} = req.params
  try {
    const data = await findUserSvc({id});
    if(!data) throw new ErrorHandler(404, "User no encontrado");
    handleSuccess(200, "User information", res, next, data);
  } catch (e) {
    console.error("ERROR: controller -> getProfileCtrl", e);
    next(e);
  }
};

export const createUserCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;
  user.password = await bcrypt.hash(user.password, 10);
  try {
    const data = await createUserSvc(user);
    handleSuccess(201, "User created", res, next, data);
  } catch (e) {
    next(new ErrorHandler(500, e.message));
  }
};

export const updateUserCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const update = req.body;
  const { id } = req.params;
  try {
    const data = await updateUserSvc(id, update);
    handleSuccess(
      201,
      "Usuario actualizado satisfactoriamente",
      res,
      next,
      data
    );
  } catch (e) {
    console.error("ERROR: controller -> createUserCtrl", e);
    next(e);
  }
};

export const deleteUserCtrl = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params;
  try {
    const data = await deleteUserSvc(id);
    handleSuccess(
      201,
      "Usuario eliminado satisfactoriamente",
      res,
      next,
      data
    );
  } catch (e) {
    console.error("ERROR: controller -> createUserCtrl", e);
    next(e);
  }
};
