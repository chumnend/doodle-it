'use strict';

const jwt = require('jsonwebtoken');
const db = require('../../models');
const validators = require('../../validations');

module.exports = async function (req, res, next) {
  try {
    const { errors, isValid } = validators.loginValidator(req.body);
    if (!isValid) {
      let message = '';
      if (errors.login) {
        message += '\n' + errors.login;
      }
      if (errors.password) {
        message += '\n' + errors.password;
      }

      return next({
        status: 400,
        message: message,
      });
    }

    const user = await db.User.findOne({
      $or: [{ email: req.body.login }, { username: req.body.login }],
    });
    if (!user) {
      return next({
        status: 400,
        message: 'user does not exist',
      });
    }

    const { id, email, username } = user;
    const isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      const token = jwt.sign({ id, email, username }, process.env.SECRET_KEY);
      return res.status(200).json({
        id,
        username,
        token,
      });
    } else {
      return next({
        status: 400,
        message: 'invalid login and/or password',
      });
    }
  } catch (error) {
    return next({
      status: error.status,
      message: error.message,
    });
  }
};
