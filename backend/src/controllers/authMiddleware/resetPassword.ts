import { Response, Request, NextFunction } from 'express';
import { catchErrors } from '../../handlers/catchError';
import jwt from 'jsonwebtoken';
import User from '../../models/UserModel';
import AppError from '../../handlers/appError';
import crypto from 'crypto';

const generateJWT = function (payload: { id: string }, options: object = {}): string {
  const privateKey: any = process.env.JWT_SECRET;
  const defaultOptions: object = {
    expiresIn: '1h',
  };
  return jwt.sign(payload, privateKey, Object.assign(defaultOptions, options));
};

export const resetPassword = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const hashedTOken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      passwordResetToken: hashedTOken,
      passwordResetExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(new AppError('Password reset token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;

    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

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
      message: 'password reset successful',
    });
  },
);
