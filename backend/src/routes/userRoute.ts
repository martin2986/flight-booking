import express from 'express';
import { protectRoute } from '../controllers/permissionMiddleware/protectRoute';
import { logout } from '../controllers/authMiddleware/logout';
import { getAllUser, getUser, updateUser, deleteUser } from '../controllers/UserController/Index';
const userRouter = express.Router();

userRouter.use(protectRoute);
userRouter.route('/').get(getAllUser);
userRouter.route('/logout').get(logout);
userRouter.route('/:id').get(getUser);
userRouter.route('/updateMe').patch(updateUser);
userRouter.route('/deleteMe').delete(deleteUser);

export default userRouter;
