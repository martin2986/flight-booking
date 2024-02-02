import { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../../models/User';
import { catchErrors } from '../../handlers/catchError';
import AppError from '../../handlers/appError';

type userType = {
  _id?: mongoose.Types.ObjectId;
  email: string;
  password: string;
  name: string;
};

const signToken = (id: mongoose.Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createAndSendToken = (user: userType, statusCode: number, res: Response) => {
  const token = signToken(user._id);
  const cookieOption = {
    secure: true,
    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
  res.cookie('jwt', token, cookieOption);

  user.password = undefined;

  return res.status(200).json({
    success: true,

    result: {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    message: 'Account registered successfully. Please verify your email.',
  });
};

const objectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: true } })
    .required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.valid(Joi.ref('password')).required(),
});

export const register = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password, confirmPassword } = req.body;

  const { error } = objectSchema.validate({ name, email, password, confirmPassword });
  if (error) return next(new AppError('Invalid/Missing credentials.', 409));

  const existingUser = await User.findOne({ email: email, removed: false });

  if (existingUser)
    return next(new AppError('An account with this email has already been registered.', 409));

  const newUser = await User.create({ email, name, password, confirmPassword });

  createAndSendToken(newUser, 200, res);
});
