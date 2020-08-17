import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import Privilege from '@db/entity/Privilege/Privilege';
import Rol from '@db/entity/Rol/Rol';
import Department from '@db/entity/Department/Department';
import User from '@db/entity/user/User';


const typeOrmConfig: PostgresConnectionOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    synchronize: true,
    logging: false,
    entities: [
        Privilege,
        Rol,
        User,
        Department,
    ]
};

export { typeOrmConfig };