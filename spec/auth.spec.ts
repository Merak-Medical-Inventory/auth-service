import '../src/TestEnv';
import supertest, { SuperTest } from 'supertest';
import Connection from '../src/connection';
import {typeOrmConfig} from '../src/config';
import app from '../src/server';
import * as authController from '../src/controllers/Auth';


const request : SuperTest<supertest.Test> = supertest(app)

const connection = new Connection(typeOrmConfig);

beforeAll(async ()=>{
    await connection.create();
})

afterAll(async ()=>{
    await connection.close()
})

describe('login', () => {
    it('should login successfully', async () => {
       const res = await request.post('/api/auth/login')
       .send({
        username : 'superuser',
        password : 'superuser'
       })
        expect(res.body.statusCode).toBe(201)
    })

    it('Should return status code 400', async () => {
        const res = await request.post('/api/auth/login')
        .send({
         username : 'x',
         password : 'x'
        })
        expect(res.body.statusCode).toBe(400)
     })
})

describe('auth check', () => {

    let token : string;

    beforeAll(async ()=>{
        const res = await request.post('/api/auth/login')
        .send({
         username : 'superuser',
         password : 'superuser'
        })
        token = res.body.data.token
    })

    it('should auth the user using the token', async () => {
       const res = await request.get('/api/auth/check')
       .set('Authorization', `Bearer ${token}`)
        expect(res.body.statusCode).toBe(201)
    })

    it('Should return status code 400', async () => {
        const res = await request.get('/api/auth/check')
        .set('Authorization', `Bearer x`)
        expect(res.body.statusCode).toBe(401)
     })
})