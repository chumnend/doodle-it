"use strict";

const router = require("express").Router();
const fn = require("./functions");

router.route("/register")
    .post(fn.register);

router.route("/login")
    .post(fn.login);
    
module.exports = router;
