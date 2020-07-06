import { Request, Response , NextFunction } from 'express';
import bcrypt from 'bcryptjs'

import { IUser } from '@models/user/User'
import { createUserSvc, findUserSvc, findAllUsersSvc, updateUserSvc } from '@services/user'
import { handleSuccess } from '@helpers/succesHandler'
import { ErrorHandler } from '@helpers/ErrorHandler/'

interface IRequest extends Request {
  [key: string]: any;
}

export const createUserCtrl = async (req : IRequest , res : Response , next: NextFunction) => {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 10);
    try{
        const data =  await createUserSvc(user);
        handleSuccess(201, 'User created', res, next,data);
    }catch (e){
        next(new ErrorHandler(500, e.message));
    }
}

export const updateUserCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
  const update = req.body;
  const { id } = req.params;
  const criteria = {
    _id: id
  };
  try {
    const data = await updateUserSvc(criteria, update);
    handleSuccess(201, 'User Updated Successfully', res, next, data);
  } catch (e) {
    console.error('ERROR: controller -> createUserCtrl', e);
    next(e);
  }
};

export const getProfileCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
    const id = process.env.CURRENT_USER_ID;
    const criteria = {
      _id: id,
      isEnabled: true
    };
    try {
      const data = await findUserSvc(criteria);
      handleSuccess(200, 'User information', res, next, data);
    } catch (e) {
      console.error('ERROR: controller -> getProfileCtrl', e);
      next(e);
    }
  };
  

export const getUserCtrl = async (req: IRequest, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const criteria = {
    _id: id,
    isEnabled: true
  };
  try {
    const data = await findUserSvc(criteria);
    handleSuccess(200, 'User information', res, next, data);
  } catch (e) {
    console.error('ERROR: controller -> getUserCtrl', e);
    next(e);
  }
};

export const getAllUserCtrl = async (_req: IRequest, res: Response, next: NextFunction) => {
  const criteria = {
    isEnabled: true
  };
  try {
    const data = await findAllUsersSvc(criteria);
    handleSuccess(200, 'User list', res, next, data);
  } catch (e) {
    console.error('ERROR: controller -> getAllUserCtrl', e.message);
    next(e);
  }
};

