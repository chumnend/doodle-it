'use strict';

require('dotenv').config();

const env = process.env.NODE_ENV;

// set required db variable
let MONGO_URI;
if (env === 'production') {
  MONGO_URI = 'MONGODB_URI';
} else if (env === 'development') {
  MONGO_URI = 'DEV_MONGODB_URI';
} else {
  MONGO_URI = 'TEST_MONGODB_URI';
}

// ensure required environment variables exist
const required = ['NODE_ENV', 'PORT', MONGO_URI, 'SECRET_KEY', 'API_LOCK'];
required.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`environment variable ${name} not found`);
  }
});

// load configuration file
const config = require(`./environment/${env}`);

module.exports = config;
