import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deletePrivilege } from '@db/entity/Privilege/PrivilegeDao';
import { deleteRol } from '@db/entity/Rol/RolDao';


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

describe('Get rol route', () => {

    let rolId : string;
    let privilegeId : string;

    beforeAll(async ()=>{
        const res = await request.post(`/api/privilege`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        name : 'test privilege 1',
        description : 'test description'
       })
       privilegeId = res.body.data.id
       const rolResponse = await request.post(`/api/rol`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        name : 'test rol 1',
        description : 'test rol 1',
        privileges : [privilegeId]
       })
       rolId = rolResponse.body.data.id
    })

    afterAll(async ()=>{
        await deleteRol(rolId)
        await deletePrivilege(privilegeId)
    })


    it('should return the rol', async () => {
       const res = await request.get(`/api/rol/${rolId}`)
       .set('Authorization', `Bearer ${token}`)
       expect(res.body.statusCode).toBe(201)
    })

    it('should return not found', async () => {
        const res = await request.get('/api/rol/x')
        .set('Authorization', `Bearer ${token}`)
         expect(res.body.statusCode).toBe(500)
    })
})

describe('Get all rol route', () => {

    let rolId : string;
    let privilegeId : string;

    beforeAll(async ()=>{
        const res = await request.post(`/api/privilege`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        name : 'test privilege 2',
        description : 'test description'
       })
       privilegeId = res.body.data.id
       const rolResponse = await request.post(`/api/rol`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        name : 'test rol 2',
        description : 'test rol 2',
        privileges : [privilegeId]
       })
       rolId = rolResponse.body.data.id
    })

    afterAll(async ()=>{
        await deleteRol(rolId)
        await deletePrivilege(privilegeId)
    })


    it('should return the rol', async () => {
       const res = await request.get(`/api/rol`)
       .set('Authorization', `Bearer ${token}`)
       expect(res.body.statusCode).toBe(201)
    })
})

describe('Create privilege route', () => {

    let rolId : string;
    let privilegeId : string;

    beforeAll(async ()=>{
        const res = await request.post(`/api/privilege`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        name : 'test privilege 3',
        description : 'test description 3'
       })
       privilegeId = res.body.data.id
    })

    afterAll(async ()=>{
        await deleteRol(rolId)
        await deletePrivilege(privilegeId)
    })


    it('should create a rol', async () => {
        const res = await request.post(`/api/rol`)
        .set('Authorization', `Bearer ${token}`)
        .send({
         name : 'test rol 3',
         description : 'test rol 3',
         privileges : [privilegeId]
        })
        rolId = res.body.data.id
        expect(res.body.statusCode).toBe(201)
    })
})