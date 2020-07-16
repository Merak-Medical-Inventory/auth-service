import { Router } from 'express'

import { joiValidator } from '@middlewares/joi';
import { createPrivilegeCtrl, getAllPrivilegesCtrl, getPrivilegeByIdCtrl } from '@controllers/Privilege';
import { createPrivilegeSchema } from '@shared/joi/Privilege';
import { sessionCheck } from '@middlewares/sessionCheck';


const router = Router();

router.get('/' , [sessionCheck], getAllPrivilegesCtrl);
router.get('/:id' , [sessionCheck], getPrivilegeByIdCtrl);
router.post('/' , [sessionCheck,joiValidator(createPrivilegeSchema)], createPrivilegeCtrl);

export default router;