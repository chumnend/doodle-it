"use strict";

const app = require("../app");
const chai = require("chai");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("ERROR INTEGRATION TEST", function() {
    describe("GET /not-a-path", function () {
        it("expects to encounter 404", function(done) {
            chai.request(app)
                .get(`/not-a-path?apiKey=${process.env.API_LOCK}`)
                .end( (err, res) => {
                    expect(err).to.be.null;
                    expect(res).to.have.status(404);
                    expect(res.body).to.have.property("message");
                    done();    
                });
        });
    });
});
