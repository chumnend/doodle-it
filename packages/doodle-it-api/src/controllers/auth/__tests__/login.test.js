'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const faker = require('faker');
const User = require('../../../models/user');
const login = require('../login');

describe('login - Auth Unit Test', function () {
  const stubModel = {
    id: faker.random.uuid(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    comparePassword: function (password) {
      return password == this.password;
    },
  };

  afterEach(function () {
    sinon.restore();
  });

  it('expects to log in successfully as a user', async function () {
    // test setup
    sinon.stub(User, 'findOne').returns(stubModel);
    let req = {
      body: {
        login: stubModel.username,
        password: stubModel.password,
      },
    };
    let res = {
      statusCode: null,
      body: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.body = data;
      },
    };
    let next = sinon.spy();

    // start test
    await login(req, res, next);
    expect(next.notCalled).to.be.true;
    expect(res.statusCode).to.be.equal(200);
    expect(res.body).to.have.property('id');
    expect(res.body).to.have.property('username');
    expect(res.body).to.have.property('token');
  });

  it('expects to gracefully fail if db error', async function () {
    // test setup
    sinon.stub(User, 'findOne').throws();
    let req = {
      body: {
        login: stubModel.username,
        password: 'bad password',
      },
    };
    let res = {
      statusCode: null,
      body: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.body = data;
      },
    };
    let next = sinon.spy();

    let mock = sinon.mock(res);
    mock.expects('json').never();
    mock.expects('status').never();

    // start test
    await login(req, res, next);
    expect(next.calledOnce).to.be.true;
    mock.verify();
  });

  it('expects to not log in given wrong password', async function () {
    // test setup
    sinon.stub(User, 'findOne').returns(stubModel);
    let req = {
      body: {
        login: stubModel.username,
        password: 'bad password',
      },
    };
    let res = {
      statusCode: null,
      body: null,
      status: function (code) {
        this.statusCode = code;
        return this;
      },
      json: function (data) {
        this.body = data;
      },
    };
    let next = sinon.spy();

    let mock = sinon.mock(res);
    mock.expects('json').never();
    mock.expects('status').never();

    // start test
    await login(req, res, next);
    expect(next.calledOnce).to.be.true;
    mock.verify();
  });
});
