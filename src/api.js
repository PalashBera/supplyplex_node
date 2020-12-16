import express from 'express';
import { userRouter } from './routes/user.router';
import { brandRouter } from './routes/brand.router';
import { categoryRouter } from './routes/category.router';

export const rootRouter = express.Router();
rootRouter.use('/users', userRouter);
rootRouter.use('/brands', brandRouter);
rootRouter.use('/categories', categoryRouter);
