import { NextFunction, Request, Response } from 'express';
import bcryptjs from 'bcryptjs';
import Joi from 'joi';
import AppError from '../../handlers/appError';
import { catchErrors } from '../../handlers/catchError';
import User from '../../models/UserModel';
import { expiryDate, generateJWT } from './authUtil';
const objectSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: true } })
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

  const user = await User.findOne({ email, removed: false }).select('+password +salt');

  if (!user) return next(new AppError('No account with this email has been registered.', 404));

  const isMatch = await user.validPassword(password);

  if (!isMatch) return next(new AppError('Invalid/Missing credentials.', 403));

  const token = generateJWT({ id: user._id });
  const cookieOption = {
    expires: expiryDate,
    httpOnly: true,
    secure: false,
    // domain: req.hostname,
    path: '/',
  };
  if (process.env.NODE_ENV === 'production') cookieOption.secure = true;
  res
    .cookie('token', token, cookieOption)
    .status(200)
    .json({
      success: true,
      result: {
        name: user.name,
        email: user.email,
      },
      message: 'Successfully login user',
    });
});

export const google = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = generateJWT({ id: user._id });
      res.cookie('token', token, { httpOnly: true, expires: expiryDate }).status(200).json({
        message: 'User logged in successfully',
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
      });
    } else {
      const generatePassword =
        Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        confirmPassword: hashedPassword,
        profilePhoto: req.body.photo,
      });
      await newUser.save();
      const token = generateJWT({ id: newUser._id });
      res
        .cookie('token', token, {
          httpOnly: true,
          expires: expiryDate,
        })
        .status(200)
        .json({ name: newUser.name, email: newUser.email, profilePhoto: newUser.profilePhoto });
    }
  } catch (err) {
    next(err);
  }
});
