import { Request, Response, NextFunction } from 'express';
import AppError from './appError';

const handleCastError = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`;

  return new AppError(message, 400);
};
const handleValidationError = (err: any) => {
  const message = `Required fields are not supplied`;

  return new AppError(message, 400);
};

//DEVELOPEMENT ERROR
const developmentErrors = (error: any, req: Request, res: Response, next: NextFunction) => {
  error.stack = error.stack || '';
  const errorDetails = {
    message: error.message,
    status: error.status,
    stackHighlighted: error.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>'),
  };
  return new AppError(error.message, 400);
};

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    developmentErrors(err, req, res, next);
  } else {
    res.status(err.statusCode).json({
      success: false,
      status: 'error',
      message: 'something went wong',
    });
  }

  if (err.name === 'CastError') err = handleCastError(err);
  if (err.name == 'ValidationError') err = handleValidationError(err);
  res.status(err.statusCode).json({
    success: false,
    status: err.status,
    message: err.message,
  });
};
