import Connection from '../../src/connection';
import {typeOrmConfig} from '../../src/config';
import { assert } from 'console';

const connection = new Connection(typeOrmConfig);

beforeAll(async ()=>{
    await connection.create();
})

afterAll(async ()=>{
    await connection.close()
})

it('login' , () => {
    assert()
})