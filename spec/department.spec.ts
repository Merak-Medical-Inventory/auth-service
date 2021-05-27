import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
// import {deleteDepartment} from '@db/entity/Department/DepartmentDao';


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

describe('Get deparment route', () => {

    let deparmentId : string;

    beforeAll(async ()=>{
        const res = await request.post(`/api/department`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        code : '10465420',
        name : 'test deparment',
        description : 'test description'
       })
       deparmentId = res.body.data.id
    })

    afterAll(async ()=>{
        await request.delete(`/api/department/${deparmentId}`)
        .set('Authorization', `Bearer ${token}`)
    })


    it('should return the deparment', async () => {
       const res = await request.get(`/api/department/${deparmentId}`)
       .set('Authorization', `Bearer ${token}`)
       expect(res.body.statusCode).toBe(200)
    })

    it('should return not found', async () => {
        const res = await request.get('/api/department/x')
        .set('Authorization', `Bearer ${token}`)
         expect(res.body.statusCode).toBe(500)
    })
})

describe('Get all deparment route', () => {

    let deparmentId : string;

    beforeAll(async ()=>{
        const res = await request.post(`/api/department`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        code : '1028565',
        name : 'test deparment',
        description : 'test description'
       })
       deparmentId = res.body.data.id
    })

    afterAll(async ()=>{
        await request.delete(`/api/department/${deparmentId}`)
        .set('Authorization', `Bearer ${token}`)
    })


    it('should return the deparments', async () => {
       const res = await request.get(`/api/department`)
       .set('Authorization', `Bearer ${token}`)
       expect(res.body.statusCode).toBe(200)
    })
})

describe('Create deparment route', () => {

    let deparmentId : string;

    afterAll(async ()=>{
        await request.delete(`/api/department/${deparmentId}`)
        .set('Authorization', `Bearer ${token}`)
    })


    it('should create a deparment', async () => {
       const res = await request.post('/api/department')
       .set('Authorization', `Bearer ${token}`)
       .send({
        code : '1014543',
        name : 'test deparment',
        description : 'test description'
       })
        deparmentId = res.body.data.id
        expect(res.body.statusCode).toBe(201)
    })

    it('should return 500 on duplicate code', async () => {
        const res = await request.post('/api/department')
        .set('Authorization', `Bearer ${token}`)
        .send({
         code : '1014543',
         name : 'test deparment',
         description : 'test description'
        })
         expect(res.body.statusCode).toBe(500)
     })
})

describe('Update deparment route', () => {

    let deparmentId : string;

    beforeAll(async ()=>{
        const res = await request.post(`/api/department`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        code : '10173214',
        name : 'test deparment',
        description : 'test description'
       })
       deparmentId = res.body.data.id
    })

    afterAll(async ()=>{
        await request.delete(`/api/department/${deparmentId}`)
        .set('Authorization', `Bearer ${token}`)
    })


    it('should update a deparment', async () => {
       const res = await request.put(`/api/department/${deparmentId}`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        code : '2342343',
        name : 'update test deparment',
        description : 'update test description'
       })
       expect(res.body.statusCode).toBe(201)
    })

    it('should return not found', async () => {
        const res = await request.put('/api/department/x')
        .set('Authorization', `Bearer ${token}`)
        .send({
         code : '234234',
         name : 'update test deparment',
         description : 'update test description'
        })
         expect(res.body.statusCode).toBe(500)
    })
})

describe('Delete deparment route', () => {

    let deparmentId : string;

    beforeAll(async ()=>{
        const res = await request.post(`/api/department`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        code : '10213',
        name : 'test deparment',
        description : 'test description'
       })
       deparmentId = res.body.data.id
    })


    it('should create a deparment', async () => {
       const res = await request.delete(`/api/department/${deparmentId}`)
       .set('Authorization', `Bearer ${token}`)
        expect(res.body.statusCode).toBe(201)
    })

    it('should return not found', async () => {
        const res = await request.delete('/api/department/x')
        .set('Authorization', `Bearer ${token}`)
         expect(res.body.statusCode).toBe(500)
     })
})
