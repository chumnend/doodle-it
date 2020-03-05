"use strict";

const checkQuery = require("../checkQuery");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");

describe("MIDDLEWARE UNIT TEST - CHECKQUERY", function() {
    afterEach(function() {
       sinon.restore(); 
    });
    
    it("expects to find query and continue", function() {  
        // setup test
        let query = "test";
        let testFunc = checkQuery(query);
        
        let req = {
            query: {
                test: true,
            }
        };
        let res = {};
        let next = sinon.spy();
        
        // start test
        testFunc(req , res, next);
        expect(next.calledOnceWithExactly()).to.be.true;
    });
    
    it("expects to not find query and fail", function() {
        // setup test
        let query = "test";
        let testFunc = checkQuery(query);
        
        let req = {
            query: {}
        };
        let res = {};
        let next = sinon.spy();
        
        // start test
        testFunc(req , res, next);
        expect(next.calledOnceWith(sinon.match.object)).to.be.true;
    });
    
    it("expects to find query, match and continue", function() {
        // setup test
        let query = "test";
        let match = 123;
        let testFunc = checkQuery(query, match);
        
        let req = {
            query: {
                test: 123,
            }
        };
        let res = {};
        let next = sinon.spy();
        
        // start test
        testFunc(req , res, next);
        expect(next.calledOnceWithExactly()).to.be.true;
    });
    
    it("expects to find query, not match and fail", function() {
        // setup test
        let query = "test";
        let match = 123;
        let testFunc = checkQuery(query, match);
        
        let req = {
            query: {
                test: "fail"
            }
        };
        let res = {};
        let next = sinon.spy();
        
        // start test
        testFunc(req , res, next);
        expect(next.calledOnceWith(sinon.match.object)).to.be.true;
    });
});
