import { Router } from 'express'

import { createUserSchema, updateUserSchema } from '@shared/constants'
import { joiValidator } from '@middlewares/joi';
import { createUserCtrl,updateUserCtrl, getProfileCtrl} from '@controllers/User'


const router = Router();

router.post('/' , [joiValidator(createUserSchema)], createUserCtrl);
router.get('/profile', getProfileCtrl);

export default router;