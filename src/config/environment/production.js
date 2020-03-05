"use strict";

module.exports = {
    env: "production",
    port: process.env.PORT || 3000,
    db: process.env.MONGO_PROD_URI,
};
