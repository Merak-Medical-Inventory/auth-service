import { findUser, updateUser, deleteUser, findAllUser } from "@db/entity/user/UserDao";
import { createUser } from "@db/entity/user/UserDao";
import logger from '@shared/Logger';

export const createUserSvc = async (user: any) => {
  try {
    return await createUser(user);
  } catch (e) {
    logger.error("TCL: createUserSvc -> e", e);
    throw e;
  }
};

export const findAllUserSvc = async (criteria: any) => {
  try {
    return await findAllUser(criteria);
  } catch (e) {
    logger.error("TCL: findUserSvc -> e", e);
    throw e;
  }
};

export const findUserSvc = async (criteria: any) => {
  try {
    return await findUser(criteria);
  } catch (e) {
    logger.error("TCL: findUserSvc -> e", e);
    throw e;
  }
};

export const updateUserSvc = async (id: any, dataToUpdate: any = {}) => {
  try {
    return await updateUser(id, dataToUpdate);
  } catch (e) {
    logger.error("TCL: updateUserSvc -> e", e);
    throw e;
  }
};

export const deleteUserSvc = async (id: any) => {
  try {
    return await deleteUser(id);
  } catch (e) {
    logger.error("TCL: deleteUserSvc -> e", e);
    throw e;
  }
};
