'use strict';

const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const faker = require('faker');
const Doodle = require('../../../models/doodle');
const create = require('../create');

describe('create - Doodle Unit Test', function () {
  const userId = faker.random.uuid();
  const stubModel = {
    title: faker.random.word(),
    content: faker.image.imageUrl(),
    width: faker.random.number(),
    height: faker.random.number(),
    author: userId,
  };

  afterEach(function () {
    sinon.restore();
  });

  it('expects to create new doodle', async function () {
    // setup test
    sinon.stub(Doodle, 'create').returns(stubModel);
    sinon.stub(Doodle, 'findById').returns(stubModel);

    const req = {
      body: stubModel,
      query: {
        userId,
      },
    };
    const res = {
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
    const next = sinon.spy();

    // start test
    await create(req, res, next);
    expect(next.notCalled).to.be.true;
    expect(res.statusCode).to.be.equal(200);
    expect(res.body).to.be.eql(stubModel);
  });

  it('expects db error', async function () {
    // setup test
    sinon.stub(Doodle, 'create').throws();

    const req = {
      body: {
        title: stubModel.title,
        content: stubModel.content,
        width: stubModel.width,
        height: stubModel.height,
      },
      query: {
        userId,
      },
    };
    const res = {
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
    const next = sinon.spy();

    const mock = sinon.mock(res);
    mock.expects('status').never();
    mock.expects('json').never();

    // start test
    await create(req, res, next);
    expect(next.calledOnce).to.be.true;
    mock.verify();
  });
});
