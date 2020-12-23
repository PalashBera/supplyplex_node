import express from 'express';
import passport from 'passport';
import userController from '../controllers/user.controller';
import userService from '../services/user.service';

export const userRouter = express.Router();

userRouter.post('/signup', userService.validateSignUp, userController.signup);
userRouter.post('/login', userService.validateLogIn, userController.login);
userRouter.get('/auth', passport.authenticate('jwt', { session: false }), userController.authenticate);


/**
* @swagger
* /users/login:
*   post:
*     tags:
*       - Users
*     name: Login
*     summary: Logs in a user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             email:
*               type: string
*             password:
*               type: string
*               format: password
*         required:
*           - email
*           - password
*     responses:
*       200:
*         description: User found and logged in successfully
*       422:
*         description: Bad email, not found in db
*/
