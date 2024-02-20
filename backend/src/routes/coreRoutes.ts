import express from 'express';
import { forgotPassword } from '../controllers/authMiddleware/forgotPassword';
import { login } from '../controllers/authMiddleware/login';
import { register } from '../controllers/authMiddleware/register';
import { resetPassword } from '../controllers/authMiddleware/resetPassword';

import { getCity } from '../controllers/cityInfo/Index';
const authRouter = express.Router();

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);
authRouter.route('/forgotPassword').post(forgotPassword);
authRouter.route('/resetPassword/:token').patch(resetPassword);
authRouter.route('/city').get(getCity);

export default authRouter;
