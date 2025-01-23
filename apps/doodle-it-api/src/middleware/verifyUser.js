'use strict';

const jwt = require('jsonwebtoken');
const { HttpError } = require('../utils');

module.exports = function (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (decoded && decoded.id === req.query.userId) {
        return next();
      } else {
        const err = new HttpError(401, 'User Unauthorized');
        return next(err);
      }
    });
  } catch (error) {
    const err = new HttpError(401, 'User Unauthorized');
    return next(err);
  }
};
