'use strict';

const { HttpError } = require('../utils');

// checks if query string value exists. If match is passed, checks if query string value is equal
module.exports = function (query, match) {
  return function (req, res, next) {
    if (typeof req.query[query] === 'undefined') {
      const err = new HttpError(
        400,
        `${query} not found. ${query} required as query string`,
      );
      return next(err);
    }

    if (match) {
      if (req.query[query] !== match) {
        const err = new HttpError(401, `Permission denied. ${query} not valid`);
        return next(err);
      }
    }

    return next();
  };
};
