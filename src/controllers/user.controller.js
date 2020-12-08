import { validationResult } from 'express-validator';
import { errorFormatter } from '../helpers/errorFormator';

export default {
  async signup(req, res) {
    try {
      const errors = validationResult(req).formatWith(errorFormatter);
      console.log(req);
      if (!errors.isEmpty()) {
        return res.json({ errors: errors.array() });
      }

      return res.json(req.body);
    } catch (err) {
      return res.status(500).send(err);
    }
  }
};
