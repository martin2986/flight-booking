import express from 'express';
import { getCity } from '../controllers/cityInfo/Index';

const appRouter = express.Router();
appRouter.route('/city').get(getCity);

export default appRouter;
