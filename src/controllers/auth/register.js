'use strict';

const jwt = require('jsonwebtoken');
const db = require('../../models');
const validators = require('../../validations');

module.exports = async function (req, res, next) {
  try {
    const { errors, isValid } = validators.registerValidator(req.body);
    if (!isValid) {
      let message = '';
      if (errors.username) {
        message += '\n' + errors.username;
      }
      if (errors.email) {
        message += '\n' + errors.email;
      }
      if (errors.password) {
        message += '\n' + errors.password;
      }

      return next({
        status: 400,
        message: message,
      });
    }

    const user = await db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const { id, email, username } = user;
    const token = jwt.sign({ id, email, username }, process.env.SECRET_KEY);

    return res.status(200).json({
      id,
      username,
      token,
    });
  } catch (error) {
    if (error.code === 11000) {
      return next({
        status: 400,
        message: 'username and/or email already taken',
      });
    }

    return next({
      status: error.status,
      message: error.message,
    });
  }
};
