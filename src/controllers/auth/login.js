'use strict';

const jwt = require('jsonwebtoken');
const db = require('../../models');
const validators = require('../../validators');
const { HttpError } = require('../../utils');

module.exports = async function (req, res, next) {
  try {
    const { errors, isValid } = validators.loginValidator(req.body);
    if (!isValid) {
      throw new HttpError(400, 'Invalid fields', errors);
    }

    const user = await db.User.findOne({
      $or: [{ email: req.body.login }, { username: req.body.login }],
    });
    if (!user) {
      throw new HttpError(400, 'Invalid username and/or password');
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
      throw new HttpError(400, 'Invalid username and/or password');
    }
  } catch (error) {
    return next(error);
  }
};
