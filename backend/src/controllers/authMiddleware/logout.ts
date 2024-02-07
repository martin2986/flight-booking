import { Response, Request, NextFunction } from 'express';
import { catchErrors } from '../../handlers/catchError';

export const logout = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    status: 'success',
    message: 'Successfully logged out',
  });
});
