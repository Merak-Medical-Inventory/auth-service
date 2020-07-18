import { Router } from 'express';
import AuthRouter from './Auth';
import UserRouter from './Users';
import PrivilegeRouter from './Privilege';
import CategoryRouter from './Category'
import DepartmenRouter from './Departments'

// Init router and path
const router = Router();

// Add sub-routes
router.use('/user', UserRouter);
router.use('/auth', AuthRouter);
router.use('/privilege', PrivilegeRouter);
router.use('/category', CategoryRouter);
router.use('/department',  DepartmenRouter)

// Export the base-router
export default router;
