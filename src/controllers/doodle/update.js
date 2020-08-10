'use strict';

const db = require('../../models');

module.exports = async function (req, res, next) {
  try {
    // update doodle item
    let updatedItem = await db.Doodle.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    return res.status(200).json(updatedItem);
  } catch (e) {
    // pass error message to middleware
    return next({
      status: 500,
      message: e.message,
    });
  }
};
