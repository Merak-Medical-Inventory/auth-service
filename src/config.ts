import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import Privilege from '@db/entity/Privilege/Privilege';
import Rol from '@db/entity/Rol/Rol';
import Department from '@db/entity/Department/Department';
import User from '@db/entity/user/User';
import Brand from '@db/entity/Brand/Brand';
import Category from '@db/entity/Category/Category';
import GeneralItem from '@db/entity/GeneralItem/GeneralItem';
import Item from '@db/entity/Item/Item';
import Presentation from '@db/entity/Presentation/Presentation';
import Provider from '@db/entity/Provider/Provider';
import Order, { Lot } from '@db/entity/Lot/Lot';
import OrderToItem from '@db/entity/OrderToItem/OrderToItem';
import Stock from '@db/entity/Stock/Stock';
import LotToStock from '@db/entity/LotToStock.ts/LotToStock';
import Inventory from '@db/entity/Inventory/Inventory';


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
        Brand,
        Category,
        GeneralItem,
        Item,
        Presentation,
        Provider,
        Order,
        OrderToItem,
        Lot,
        Stock,
        LotToStock,
        Inventory
    ]
};

export { typeOrmConfig };