'use strict';

const jwt = require('jsonwebtoken');
const db = require('../../models');
const validators = require('../../validators');
const { HttpError } = require('../../utils');

module.exports = async function (req, res, next) {
  try {
    const { errors, isValid } = validators.registerValidator(req.body);
    if (!isValid) {
      throw new HttpError(400, 'Invalid fields', errors);
    }

    const user = await db.User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });
    if (user) {
      throw new HttpError(400, 'Username and/or email already taken');
    }

    const newUser = await db.User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    const { id, email, username } = newUser;
    const token = jwt.sign({ id, email, username }, process.env.SECRET_KEY);

    return res.status(200).json({
      id,
      username,
      token,
    });
  } catch (error) {
    return next(error);
  }
};
