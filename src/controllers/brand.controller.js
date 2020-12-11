import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers/errorFormator';
import Brand from '../models/brand.model';
import responder from '../helpers/responder';

export default {
  async index(req, res) {
    // write your code here...
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

      const brand = await Brand.create({
        name: req.body.name
      });

      return responder.success(req, res, brand, { message: 'Brand has been successfully created.' });
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
