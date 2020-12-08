global.env = process.env.NODE_ENV || 'local';
const config = require('./config/environments/' + global.env);

import express from 'express';
import logger from 'morgan';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.connect(config.db.mongodb.url, config.db.mongodb.options)
  .then(() => console.log('Database is connected successfully.'))
  .catch((err) => console.log('Error while connecting to database.'))

const app = express();

app.use(logger('dev'));

app.get('/', (req, res) => res.json({ msg: 'Welcome to supplyplex..!!' }));

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
