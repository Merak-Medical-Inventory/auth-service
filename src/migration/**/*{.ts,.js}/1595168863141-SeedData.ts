import {MigrationInterface, QueryRunner, getRepository} from "typeorm";
import { PrivilegeSeed } from "@seeds/privilege.seed"

export class SeedData1595168863141 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const privilege = await getRepository('privilege').save(
            PrivilegeSeed
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
