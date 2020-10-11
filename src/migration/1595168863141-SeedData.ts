import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { PrivilegeSeed } from "@seeds/privilege.seed";
import { RolSeed } from "@seeds/rol.seed";
import { UserSeed } from "@seeds/user.seed";
import Rol from "@db/entity/Rol/Rol"
import Privilege from "@db/entity/Privilege/Privilege";
import User from "@db/entity/user/User";
import bcrypt from "bcryptjs";
import Department from '@db/entity/Department/Department';
import {DepartmentSeed} from '@seeds/department.seed';
import Inventory from '@db/entity/Inventory/Inventory';
import { principalInventory } from '@seeds/inventory.seed';

export class SeedData1595168863141 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const privileges = await getRepository(Privilege).save(PrivilegeSeed);
    const rolRepository = getRepository(Rol);
    for await (const rol of RolSeed) {
      const mockRol: any = rol;
      mockRol.privileges = privileges.filter((privilege) =>
        rol.privileges.includes(privilege.name)
      );
      await rolRepository.save(mockRol);
    }
    await getRepository(Department).save(DepartmentSeed);
    const departmentRepository = getRepository(Department);
    const userRepository = getRepository(User);
    const inventoryRepository = getRepository(Inventory);
    const principalDepartment = await departmentRepository.findOne({code : "001"});
    principalInventory.deparment = principalDepartment;
    await inventoryRepository.save(principalInventory);
    for await (const user of UserSeed) {
      const mockUser: any = user;
      const rol = await rolRepository.findOne({name:user.rol});
      mockUser.rol = rol;
      const department = await departmentRepository.findOne({name:user.department});
      mockUser.department = department;
      mockUser.password = user.password = await bcrypt.hash(user.password, 10);
      await userRepository.save(mockUser);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
