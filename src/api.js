import express from 'express';
import { userRouter } from './routes/user.router';
import { brandRouter } from './routes/brand.router';

export const rootRouter = express.Router();
rootRouter.use('/users', userRouter);
rootRouter.use('/brands', brandRouter);
