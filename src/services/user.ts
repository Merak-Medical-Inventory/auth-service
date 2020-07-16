import { findUser, updateUser } from "@db/entity/user/UserDao";
import { createUser } from "@db/entity/user/UserDao";

export const createUserSvc = async (user: any) => {
  try {
    return await createUser(user);
  } catch (e) {
    console.error("TCL: createUserSvc -> e", e);
    throw e;
  }
};

export const findUserSvc = async (username: any) => {
  try {
    return await findUser(username);
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
