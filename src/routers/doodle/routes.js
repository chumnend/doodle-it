"use strict";

const router = require("express").Router();
const fn = require("./functions");

router.route("/")
    .get(fn.listDoodles)
    .post(fn.createDoodle);

router.route("/:id")
    .get(fn.getDoodle)
    .put(fn.updateDoodle)
    .delete(fn.removeDoodle);

module.exports = router;
