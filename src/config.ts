import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import Privilege from '@db/entity/Privilege/Privilege';
import Rol from '@db/entity/Rol/Rol';
import Department from '@db/entity/Department/Department';
import User from '@db/entity/user/User';


const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: "merak-inventory.czdwqkwpxkdi.us-east-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "merak-inventory",
    synchronize: false,
    logging: false,
    entities: [
        Privilege,
        Rol,
        User,
        Department,
    ]
};

export { typeOrmConfig };