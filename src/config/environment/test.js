'use strict';

module.exports = {
  env: 'test',
  port: 4000,
  db: process.env.TEST_MONGODB_URI,
  lock: process.env.API_LOCK,
};
