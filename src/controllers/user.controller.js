import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers/errorFormator';
import User from '../models/user.model';
import Company from '../models/company.model';
import userService from '../services/user.service';
import responder from '../helpers/responder';
import jwt from '../helpers/jwt';

export default {
  async signup(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);

      if (!errors.isEmpty()) {
        return responder.unprocessableEntity(res, { errors: errors.array() });
      }

      const company = await Company.create({
        name: req.body.companyName
      });

      const encryptedPass = userService.encryptPassword(req.body.password);

      const user = await User.create({
        email: req.body.email,
        password: encryptedPass
      });

      const token = jwt.issue({ id: user._id }, '1d');
      return responder.success(req, res, user, { message: 'User has been successfully created.', jwtToken: token });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async login(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);

      if (!errors.isEmpty()) {
        return responder.unprocessableEntity(res, { errors: errors.array() });
      }

      const user = await User.findOne({ email: req.body.email });
      const authenticated = userService.comparePassword(req.body.password, user.password);

      if (!authenticated) {
        const error = {
          value: req.body.email,
          msg: 'You have entered wrong password.',
          param: 'password',
          location: 'body'
        }
        return responder.unprocessableEntity(res, { errors: [error] });
      }

      const token = jwt.issue({ id: user._id }, '1d');
      return responder.success(req, res, user, { message: 'User has been successfully logged in.', jwtToken: token });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  },

  async authenticate(req, res) {
    try {
      const token = jwt.issue({ id: req.user._id }, '1d');
      return responder.success(req, res, req.user, { message: 'User has been successfully authenticated.', jwtToken: token });
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  }
};
