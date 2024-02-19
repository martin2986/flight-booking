import { Request, Response, NextFunction } from 'express';
import AppError from '../../handlers/appError';
import { catchErrors } from '../../handlers/catchError';
import City from '../../models/CityInfoModel';

export const getCity = catchErrors(async (req: Request, res: Response, next: NextFunction) => {
  const queryItem = req.query.city;
  const city = await City.find({ name: { $regex: `^${queryItem}`, $options: 'i' } }).limit(5);
  if (!city) {
    return next(new AppError('No city found', 404));
  }
  res.status(200).json({
    success: true,
    result: {
      data: city,
    },
  });
});
