'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('./config');
const middleware = require('./middleware');
const router = require('./routes');
const { HttpError } = require('./utils');

// configure the application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(helmet());
if (config.env !== 'test') {
  app.use(morgan('common')); // logging deactivated in testing
}
app.use(middleware.checkQuery('apiKey', config.lock));

// setup routers
app.get('/', (req, res, next) => {
  return res.send('Ready to serve requests');
});

app.use(router.authRouter);
app.use(router.doodleRouter);

// error handling
app.all('*', (req, res, next) => {
  const err = new HttpError(404, 'Path not found');
  return next(err);
});

app.use(middleware.handleError);

// start the server
app.listen(config.port, () => {
  console.log('Server started on port', config.port);
});

module.exports = app;
