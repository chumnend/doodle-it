'use strict';

const Doodle = require('../../models/doodle');

module.exports = async function(req, res, next) {
  try {
    // return found doodle
    let foundItem = await Doodle.findById(req.params.id);
    
    return res.status(200).json(foundItem);
  } catch(e) {
     // pass error message to middleware
    return next({
      status: 500,
      message: e.message
    });
  }
};
