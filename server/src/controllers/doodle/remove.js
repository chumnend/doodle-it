'use strict';

const db = require('../../models');

module.exports = async function (req, res, next) {
  try {
    // remove doodle from the db
    const deletedItem = await db.Doodle.findByIdAndDelete(req.params.id);

    return res.status(200).json(deletedItem);
  } catch (error) {
    // pass error message to middleware
    return next(error);
  }
};
