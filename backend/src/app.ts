import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import authRouter from './routes/coreRoutes';
import bodyParser from 'body-parser';

import { errorHandler } from './handlers/errorHandler';
import AppError from './handlers/appError';

const app = express();

app.use(cors());
app.use(compression());

app.disable('x-powered-by');
app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/api', authRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Api url ${req.originalUrl} does not exist`, 404));
});

app.use(errorHandler);
export default app;
