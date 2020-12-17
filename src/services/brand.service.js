import { check } from 'express-validator';
import Brand from '../models/brand.model';

module.exports = {
  validateCreate: [
    check('name')
      .exists().withMessage('This should be present.').bail()
      .isString().withMessage('This should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('This can\'t be blank.').bail()
      .custom(async (value, { req, loc, path }) => {
        const companyBoundBrand = Brand.byTenant(req.user.tenantId);
        const brand = await companyBoundBrand.findOne({ name: value });
        if (brand) return Promise.reject('This has already been taken.');
      })
  ],

  validateUpdate: [
    check('name')
      .exists().withMessage('This should be present.').bail()
      .isString().withMessage('This should be string.').bail()
      .trim().isLength({ min: 1 }).withMessage('This can\'t be blank.').bail()
      .custom(async (value, { req, loc, path }) => {
        const companyBoundBrand = Brand.byTenant(req.user.tenantId);
        const brand = await companyBoundBrand.findOne({ name: value });
        if (brand && brand._id.toString() !== req.params.id) return Promise.reject('This has already been taken.');
      }),

    check('active')
      .exists().withMessage('This should be present.').bail()
      .isBoolean().withMessage('This should be boolean.')
  ]
}
