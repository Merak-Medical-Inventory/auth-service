import { createConnection , getConnection } from 'typeorm';
import { typeOrmConfig } from './config';

export default class Connection {
    private config : any;

    constructor (_config : any) {
        this.config = _config
    }

    async create () {
        await createConnection(this.config)
    }

    async close() {
        await getConnection().close()
    }

    async clear() {
        const connection = getConnection();
        const entities = connection.entityMetadatas;

        entities.forEach(async (entity) => {
            const repository = connection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`)
        })
    }

}