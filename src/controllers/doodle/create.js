'use strict';

const db = require('../../models');

module.exports = async function(req, res, next) {
  try {
    // create new doodle
    let newItem = await db.Doodle.create({
      title: req.body.title,
      content: req.body.content,
      width: req.body.width,
      height: req.body.height,
      author: req.query.userId,
    });
    
    // return newly created doodle
    let foundItem = await db.Doodle.findById(newItem.id);
    
    return res.status(200).json(foundItem);
  } catch(e) {
    // pass error message to middleware
    return next({
      status: 500,
      message: e.message
    });
  }
};
