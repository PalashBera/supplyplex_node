import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers/errorFormator';
import User from '../models/user.model';
import userService from '../services/user.service';

export default {
  async signup(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);

      if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
      }

      const encryptedPass = userService.encryptPassword(req.body.password);

      const user = await User.create({
        email: req.body.email,
        password: encryptedPass
      });

      return res.json(user);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};
