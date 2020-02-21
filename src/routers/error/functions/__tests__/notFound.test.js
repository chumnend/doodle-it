"use strict";

const notFound = require("../notFound");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe("ERROR UNIT TEST - NOTFOUND", function() {
    it("expects to respond back to be ready", async function() {
        // setup test
        let req = {};
        let res = {
            send: function() {}
        };
        let next = sinon.spy();
        
        let mock = sinon.mock(res);
        mock.expects("send").never();
        
        // start test
        await notFound(req, res, next);
        expect(next.calledOnce).to.be.true;
        mock.verify();
    });
});
