import { Response, Request } from 'express';
import { catchErrors } from '../../handlers/catchError';

export const logout = catchErrors(async (req: Request, res: Response) => {
  res.clearCookie('token').status(200).json({
    success: true,
    status: 'success',
    message: 'Successfully logged out',
  });
});
