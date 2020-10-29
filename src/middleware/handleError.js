'use strict';

// returns error message as json
module.exports = function (err, req, res, next) {
  return res.status(err.status || 500).json({
    message: err.message || 'Something went wrong. Please try again later.',
    extra: err.extra || null,
  });
};
