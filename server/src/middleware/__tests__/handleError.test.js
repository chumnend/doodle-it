'use strict';

const chai = require('chai');
const handleError = require('../handleError');

const expect = chai.expect;

describe('handleError - Middleware Unit Test', function () {
  it('expects to parse messages correctly', function () {
    // setup test
    const err = {
      status: 200,
      message: 'this is a test',
      extra: { test: 'this is a test' }
    };
    const req = {};
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
    const next = function () {};

    // start test
    handleError(err, req, res, next);
    expect(res.statusCode).to.be.equal(err.status);
    expect(res.body).to.have.property('message', err.message);
    expect(res.body).to.have.property('extra', err.extra);
  });
});
