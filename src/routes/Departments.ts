import { Router } from 'express'
import { joiValidator } from '@middlewares/joi';
import {
    createDepartmentCtrl,
    findDepartmentCtrl,
    findAllDepartmentsCtrl,
    updateDepartmentCtrl, deleteDepartmentCtrl
} from '@controllers/Department';
import { createDepartmentSchema} from '@shared/joi/Department';
import { sessionCheck } from '@middlewares/sessionCheck';

const router = Router();

router.post('/', [sessionCheck, joiValidator(createDepartmentSchema)], createDepartmentCtrl);
router.get('/', [sessionCheck], findAllDepartmentsCtrl);
router.get('/:id', [sessionCheck], findDepartmentCtrl);
router.put('/:id', [sessionCheck, joiValidator(createDepartmentSchema)], updateDepartmentCtrl);
router.delete('/:id', [sessionCheck], deleteDepartmentCtrl);

export default router;
