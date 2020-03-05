"use strict";

const Doodle = require("../../models/doodle");
const getDoodle = require("../getDoodle");
const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const faker = require("faker");

describe("DOODLE UNIT TEST - GET", function () {
    let userId = faker.random.uuid();
    let stubModel = {
        title: faker.random.word(),
        content: faker.image.imageUrl(),
        author: userId,
    };
    
    afterEach(function () {
        sinon.restore();
    });
    
    it("expects to get a doodle", async function () {
        // setup test
        sinon.stub(Doodle, "findById").returns(stubModel);
        
        let req = {
            params: {
                id: faker.random.uuid(),
            },
            query: {
                userId
            },
        };
        let res = {
            statusCode: null,
            body: null,
            status: function(code) {
                this.statusCode = code;
                return this; 
            },
            json: function(data){
                this.body = data;
            },
        };
        let next = sinon.spy();
        
        // start test
        await getDoodle(req, res, next);
        expect(next.notCalled).to.be.true;
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.eql(stubModel);
    });
    
    it("expects db error", async function () {
        // setup test
        sinon.stub(Doodle, "findById").throws();
        
       let req = {
            body: {
                title: stubModel.title,
                content: stubModel.content,
            },
            query: {
                userId
            },
        };
        let res = {
            statusCode: null,
            body: null,
            status: function(code) {
                this.statusCode = code;
                return this; 
            },
            json: function(data){
                this.body = data;
            },
        };
        let next = sinon.spy();
        
        let mock = sinon.mock(res);
        mock.expects("status").never();
        mock.expects("json").never();
        
        // start test
        await getDoodle(req, res, next);
        expect(next.calledOnce).to.be.true;
        mock.verify();
    });
});
