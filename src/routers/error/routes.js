"use strict";

const express = require("express");
const router = express.Router();
const funcs = require("./functions");

router.route("*")
    .all(funcs.notFound);

module.exports = router;
