import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import AppError from '../../handlers/appError';
import { catchErrors } from '../../handlers/catchError';
import User from '../../models/UserModel';
import { generateJWT } from './authUtil';
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

  const user = await await User.findOne({ email, removed: false }).select('+password +salt');

  if (!user) return next(new AppError('No account with this email has been registered.', 404));

  const isMatch = await user.validPassword(password);

  if (!isMatch) return next(new AppError('Invalid/Missing credentials.', 403));

  const token = generateJWT({ id: user._id });

  const cookieOption = {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
    secure: false,
    domain: req.hostname,
    path: '/',
  };
  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
  res
    .status(200)
    .cookie('token', token, cookieOption)
    .json({
      success: true,
      token,
      result: {
        name: user.name,
        email: user.email,
      },
      message: 'Successfully login user',
    });
});
