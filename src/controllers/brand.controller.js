import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers/errorFormator';
import Brand from '../models/brand.model';
import responder from '../helpers/responder';

export default {
  async index(req, res) {
    try {
      const companyBoundBrand = Brand.byTenant(req.user.tenantId);
      const brands = await companyBoundBrand.find();
      return responder.success(req, res, brands, { message: 'Brands have been successfully fetched.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const companyBoundBrand = Brand.byTenant(req.user.tenantId);
      const brand = await companyBoundBrand.findById(id);
      if (!brand) return responder.notFound(res, { error: 'Brand has not been found.' });
      return responder.success(req, res, brand, { message: 'Brand has been successfully fetched.' });
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

      const companyBoundBrand = Brand.byTenant(req.user.tenantId);

      const brand = await companyBoundBrand.create({
        name: req.body.name
      });

      return responder.success(req, res, brand, { message: 'Brand has been successfully created.' });
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
        name: req.body['name'],
        active: req.body['active']
      }

      const companyBoundBrand = Brand.byTenant(req.user.tenantId);
      const brand = await companyBoundBrand.findByIdAndUpdate(id, value, { new: true });
      if (!brand) return responder.notFound(res, { error: 'Brand has not been found.' });
      return responder.success(req, res, brand, { message: 'Brand has been successfully updated.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async destroy(req, res) {
    try {
      const { id } = req.params;
      const companyBoundBrand = Brand.byTenant(req.user.tenantId);
      const brand = await companyBoundBrand.findByIdAndDelete(id);
      if (!brand) return responder.notFound(res, { error: 'Brand has not been found.' });
      return responder.success(req, res, brand, { message: 'Brand has been successfully deleted.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },
};
