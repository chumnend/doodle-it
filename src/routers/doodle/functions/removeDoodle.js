"use strict";

const Doodle = require("../models/doodle");

module.exports = async function(req, res, next) {
    try {
        // remove doodle from the db
        let deletedItem = await Doodle.findByIdAndDelete(req.params.id);
        return res.status(200).json(deletedItem);
    } catch(e) {
         // pass error message to middleware
        return next({
            status: 500,
            message: e.message
        });
    }
};
