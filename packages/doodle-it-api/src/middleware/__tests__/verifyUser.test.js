'use strict';

const jwt = require('jsonwebtoken');
const chai = require('chai');
const sinon = require('sinon');
const faker = require('faker');
const verifyUser = require('../verifyUser');

const expect = chai.expect;

describe('verifyUser - Middleware Unit Test', function () {
  const id = faker.random.uuid();
  const email = faker.internet.email();
  const username = faker.internet.userName();
  let token;

  before(function () {
    token = jwt.sign({ id, email, username }, process.env.SECRET_KEY);
  });

  afterEach(function () {
    sinon.restore();
  });

  it('expects to verify a jwt', function () {
    // setup test
    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      query: {
        userId: id,
      },
    };
    const res = {};
    const next = sinon.spy();

    // start test
    verifyUser(req, res, next);
    expect(next.calledOnceWithExactly()).to.be.true;
  });

  it('expects to not verify a jwt', function () {
    // setup test
    const req = {
      headers: {
        authorization: '',
      },
      query: {
        userId: faker.random.uuid(),
      },
    };
    const res = {};
    const next = sinon.spy();

    // start test
    verifyUser(req, res, next);
    expect(next.calledOnceWith(sinon.match.object)).to.be.true;
  });
});
