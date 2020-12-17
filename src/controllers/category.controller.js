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
    try {
      const { id } = req.params;
      const companyBoundCategory = Category.byTenant(req.user.tenantId);
      const category = await companyBoundCategory.findById(id);
      if (!category) return responder.notFound(res, { error: 'Category has not been found.' });
      return responder.success(req, res, category, { message: 'Category has been successfully fetched.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
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
    try {
      const errors = validationResult(req).formatWith(errorFormatter);

      if (!errors.isEmpty()) {
        return responder.unprocessableEntity(res, { errors: errors.array() });
      }

      const { id } = req.params;

      const value = {
        name: req.body.name,
        active: req.body.active
      }

      const companyBoundCategory = Category.byTenant(req.user.tenantId);
      const category = await companyBoundCategory.findByIdAndUpdate(id, value, { new: true });
      if (!category) return responder.notFound(res, { error: 'Category has not been found.' });
      return responder.success(req, res, category, { message: 'Category has been successfully updated.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const companyBoundCategory = Category.byTenant(req.user.tenantId);
      const category = await companyBoundCategory.findByIdAndDelete(id);
      if (!category) return responder.notFound(res, { error: 'Category has not been found.' });
      return responder.success(req, res, category, { message: 'Category has been successfully deleted.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },
};
