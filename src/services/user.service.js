import { check } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../models/user.model';

module.exports = {
  validateSignUp: [
    check('email')
      .exists().withMessage('This should be present.').bail()
      .isString().withMessage('This should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('This can\'t be blank.').bail()
      .isEmail().withMessage('This isn\'t valid.').bail()
      .normalizeEmail()
      .custom(async value => {
        const user = await User.findOne({ email: value });
        if (user) return Promise.reject('This has already been taken.');
      }),

    check('password')
      .exists().withMessage('This should be present.').bail()
      .isString().withMessage('This should be string.').bail()
      .trim().isLength({ min: 6 }).withMessage('This must be at least 6 characters.'),

    check('passwordConfirmation')
      .exists().withMessage('This should be present.').bail()
      .isString().withMessage('This should be string.').bail()
      .trim().isLength({ min: 6 }).withMessage('This must be at least 6 characters.').bail()
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.password) {
          return false;
        } else {
          return value;
        }
      }).withMessage('This doesn\'t match with password.')
  ],

  validateLogIn: [
    check('email')
      .exists().withMessage('This should be present.').bail()
      .isString().withMessage('This should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('This can\'t be blank.').bail()
      .isEmail().withMessage('This isn\'t valid.').bail()
      .normalizeEmail()
      .custom(async value => {
        const user = await User.findOne({ email: value });
        if (!user) return Promise.reject('No user found with this email.');
      }),

    check('password')
      .exists().withMessage('This should be present.').bail()
      .isString().withMessage('This should be string.').bail()
      .trim().isLength({ min: 6 }).withMessage('This must be at least 6 characters.')
  ],

  encryptPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  },

  comparePassword(password, encryptedPassword) {
    return bcrypt.compareSync(password, encryptedPassword);
  }
}
