'use strict';

const mongoose = require('mongoose');
const config = require('../config');

// connect to mongoose
const url = config.db;
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  keepAlive: true,
};

if (config.env === 'development') {
  mongoose.set('debug', true);
}
mongoose.Promise = Promise;
mongoose.connect(url, opts);

// export models from routers
module.exports = {
  User: require('./user'),
  Doodle: require('./doodle'),
};
