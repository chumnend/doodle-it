'use strict';

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../src/app');

chai.use(chaiHttp);

describe('Base Routes Test', function () {
  describe('GET /', function () {
    it('expects to be ready to serve', function (done) {
      chai
        .request(app)
        .get(`/?apiKey=${process.env.API_LOCK}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('expects to be denied access to the path with missing key', function (done) {
      chai
        .request(app)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('expects to be denied access to the path with incorrect key', function (done) {
      chai
        .request(app)
        .get(`/?apiKey=${process.env.API_LOCK}-this-should-fail`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('GET /not-a-path', function () {
    it('expects to encounter 404', function (done) {
      chai
        .request(app)
        .get(`/not-a-path?apiKey=${process.env.API_LOCK}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});
