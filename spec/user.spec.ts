import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import { deleteUser } from '@db/entity/user/UserDao';
import { deleteRol } from '@db/entity/Rol/RolDao';
import { deletePrivilege } from '@db/entity/Privilege/PrivilegeDao';
import { deleteDepartment } from '@db/entity/Department/DepartmentDao';

const request : SuperTest<supertest.Test> = supertest(app)

const connection = new Connection(typeOrmConfig);
let token : string;
let rolId : string;
let privilegeId : string;
let deparmentId : string;

beforeAll(async ()=>{
    await connection.create();
    const res = await request.post('/api/auth/login')
    .send({
        username : 'superuser',
        password : 'superuser'
    })
    token = res.body.data.token
    const resPrivilege = await request.post(`/api/privilege`)
    .set('Authorization', `Bearer ${token}`)
    .send({
     name : 'test privilege user',
     description : 'test description user'
    })
    privilegeId = resPrivilege.body.data.id
    const rolResponse = await request.post(`/api/rol`)
    .set('Authorization', `Bearer ${token}`)
    .send({
     name : 'test rol userf',
     description : 'test rol userf',
     privileges : [privilegeId]
    })
    rolId = rolResponse.body.data.id
    const resDepartment = await request.post(`/api/department`)
       .set('Authorization', `Bearer ${token}`)
       .send({
        code : '104654202342',
        name : 'test deparment user',
        description : 'test description user'
       })
    deparmentId = resDepartment.body.data.id
})

afterAll(async ()=>{
    await deleteRol(rolId)
    await deletePrivilege(privilegeId)
    await deleteDepartment(deparmentId)
    await connection.close()
})


describe('Create user route', () => {

    let userId : string;

    afterAll(async ()=>{
        await deleteUser(userId)
    })


    it('should create an user', async () => {
        const res = await request.post(`/api/user`)
        .set('Authorization', `Bearer ${token}`)
        .send({
         username : 'Test user',
         email : 'test@test.com',
         password : 'testpassword',
         name : 'test name',
         last_name : 'test last name',
         rol : parseInt(rolId),
         department : parseInt(deparmentId)
        })
        userId = res.body.data.id
        expect(res.body.statusCode).toBe(201)
    })
})

describe('Get all users route', () => {

    let userId : string;

    beforeAll( async () => {
        const res = await request.post(`/api/user`)
        .set('Authorization', `Bearer ${token}`)
        .send({
         username : 'Test user get',
         email : 'testget@test.com',
         password : 'testpassword',
         name : 'test get name',
         last_name : 'test get last name',
         rol : parseInt(rolId),
         department : parseInt(deparmentId)
        })
        userId = res.body.data.id
    })

    afterAll(async ()=>{
        await deleteUser(userId)
    })

    it('should return all the users', async () => {
        const res = await request.get(`/api/user`)
        .set('Authorization', `Bearer ${token}`)
        expect(res.body.statusCode).toBe(200)
    })
})

describe('Get user by id route', () => {

    let userId : string;

    beforeAll( async () => {
        const res = await request.post(`/api/user`)
        .set('Authorization', `Bearer ${token}`)
        .send({
         username : 'Test user get',
         email : 'testget@test.com',
         password : 'testpassword',
         name : 'test get name',
         last_name : 'test get last name',
         rol : parseInt(rolId),
         department : parseInt(deparmentId)
        })
        userId = res.body.data.id
    })

    afterAll(async ()=>{
        await deleteUser(userId)
    })

    it('should return the user', async () => {
        const res = await request.get(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        expect(res.body.statusCode).toBe(200)
    })

    it('should return a not found error', async () => {
        const res = await request.get(`/api/user/x`)
        .set('Authorization', `Bearer ${token}`)
        expect(res.body.statusCode).toBe(500)
    })
})

describe('Get profile route', () => {

    it('should return the user profile', async () => {
        const res = await request.get(`/api/user/profile`)
        .set('Authorization', `Bearer ${token}`)
        expect(res.body.statusCode).toBe(200)
    })
})

describe('Update user route', () => {

    let userId : string;

    beforeAll( async () => {
        const res = await request.post(`/api/user`)
        .set('Authorization', `Bearer ${token}`)
        .send({
         username : 'Test user get',
         email : 'testget@test.com',
         password : 'testpassword',
         name : 'test get name',
         last_name : 'test get last name',
         rol : parseInt(rolId),
         department : parseInt(deparmentId)
        })
        userId = res.body.data.id
    })

    afterAll(async ()=>{
        await deleteUser(userId)
    })

    it('should update the user', async () => {
        const res = await request.put(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name : "updated name"
        })
        expect(res.body.statusCode).toBe(201)
    })

    it('should return a not found error', async () => {
        const res = await request.put(`/api/user/x`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            name : 'updated name'
        })
        expect(res.body.statusCode).toBe(500)
    })
})

describe('Update user route', () => {

    let userId : string;

    beforeAll( async () => {
        const res = await request.post(`/api/user`)
        .set('Authorization', `Bearer ${token}`)
        .send({
         username : 'Test user get',
         email : 'testget@test.com',
         password : 'testpassword',
         name : 'test get name',
         last_name : 'test get last name',
         rol : parseInt(rolId),
         department : parseInt(deparmentId)
        })
        userId = res.body.data.id
    })

    afterAll(async ()=>{
        await deleteUser(userId)
    })

    it('should delete the user', async () => {
        const res = await request.delete(`/api/user/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        expect(res.body.statusCode).toBe(201)
    })

    it('should return a not found error', async () => {
        const res = await request.delete(`/api/user/x`)
        .set('Authorization', `Bearer ${token}`)
        expect(res.body.statusCode).toBe(500)
    })
})

