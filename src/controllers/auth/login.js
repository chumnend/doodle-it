'use strict';

const jwt = require('jsonwebtoken');
const db = require('../../models');

module.exports = async function (req, res, next) {
  try {
    let user = await db.User.findOne({
      $or: [{ email: req.body.login }, { username: req.body.login }],
    });
    let { id, email, username } = user;

    let isMatch = await user.comparePassword(req.body.password);
    if (isMatch) {
      let token = jwt.sign({ id, email, username }, process.env.SECRET_KEY);
      return res.status(200).json({
        id,
        username,
        token,
      });
    } else {
      return next({
        status: 400,
        message: 'invalid email and/or password',
      });
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'invalid email and/or password',
    });
  }
};
