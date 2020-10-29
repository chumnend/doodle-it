'use strict';

const jwt = require('jsonwebtoken');
const chai = require('chai');
const sinon = require('sinon');
const faker = require('faker');
const verifyUser = require('../verifyUser');

const expect = chai.expect;

describe('verifyUser - Middleware Unit Test', function () {
  let id = faker.random.uuid();
  let email = faker.internet.email();
  let username = faker.internet.userName();
  let token;

  before(function () {
    token = jwt.sign({ id, email, username }, process.env.SECRET_KEY);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('expects to verify a jwt', function () {
    // setup test
    let req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      query: {
        userId: id,
      },
    };
    let res = {};
    let next = sinon.spy();

    // start test
    verifyUser(req, res, next);
    expect(next.calledOnceWithExactly()).to.be.true;
  });

  it('expects to not verify a jwt', function () {
    // setup test
    let req = {
      headers: {
        authorization: '',
      },
      query: {
        userId: faker.random.uuid(),
      },
    };
    let res = {};
    let next = sinon.spy();

    // start test
    verifyUser(req, res, next);
    expect(next.calledOnceWith(sinon.match.object)).to.be.true;
  });
});
