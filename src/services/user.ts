import { findAllUsers, updateUser } from '@models/user/UserDao';
import {findUser} from '@db/entity/user/UserDao';
import { createUser } from '@db/entity/user/UserDao';

export const createUserSvc = async (user : any) =>{
    try{
        return await createUser(user);
    }catch(e){
        console.error('TCL: createUserSvc -> e', e);
        throw e;
    }
}

export const findUserSvc = async (username: any) => {
    try {
      return await findUser(username);
    } catch (e) {
      console.error('TCL: findUserSvc -> e', e);
      throw e;
    }
  };

export const findAllUsersSvc = async (criteria: any, projection: any = {}, options: any = {}) => {
try {
    return await findAllUsers(criteria, projection, options);
} catch (e) {
    console.error('TCL: findAllUsersSvc -> e', e.message);
    throw e;
}
};

export const updateUserSvc = async (criteria: any, dataToUpdate: any = {}, options: any = {}) => {
try {
    return await updateUser(criteria, dataToUpdate, options);
} catch (e) {
    console.error('TCL: updateUserSvc -> e', e);
    throw e;
}
};