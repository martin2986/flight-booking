import { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../../models/User';
import { catchErrors } from '../../handlers/catchError';
import AppError from '../../handlers/appError';

const generateJWT = function (payload: { id: string }, options: object = {}): string {
  const privateKey: any = process.env.JWT_SECRET;
  const defaultOptions: object = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, privateKey, Object.assign(defaultOptions, options));
};

const objectSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } }) //check tlds
    .required(),
  password: Joi.string().required(),
});

export const login = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const { error } = objectSchema.validate({ email, password });

  if (error) return next(new AppError('Invalid/Missing credentials.', 409));

  const user = await User.findOne({ email, removed: false }).select('+password');

  if (!user) return next(new AppError('No account with this email has been registered.', 404));

  const isMatch = await user.validPassword(password);

  if (!isMatch) return next(new AppError('Invalid/Missing credentials.', 403));

  const token = generateJWT({ id: user._id }, { expiresIn: '1h' });

  const cookieOption = {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false,
    domain: req.hostname,
    path: '/',
  };
  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
  res.status(200).cookie('token', token, cookieOption).json({
    success: true,
    message: 'Successfully login user',
  });
});
