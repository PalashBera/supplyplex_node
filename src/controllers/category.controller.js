import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers/errorFormator';
import Category from '../models/category.model';
import responder from '../helpers/responder';

export default {
  async index(req, res) {
    try {
      const companyBoundCategory = Category.byTenant(req.user.tenantId);
      const categories = await companyBoundCategory.find();
      return responder.success(req, res, categories, { message: 'Categories have been successfully fetched.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async show(req, res) {
    // write your code here...
  },

  async create(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);

      if (!errors.isEmpty()) {
        return responder.unprocessableEntity(res, { errors: errors.array() });
      }

      const companyBoundCategory = Category.byTenant(req.user.tenantId);

      const category = await companyBoundCategory.create({
        name: req.body.name
      });

      return responder.success(req, res, category, { message: 'Category has been successfully created.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async update(req, res) {
    // write your code here...
  },

  async destroy(req, res) {
    // write your code here...
  },
};
