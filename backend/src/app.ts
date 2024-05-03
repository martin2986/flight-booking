import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import authRouter from './routes/coreRoutes';
import bodyParser from 'body-parser';

import { errorHandler } from './handlers/errorHandler';
import AppError from './handlers/appError';
import userRouter from './routes/userRoute';
import appRouter from './routes/appRoute';

const app = express();

app.disable('x-powered-by');
app.use(cors({ credentials: true }));
app.use(compression());

app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api/auth/v1', authRouter);
app.use('/api/users/v1', userRouter);
app.use('/api/v1', appRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Api url ${req.originalUrl} does not exist`, 404));
});

app.use(errorHandler);
export default app;
