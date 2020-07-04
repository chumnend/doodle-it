'use strict';

const jwt = require('jsonwebtoken');
const User = require('../../models/user');

module.exports = async function (req, res, next) 
{
  try {
    let user = await User.create(req.body);
    let { id, email, username } = user;
  
    let token = jwt.sign({ id, email, username }, process.env.SECRET_KEY);
    return res.status(200).json({
      id,
      username,
      token 
    });
  } catch(err) {
    if(err.code === 11000) {
      err.message = 'username and/or email has already taken'; 
    }
    
    return next({
      status: 400, 
      message: 'invalid email and/or password'
    });
  }
};
