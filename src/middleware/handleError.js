"use strict";

// returns error message as json
module.exports = function(err, req, res, next) {
      res.status(err.status || 500).json({
          message: err.message || "something went wrong internally"
      });
};
