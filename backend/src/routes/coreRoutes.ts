import express from 'express';
import { register } from '../controllers/authMiddleware/register';
import { login } from '../controllers/authMiddleware/login';
import { logout } from '../controllers/authMiddleware/logout';
import { protectRoute } from '../controllers/permissionMiddleware/protectRoute';
const authRouter = express.Router();

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/logout').get(protectRoute, logout);
export default authRouter;
