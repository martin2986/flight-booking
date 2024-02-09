import express from 'express';
import { register } from '../controllers/authMiddleware/register';
import { login } from '../controllers/authMiddleware/login';
import { logout } from '../controllers/authMiddleware/logout';
import { protectRoute } from '../controllers/permissionMiddleware/protectRoute';
import { forgotPassword } from '../controllers/authMiddleware/forgotPassword';
import { resetPassword } from '../controllers/authMiddleware/resetPassword';
import { getAllUser, getUser, updateUser, deleteUser } from '../controllers/UserController/Index';
const authRouter = express.Router();

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/forgotPassword').post(forgotPassword);
authRouter.route('/resetPassword/:token').patch(resetPassword);

authRouter.use(protectRoute);

authRouter.route('/').get(protectRoute, getAllUser);
authRouter.route('/:id').get(getUser);
authRouter.route('/updateMe').patch(updateUser);
authRouter.route('/deleteMe').delete(deleteUser);
authRouter.route('/logout').get(logout);

export default authRouter;
