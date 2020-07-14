import { getManager } from "typeorm";
import User from "@db/entity/user/User";
import {findPrivilege} from "@db/entity/Privilege/PrivilegeDao";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const findUser = async (username: string) => {
  try {
    const userRepository = getManager().getRepository(User);
    return await userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.privilege", "privilege")
      .where("user.username = :username", { username: username})
      .getOne();
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const createUser = async (user: any) => {
  try {
    const privilege = await findPrivilege({id : user.privilegeId});
    if(!privilege) throw new ErrorHandler(404,"Privilege not found");
    const userRepository = getManager().getRepository(User);
    user.privilege = privilege;
    await userRepository.save(user);
    return user;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
