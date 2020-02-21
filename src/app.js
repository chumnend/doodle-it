"use strict";

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const config = require("./config");
const middleware = require("./middleware");
const routers = require("./routers");

// configure the application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
if(config.env !== "test") {
    // middleware deactivated in testing mode
    app.use(morgan("common"));
}

// setup routers
app.use("/", routers.default);
/*
    NEW ROUTERS GO HERE
*/
app.all("*", routers.error);

// error handling
app.use(middleware.handleError); 

// start the server
app.listen(config.port, () => {
    console.log("server started on port", config.port);
});

module.exports = app;
