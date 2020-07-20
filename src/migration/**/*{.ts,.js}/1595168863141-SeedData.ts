import { MigrationInterface, QueryRunner, getRepository } from "typeorm";
import { PrivilegeSeed } from "@seeds/privilege.seed";
import { RolSeed } from "@seeds/rol.seed";
import Rol from "@db/entity/Rol/Rol"
import Privilege from "@db/entity/Privilege/Privilege";

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
