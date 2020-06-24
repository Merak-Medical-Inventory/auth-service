import { Router } from 'express'
import { ParamsDictionary } from 'express-serve-static-core';
import { login, check } from '@controllers/Auth'


const router = Router();

router.get('/check' , check);
router.post('/login' , login);

export default router;