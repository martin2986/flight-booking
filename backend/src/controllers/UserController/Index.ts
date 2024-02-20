import { Request, Response, NextFunction } from 'express';
import { catchErrors } from '../../handlers/catchError';
import User from '../../models/UserModel';
import AppError from '../../handlers/appError';
import { capitalize } from '../authMiddleware/authUtil';

export const getAllUser = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const users = await User.find({ removed: false });
  if (!users) return next(new AppError('No user find', 404));
  res.status(200).json({
    success: true,
    result: users,
  });
});

export const getUser = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) return next(new AppError('No user found  with that ID!', 404));
  res.status(200).json({
    success: true,
    result: user,
  });
});

export const updateUser = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  req.body.name = capitalize(req.body.name);
  const user = await User.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('No user found  with that ID!', 404));

  res.status(200).json({
    success: true,
    result: user,
  });
});

export const deleteUser = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return next(new AppError('No doc found with that ID', 404));
  }
  res.status(204).json({
    status: ' success!',
    data: null,
  });
});
