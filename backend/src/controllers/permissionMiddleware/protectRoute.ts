import { catchErrors } from '../../handlers/catchError';
import { Request, Response, NextFunction } from 'express';
import User from '../../models/UserModel';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { promisify } from 'util';
import AppError from '../../handlers/appError';
export const protectRoute = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
  if (!token) {
    return next(new AppError('You are not logged In', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(new AppError('The user belonging to this token no longer exist', 401));
  }

  next();
});
