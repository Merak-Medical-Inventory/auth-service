import { Router } from 'express'

import { joiValidator } from '@middlewares/joi';
import { createPrivilegeCtrl } from '@controllers/Privilege';
import { createPrivilegeSchema } from '@shared/joi/Privilege';
import { sessionCheck } from '@middlewares/sessionCheck';


const router = Router();

router.post('/' , [sessionCheck,joiValidator(createPrivilegeSchema)], createPrivilegeCtrl);

export default router;