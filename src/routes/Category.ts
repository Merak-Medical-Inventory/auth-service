import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import { createCategoryCtrl, findCategoryCtrl, findAllCategoriesCtrl} from '@controllers/Category';
import { createCategorySchema} from '@shared/joi/Category';
import { sessionCheck } from '@middlewares/sessionCheck';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createCategorySchema)], createCategoryCtrl);
router.get('/', [sessionCheck], findAllCategoriesCtrl);
router.get('/:id', [sessionCheck], findCategoryCtrl);

export default router;
