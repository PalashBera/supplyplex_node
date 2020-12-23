global.env = process.env.NODE_ENV || 'local';
const config = require('./config/environments/' + global.env);

import express from 'express';
import logger from 'morgan';
import passport from 'passport';
import cors from 'cors';
import mongoose from 'mongoose';
import swaggerOptions from '../swagger.json';
import { rootRouter } from './api'
import { configJWTStrategy } from './helpers/passportJwt';

mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongodb.url, config.db.mongodb.options)
  .then(() => console.log('Database is connected successfully.'))
  .catch((err) => console.log('Error while connecting to database.'))

const app = express();

const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi = require("swagger-ui-express");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use(passport.initialize());
configJWTStrategy();

app.use('/api', rootRouter);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.message = 'Invalid route';
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(config.port, () => {
  console.log(`Server is running at PORT http://localhost:${config.port}`);
});
