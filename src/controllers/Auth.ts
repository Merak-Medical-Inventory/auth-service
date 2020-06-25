import { Request , Response , NextFunction } from 'express';
import { omit, get, has } from 'lodash'
import bcrypt from 'bcryptjs'
import moment from 'moment'

import { handleSuccess } from '@helpers/succesHandler'
import { ErrorHandler } from '@helpers/ErrorHandler'
import { jwtSign,jwtVerify } from '@helpers/jwt'
import { findUserSvc } from '@services/user'

export const login = async (req : Request , res : Response , next: NextFunction) =>{
  const { email, password } = req.body;
  try{
    const criteria = { 
      email
    }
    const data = await findUserSvc(criteria);
    if (!data) throw new ErrorHandler(400, 'WRONG_USER_PASSWORD');
    const { password: hashPass } = data;
    const cleanData = omit(get(data, '_doc'), ['password', 'isEnabled', 'createdAt', 'updatedAt'])
    const dataToSign = omit(get(data, '_doc'), ['password', 'isEnabled', 'createdAt', 'updatedAt'])
    const valid = await bcrypt.compare(password, hashPass);
    if (!valid) throw new ErrorHandler(400, 'WRONG_USER_PASSWORD');
    const jwtInfo = await jwtSign(dataToSign)
    handleSuccess(201, 'LOGIN SUCCESS', res, next, { ...cleanData, token: jwtInfo });
  }catch (e){
    next(e);
  }
}

export const check = async (req : Request , res : Response , next: NextFunction) =>{
  try{
    const { authorization } = req.headers;
    if (!authorization) throw new ErrorHandler(401, 'UNAUTHORIZED');
    const token: string = authorization.split(' ')[1];
    const tokenPayload: any = await jwtVerify(token);
    if (!has(tokenPayload, 'exp') || moment().unix() >= get(tokenPayload, 'exp')) throw new ErrorHandler(401, 'UNAUTHORIZED');
    handleSuccess(201, 'LOGIN SUCCESS', res, next, omit(tokenPayload, ['iat', 'exp', 'aud', 'iss']));
  }catch (e){
    next(e);
  }
}