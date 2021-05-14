import '../src/TestEnv';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import { createPrivilegeSvc } from '@services/privilege'

const connection = new Connection(typeOrmConfig);

beforeAll(async ()=>{
    await connection.create();
})

afterAll(async ()=>{
    await connection.close()
})

describe('Sample Test', () => {
    it('should test that true === true', () => {
        console.log(createPrivilegeSvc)
      expect(true).toBe(true)
    })
})