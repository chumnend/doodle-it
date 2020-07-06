'use strict';

module.exports = async function(req, res, next) {
  return next({
    status: 404,
    message: 'path not found'
  });
};
