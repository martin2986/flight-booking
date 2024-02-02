import { Response, Request, NextFunction } from 'express';
import { catchErrors } from '../../handlers/catchError';
import AppError from '../../handlers/appError';
import User from '../../models/User';
import sendMail from './sendEmail';
export const forgotPassword = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('No user found with that email', 404));
    }
    const resetToken = user.createResetEmailToken();

    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;

    const emailOption = {
      email: user.email,
      name: user.name,
      subject: 'Reset Password',
      type: 'passwordVerification',
      link: resetURL,
    };
    const data = await sendMail(emailOption);

    res.status(200).json({
      status: 'success',
      message: `An email has been sent to ${user.email} with further instructions`,
      data,
    });
  },
);
