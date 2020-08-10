'use strict';

// checks if query string value exists. If match is passed, checks if query string value is equal
module.exports = function (query, match) {
  return function (req, res, next) {
    if (typeof req.query[query] === 'undefined') {
      return next({
        status: 400,
        message: `${query} not found. ${query} required as query string`,
      });
    }

    if (match) {
      if (req.query[query] !== match) {
        return next({
          status: 401,
          message: `permission denied. ${query} not valid`,
        });
      }
    }

    return next();
  };
};
