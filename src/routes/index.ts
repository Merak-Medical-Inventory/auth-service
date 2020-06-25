import { Router } from 'express';
import AuthRouter from './Auth';
import UserRouter from './Users';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/user', UserRouter);
router.use('/auth', AuthRouter);

// Export the base-router
export default router;
