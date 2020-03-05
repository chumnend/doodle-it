"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const { checkQuery, verifyUser, handleError } = require("./middleware");
const routers = require("./routers");
const db = require("./database");

// configure the application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.options("*", cors());
app.use(cors());
if(config.env !== "test") {
    app.use(morgan("common")); // logging deactivated in testing
}
app.use(checkQuery("apiKey", process.env.API_LOCK));

// setup routers
app.use("/", routers.default);
app.use("/v1/auth", routers.auth);
app.use("/v1/doodle", checkQuery("userId"), verifyUser, routers.doodle);
app.all("*", routers.error);

// error handling
app.use(handleError); 

// start the server
app.listen(config.port, () => {
    console.log("server started on port", config.port);
});

module.exports = app;
