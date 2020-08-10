'use strict';

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.id === req.query.userId) {
        return next();
      } else {
        return next({
          status: 401,
          message: 'unauthorized',
        });
      }
    });
  } catch (err) {
    return next({
      status: 401,
      message: 'unauthorized',
    });
  }
};
