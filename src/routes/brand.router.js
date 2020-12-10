import express from 'express';
import passport from 'passport';
import brandController from '../controllers/brand.controller';

export const brandRouter = express.Router();

brandRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), brandController.index)
  .post(passport.authenticate('jwt', { session: false }), brandController.create);

brandRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), brandController.show)
  .put(passport.authenticate('jwt', { session: false }), brandController.update)
  .delete(passport.authenticate('jwt', { session: false }), brandController.destroy);
