import { Router } from 'express'

import { createUserSchema, updateUserSchema } from '@shared/constants'
import { joiValidator } from '@middlewares/joi';
import { createUserCtrl,updateUserCtrl, getProfileCtrl, deleteUserCtrl, getUserByIdCtrl} from '@controllers/User'
import { sessionCheck } from '@middlewares/sessionCheck';


const router = Router();

router.get('/profile',[sessionCheck], getProfileCtrl);
router.get('/:id',[sessionCheck], getUserByIdCtrl);
router.post('/' , [joiValidator(createUserSchema)], createUserCtrl);
router.put('/:id', [joiValidator(updateUserSchema),updateUserCtrl]);
router.delete('/:id',[sessionCheck], deleteUserCtrl);


export default router;