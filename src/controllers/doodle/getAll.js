'use strict';

const Doodle = require('../../models/doodle');

module.exports = async function(req, res, next) {
  try {
    // return all doodles with query id
    let foundItems = await Doodle.find({ author: req.query.userId });
    
    return res.status(200).json(foundItems);
  } catch(e) {
     // pass error message to middleware
    return next({
      status: 500,
      message: e.message
    });
  }
};
