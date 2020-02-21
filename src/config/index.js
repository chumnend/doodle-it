"use strict";

require("dotenv").config();

// ensure required environment variables exist
const required = [
    "NODE_ENV",
    "PORT"
];
required.forEach( (name) => {
    if(!process.env[name]) {
        throw new Error(`environment variable ${name} not found`);
    } 
});

// load configuration file
const env = process.env.NODE_ENV;
const config = require(`./environment/${env}`);

module.exports = config;
