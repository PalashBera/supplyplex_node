import { check } from 'express-validator';
import Category from '../models/category.model';

module.exports = {
  validateCreate: [
    check('name')
      .exists().withMessage('This should be present.').bail()
      .isString().withMessage('This should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('This can\'t be blank.').bail()
      .custom(async (value, { req, loc, path }) => {
        const companyBoundCategory = Category.byTenant(req.user.tenantId);
        const category = await companyBoundCategory.findOne({ name: value });
        if (category) return Promise.reject('This has already been taken.');
      })
  ],

  validateUpdate: [
    check('name')
      .exists().withMessage('This should be present.').bail()
      .isString().withMessage('This should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('This can\'t be blank.').bail()
      .custom(async (value, { req, loc, path }) => {
        const companyBoundCategory = Category.byTenant(req.user.tenantId);
        const category = await companyBoundCategory.findOne({ name: value });
        if (category && category._id.toString() !== req.params.id) return Promise.reject('This has already been taken.');
      }),

    check('active')
      .exists().withMessage('This should be present.').bail()
      .isBoolean().withMessage('This should be boolean.')
  ]
}
