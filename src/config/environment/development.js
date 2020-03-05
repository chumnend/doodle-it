"use strict";

module.exports = {
    env: "development",
    port: process.env.PORT || 3000,
    db: process.env.MONGO_DEV_URI,
};
