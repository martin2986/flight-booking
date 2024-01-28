import express from 'express';
import { register } from '../controllers/middlewareControllers/authMiddleware/register';
import { login } from '../controllers/middlewareControllers/authMiddleware/login';
const authRouter = express.Router();

authRouter.route('/register').post(register);
authRouter.route('/login').post(login);

export default authRouter;
