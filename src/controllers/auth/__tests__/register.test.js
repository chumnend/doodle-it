'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const faker = require('faker');
const User= require('../../../models/user');
const register = require('../register');

describe('register- Auth Unit Test', function() {
    const stubModel = {
      id: faker.random.uuid(),
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    };

    afterEach(function () {
      sinon.restore();
    });
    
    it('expects to create a user', async function() {
      // test setup 
      sinon.stub(User, 'create').returns(stubModel);
      let req = {
        body: {
          email: stubModel.email,
          username: stubModel.username,
          password: stubModel.password,
        }
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
      await register(req, res, next);
      expect(next.notCalled).to.be.true;
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.have.property('id');
      expect(res.body).to.have.have.property('username', stubModel.username);
      expect(res.body).to.have.property('token');
    });
    
    it('expects to gracefully fail given db error', async function() {
      // test setup 
      sinon.stub(User, 'create').throws();
      let req = {
        body: {
          email: stubModel.email,
          username: stubModel.username,
          password: undefined
        }
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
      mock.expects('json').never();
      mock.expects('status').never();
      
      // start test
      await register(req, res, next);
      expect(next.calledOnce).to.be.true;
      mock.verify();
    });
});
