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
  }
};
