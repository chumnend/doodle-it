"use strict";

const ready = require("../ready");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe("DEFAULT UNIT TEST - READY", function() {
    it("expects to respond back to be ready", async function() {
        // setup test
        let req = {};
        let res = {
            send: function() {}
        };
        let next = sinon.spy();
        
        let mock = sinon.mock(res);
        mock.expects("send").once();
        
        // start test
        await ready(req, res, next);
        expect(next.notCalled).to.be.true;
        mock.verify();
    });
});
