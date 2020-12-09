global.env = process.env.NODE_ENV || 'local';
const config = require('../config/environments/' + global.env);

import jwt from 'jsonwebtoken';

export default {
  issue(payload, expiresIn) {
    return jwt.sign(payload, config.secrets.jwt_key, {
      expiresIn,
    });
  },
};
