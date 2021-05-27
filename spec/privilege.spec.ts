import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import {deletePrivilege} from '@db/entity/Privilege/PrivilegeDao';


const request : SuperTest<supertest.Test> = supertest(app)

const connection = new Connection(typeOrmConfig);
let token : string;

beforeAll(async ()=>{
    await connection.create();
    const res = await request.post('/api/auth/login')
    .send({
        username : 'superuser',
        password : 'superuser'
    })
    token = res.body.data.token
})

afterAll(async ()=>{
    await connection.close()
})

describe('Get privilege route', () => {

    let privilegeId : string;

    beforeAll(async ()=>{
        const res = await request.post(`/api/privilege`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        name : 'test privilege',
        description : 'test description'
       })
       privilegeId = res.body.data.id
    })

    afterAll(async ()=>{
        await deletePrivilege(privilegeId)
    })


    it('should return the privilege', async () => {
       const res = await request.get(`/api/privilege/${privilegeId}`)
       .set('Authorization', `Bearer ${token}`)
       expect(res.body.statusCode).toBe(201)
    })

    it('should return not found', async () => {
        const res = await request.get('/api/privilege/x')
        .set('Authorization', `Bearer ${token}`)
         expect(res.body.statusCode).toBe(500)
    })
})

describe('Get all privilege route', () => {

    let privilegeId : string;

    beforeAll(async ()=>{
        const res = await request.post(`/api/privilege`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        name : 'test privilege',
        description : 'test description'
       })
       privilegeId = res.body.data.id
    })

    afterAll(async ()=>{
        await deletePrivilege(privilegeId)
    })


    it('should return the privilege', async () => {
       const res = await request.get(`/api/privilege`)
       .set('Authorization', `Bearer ${token}`)
       expect(res.body.statusCode).toBe(201)
    })
})

describe('Create privilege route', () => {

    let privilegeId : string;

    afterAll(async ()=>{
        await deletePrivilege(privilegeId)
    })


    it('should create a privilege', async () => {
       const res = await request.post('/api/privilege')
       .set('Authorization', `Bearer ${token}`)
       .send({
        name : 'test privilege',
        description : 'test description'
       })
       privilegeId = res.body.data.id
        expect(res.body.statusCode).toBe(201)
    })

    it('should return 500 on duplicate code', async () => {
        const res = await request.post('/api/privilege')
        .set('Authorization', `Bearer ${token}`)
        .send({
         name : 'test privilege',
         description : 'test description'
        })
         expect(res.body.statusCode).toBe(500)
     })
})