import { createPrivilege } from "@db/entity/Privilege/PrivilegeDao";

export const createPrivilegeSvc = async (privilege: any) => {
  try {
    return await createPrivilege(privilege);
  } catch (e) {
    console.error("TCL: createPrivilegeSvc -> e", e);
    throw e;
  }
};
