import express from 'express';
import { userRouter } from './routes/user.router';

export const rootRouter = express.Router();
rootRouter.use('/users', userRouter);
