import { Response, Request, NextFunction } from 'express';
import { catchErrors } from '../../handlers/catchError';

export const logout = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  res.cookie('token', '', { maxAge: 1 });
  res.status(200).json({
    status: 'success',
    message: 'Successfully logged out',
  });
});
