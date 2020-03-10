"use strict";

const router = require("express").Router();
const fn = require("./functions");

router.route("/")
    .get(fn.getAll)
    .post(fn.create);

router.route("/:id")
    .get(fn.getOne)
    .put(fn.update)
    .delete(fn.remove);

module.exports = router;
