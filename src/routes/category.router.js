import express from 'express';
import passport from 'passport';
import categoryController from '../controllers/category.controller';

export const categoryRouter = express.Router();

categoryRouter
  .route('/')
  .get(passport.authenticate('jwt', { session: false }), categoryController.index)
  .post(passport.authenticate('jwt', { session: false }), categoryController.create);

categoryRouter
  .route('/:id')
  .get(passport.authenticate('jwt', { session: false }), categoryController.show)
  .put(passport.authenticate('jwt', { session: false }), categoryController.update)
  .delete(passport.authenticate('jwt', { session: false }), categoryController.destroy);
