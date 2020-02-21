"use strict";

const express = require("express");
const router = express.Router();
const funcs = require("./functions");

router.route("/")
    .get(funcs.ready);

module.exports = router;
