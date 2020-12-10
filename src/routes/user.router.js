import express from 'express';
import passport from 'passport';
import userController from '../controllers/user.controller';
import userService from '../services/user.service';

export const userRouter = express.Router();

userRouter.post('/signup', userService.validateSignUp, userController.signup);
userRouter.post('/login', userService.validateLogIn, userController.login);
userRouter.get('/auth', passport.authenticate('jwt', { session: false }), userController.authenticate);
