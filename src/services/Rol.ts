import logger from "@shared/Logger";
import { createRol, findAllRols, findRol } from "@db/entity/Rol/RolDao";
import { findPrivilege } from "@db/entity/Privilege/PrivilegeDao";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const createRolSvc = async (rol: any) => {
  try {
    const privilegeList: any = [];
    for await(const privilegeId of rol.privileges) {
      console.log(privilegeId);
      const privilege = await findPrivilege({ id: privilegeId });
      console.log(privilege);
      if (privilege) privilegeList.push(privilege);
    }
    if (privilegeList.length <= 0)
      throw new ErrorHandler(
        404,
        "No se encontraron los privilegios seleccionados"
      );
    rol.privileges = privilegeList;
    console.log(rol);
    return await createRol(rol);
  } catch (e) {
    logger.error("TCL: createRolSvc -> e", e);
    throw e;
  }
};

export const findAllRolsSvc = async (criteria: any) => {
  try {
    return await findAllRols(criteria);
  } catch (e) {
    logger.error("TCL: findAllRolsSvc -> e", e);
    throw e;
  }
};

export const findRolSvc = async (criteria: any) => {
  try {
    return await findRol(criteria);
  } catch (e) {
    logger.error("TCL: findRolSvc -> e", e);
    throw e;
  }
};
