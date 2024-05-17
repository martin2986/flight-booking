import express from 'express';
import { forgotPassword } from '../controllers/authMiddleware/forgotPassword';
import { google, login } from '../controllers/authMiddleware/login';
import { logout } from '../controllers/authMiddleware/logout';
import { register } from '../controllers/authMiddleware/register';
import { resetPassword } from '../controllers/authMiddleware/resetPassword';

const authRouter = express.Router();

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.get('/logout', logout);
authRouter.post('/google', google);
authRouter.route('/forgotPassword').post(forgotPassword);
authRouter.route('/resetPassword/:token').patch(resetPassword);

export default authRouter;
