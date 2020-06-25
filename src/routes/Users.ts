import { Router } from 'express'

import { createUserSchema, updateUserSchema } from '@shared/constants'
import { joiValidator } from '@middlewares/joi';
import { createUserCtrl, getUserCtrl, updateUserCtrl, getProfileCtrl, getAllUserCtrl } from '@controllers/User'


const router = Router();

router.get('/' , getAllUserCtrl);
router.post('/' , [joiValidator(createUserSchema)], createUserCtrl);
router.put('/:id', [joiValidator(updateUserSchema)], updateUserCtrl);
router.get('/:id', getUserCtrl);
router.get('/profile', getProfileCtrl);

export default router;