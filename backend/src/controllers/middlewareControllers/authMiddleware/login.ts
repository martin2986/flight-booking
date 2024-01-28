import { Response, Request, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
import User from '../../../models/User';
import { catchErrors } from '../../../handlers/catchError';
import AppError from '../../../handlers/appError';
export const login = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  //Log in Validation
  const objectSchema = Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: true } }) //check tlds
      .required(),
    password: Joi.string().required(),
  });

  const { error, value } = objectSchema.validate({ email, password });

  if (error) return next(new AppError('Invalid/Missing credentials.', 409));

  const user = await User.findOne({ email, removed: false }).select('+password');

  if (!user) return next(new AppError('No account with this email has been registered.', 404));

  const isMatch = await user.validPassword(password);

  if (!isMatch) return next(new AppError('Invalid/Missing credentials....s', 403));

  //signing in token
  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: req.body.remember ? 365 * 24 + 'h' : '24h' }, //body.remember
  );

  //updating user password and storing session
  await User.findOneAndUpdate(
    { id: user._id },
    { $push: { loggedSession: token } },
    { new: true },
  ).exec();

  res
    .status(200)
    .cookie('token', token, {
      maxAge: req.body.remember ? 365 * 24 * 60 * 60 * 1000 : null,
      sameSite: 'lax',
      httpOnly: true,
      secure: false,
      domain: req.hostname,
      path: '/',
      // Partitioned: true,
    })
    .json({
      success: true,
      result: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
      message: 'Successfully login user',
    });
});
