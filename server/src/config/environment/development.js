'use strict';

module.exports = {
  env: 'development',
  port: process.env.PORT || 3000,
  db: process.env.DEV_MONGODB_URI,
  lock: process.env.API_LOCK,
};
