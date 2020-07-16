import { createPrivilege, findPrivilege, findAllPrivilege } from "@db/entity/Privilege/PrivilegeDao";
import logger from '@shared/Logger';

export const createPrivilegeSvc = async (privilege: any) => {
  try {
    return await createPrivilege(privilege);
  } catch (e) {
    logger.error("TCL: createPrivilegeSvc -> e", e);
    throw e;
  }
};

export const findAllPrivilegeSvc = async (criteria: any) => {
  try {
    return await findAllPrivilege(criteria);
  } catch (e) {
    logger.error("TCL: findAllPrivilegeSvc -> e", e);
    throw e;
  }
};

export const findPrivilegeSvc = async (criteria: any) => {
  try {
    return await findPrivilege(criteria);
  } catch (e) {
    logger.error("TCL: findPrivilegeSvc -> e", e);
    throw e;
  }
};

