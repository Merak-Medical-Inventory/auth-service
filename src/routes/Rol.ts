import { Router } from 'express'

import { joiValidator } from '@middlewares/joi';
import { sessionCheck } from '@middlewares/sessionCheck';
import { createRolSchema } from '@shared/joi/Rol';
import { createRolCtrl, getAllRolsCtrl, getRolByIdCtrl } from '@controllers/Rol';


const router = Router();

router.get('/' , [sessionCheck], getAllRolsCtrl);
router.get('/:id' , [sessionCheck], getRolByIdCtrl);
router.post('/' , [sessionCheck,joiValidator(createRolSchema)], createRolCtrl);

export default router;