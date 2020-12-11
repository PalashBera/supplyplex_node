import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers/errorFormator';
import Brand from '../models/brand.model';
import responder from '../helpers/responder';

export default {
  async index(req, res) {
    try {
      const brands = await Brand.find();
      return responder.success(req, res, brands, { message: 'Brands have been successfully fetched.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async show(req, res) {
    try {
      const { id } = req.params;
      const brand = await Brand.findById(id);
      if (!brand) return responder.notFound(res, { error: 'The brand has not been found.' });
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

      const brand = await Brand.create({
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

      const brand = await Brand.findByIdAndUpdate(id, value, { new: true });
      if (!brand) return responder.notFound(res, { error: 'The brand has not been found.' });
      return responder.success(req, res, brand, { message: 'Brand has been successfully updated.' });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async destroy(req, res) {
    // write your code here...
  },
};
