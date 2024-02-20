import express from 'express';
import { protectRoute } from '../controllers/permissionMiddleware/protectRoute';
import { logout } from '../controllers/authMiddleware/logout';
import { getAllUser, getUser, updateUser, deleteUser } from '../controllers/UserController/Index';
const userRouter = express.Router();

userRouter.use(protectRoute);
userRouter.route('/').get(getAllUser);
userRouter.route('/:id').get(getUser);
userRouter.route('/updateMe').patch(updateUser);
userRouter.route('/deleteMe').delete(deleteUser);
userRouter.route('/logout').get(logout);

export default userRouter;
