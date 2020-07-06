import { getManager } from "typeorm";
import User from "@db/entity/user/User";
import { ErrorHandler } from "@helpers/ErrorHandler";

export const findUser = async (username: string) => {
  try {
    const userRepository = getManager().getRepository(User);
    return await userRepository
      .createQueryBuilder()
      .select("user")
      .from(User, "user")
      .where("user.username = :username", { username: username})
      .getOne();
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};

export const createUser = async (user: any) => {
  try {
    const userRepository = getManager().getRepository(User);
    await userRepository.save(user);

    return user;
  } catch (error) {
    throw new ErrorHandler(500, `${error.name} ${error.message}`);
  }
};
