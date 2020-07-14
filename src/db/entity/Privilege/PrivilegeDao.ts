import { getManager } from "typeorm";
import Privilege from "@db/entity/Privilege/Privilege";
import { ErrorHandler } from '@helpers/ErrorHandler';

export const createPrivilege = async (privilege: any) => {
  try {
    const userRepository = getManager().getRepository(Privilege);
    await userRepository.save(privilege);
    return privilege;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const findPrivilege = async (criteria: any) => {
  try {
    const userRepository = getManager().getRepository(Privilege);
    const privilege = await userRepository.findOne({where : criteria});
    return privilege;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};