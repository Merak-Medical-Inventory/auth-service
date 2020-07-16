import { findUser, updateUser, deleteUser } from "@db/entity/user/UserDao";
import { createUser } from "@db/entity/user/UserDao";

export const createUserSvc = async (user: any) => {
  try {
    return await createUser(user);
  } catch (e) {
    console.error("TCL: createUserSvc -> e", e);
    throw e;
  }
};

export const findUserSvc = async (criteria: any) => {
  try {
    return await findUser(criteria);
  } catch (e) {
    console.error("TCL: findUserSvc -> e", e);
    throw e;
  }
};

export const updateUserSvc = async (id: any, dataToUpdate: any = {}) => {
  try {
    return await updateUser(id, dataToUpdate);
  } catch (e) {
    console.error("TCL: updateUserSvc -> e", e);
    throw e;
  }
};

export const deleteUserSvc = async (id: any) => {
  try {
    return await deleteUser(id);
  } catch (e) {
    console.error("TCL: updateUserSvc -> e", e);
    throw e;
  }
};
