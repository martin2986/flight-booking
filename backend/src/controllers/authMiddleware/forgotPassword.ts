import { Response, Request, NextFunction } from 'express';
import { catchErrors } from '../../handlers/catchError';
import AppError from '../../handlers/appError';
import User from '../../models/User';
import { Resend } from 'resend';
export const forgotPassword = catchErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('No user found with that email', 404));
    }
    const resetToken = user.createResetEmailToken();

    await user.save({ validateBeforeSave: false });

    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Forgot your password?. Submit a patch request with your new user password
    and passwordConfirm to ${resetURL}.\n If you didn't forget your password please ignore this`;

    const resend = new Resend(process.env.RESEND_API);

    resend.emails.send({
      from: 'onboarding@resend.dev',
      to: user.email,
      subject: 'Hello World',
      html: message,
    });

    res.status(200).json({
      status: 'success',
      message: `An email has been sent to ${user.email} with further instructions`,
    });
  },
);
