'use strict';

const chai = require('chai');
const sinon = require('sinon');
const checkQuery = require('../checkQuery');

const expect = chai.expect;

describe('checkQuery - Middleware Unit Test', function () {
  afterEach(function () {
    sinon.restore();
  });

  it('expects to find query and continue', function () {
    // setup test
    const query = 'test';
    const testFunc = checkQuery(query);

    const req = {
      query: {
        test: true,
      },
    };
    const res = {};
    const next = sinon.spy();

    // start test
    testFunc(req, res, next);
    expect(next.calledOnceWithExactly()).to.be.true;
  });

  it('expects to not find query and fail', function () {
    // setup test
    const query = 'test';
    const testFunc = checkQuery(query);

    const req = {
      query: {},
    };
    const res = {};
    const next = sinon.spy();

    // start test
    testFunc(req, res, next);
    expect(next.calledOnceWith(sinon.match.object)).to.be.true;
  });

  it('expects to find query, match and continue', function () {
    // setup test
    const query = 'test';
    const match = 123;
    const testFunc = checkQuery(query, match);

    const req = {
      query: {
        test: 123,
      },
    };
    const res = {};
    const next = sinon.spy();

    // start test
    testFunc(req, res, next);
    expect(next.calledOnceWithExactly()).to.be.true;
  });

  it('expects to find query, not match and fail', function () {
    // setup test
    const query = 'test';
    const match = 123;
    const testFunc = checkQuery(query, match);

    const req = {
      query: {
        test: 'fail',
      },
    };
    const res = {};
    const next = sinon.spy();

    // start test
    testFunc(req, res, next);
    expect(next.calledOnceWith(sinon.match.object)).to.be.true;
  });
});
