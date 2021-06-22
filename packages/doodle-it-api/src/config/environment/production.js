'use strict';

module.exports = {
  env: 'production',
  port: process.env.PORT || 8000,
  db: process.env.MONGODB_URI,
  lock: process.env.API_LOCK,
};
