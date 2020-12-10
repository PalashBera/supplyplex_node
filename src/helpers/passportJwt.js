global.env = process.env.NODE_ENV || 'local';
const config = require('../config/environments/' + global.env);

import Passport from 'passport';
import PassportJWT from 'passport-jwt';
import User from '../models/user.model';

export const configJWTStrategy = () => {
  const opts = {
    jwtFromRequest: PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secrets.jwt_key,
  };

  Passport.use(
    new PassportJWT.Strategy(opts, (payload, done) => {
      User.findOne({ _id: payload.id }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, user);
        }

        return done(null, false);
      });
    })
  );
};
