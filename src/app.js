'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require('./config');
const middleware = require('./middleware');
const router = require('./router');

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
  res.send('ready to serve requests');
});

app.use(router);

// error handling
app.all('*', middleware.notFound);
app.use(middleware.handleError);

// start the server
app.listen(config.port, () => {
  console.log('server started on port', config.port);
});

module.exports = app;
