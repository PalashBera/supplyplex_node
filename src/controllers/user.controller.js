import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers/errorFormator';
import User from '../models/user.model';
import userService from '../services/user.service';
import responder from '../helpers/responder';

export default {
  async signup(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);

      if (!errors.isEmpty()) {
        return responder.unprocessableEntity(res, { errors: errors.array() });
      }

      const encryptedPass = userService.encryptPassword(req.body.password);

      const user = await User.create({
        email: req.body.email,
        password: encryptedPass
      });

      return responder.success(req, res, user, { message: 'User has been successfully created.' });
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

      return responder.success(req, res, user, { message: 'User has been successfully logged in.' }); // send jwt token
    } catch (err) {
      return responder.internalServerError(res, err);
    }
  }
};
