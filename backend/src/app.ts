import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import authRouter from './routes/coreRoutes';
import bodyParser from 'body-parser';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { errorHandler } from './handlers/errorHandler';
import AppError from './handlers/appError';
import userRouter from './routes/userRoute';
import { rateLimit } from 'express-rate-limit';

const app = express();

app.disable('x-powered-by');
const corsOptions = {
  origin: 'https://flyeasy.fadairomartins.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(compression());

app.use(bodyParser.json());

app.use(cookieParser());
app.use(express.json());
app.use(ExpressMongoSanitize());
app.use(express.urlencoded({ extended: true }));
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP, please try again in an hour',
});
app.use(limiter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.all('*', (req, res, next) => {
  next(new AppError(`Api url ${req.originalUrl} does not exist`, 404));
});

app.use(errorHandler);
export default app;
