'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const app = require('../src/app');
const db = require('../src/models');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Authentication Routes Test', function () {
  const user = {
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
  };

  before('setting up db', async function () {
    await db.User.deleteMany();
    await db.User.create(user);
  });

  after('cleaning up db', async function () {
    await db.User.deleteMany();
  });

  describe('POST /v1/auth/register', function () {
    it('expects to successfully create a new user', function (done) {
      const newUser = {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        password: faker.internet.password(),
      };

      chai
        .request(app)
        .post(`/v1/auth/register?apiKey=${process.env.API_LOCK}`)
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.have.property('username', newUser.username);
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('expects to fail to create user given username already exists', function (done) {
      chai
        .request(app)
        .post(`/v1/auth/register?apiKey=${process.env.API_LOCK}`)
        .send({
          email: faker.internet.email(),
          username: user.username,
          password: faker.internet.password(),
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('expects to fail to create user given email already exists', function (done) {
      chai
        .request(app)
        .post(`/v1/auth/register?apiKey=${process.env.API_LOCK}`)
        .send({
          email: user.email,
          username: faker.internet.userName(),
          password: faker.internet.password(),
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('expects to fail to create user given incomplete information', function (done) {
      chai
        .request(app)
        .post(`/v1/auth/register?apiKey=${process.env.API_LOCK}`)
        .send({
          email: faker.internet.email,
          username: faker.internet.userName(),
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('POST /v1/auth/login', function () {
    it('expects to successfully log in given correct email and password', function (done) {
      chai
        .request(app)
        .post(`/v1/auth/login?apiKey=${process.env.API_LOCK}`)
        .send({
          login: user.email,
          password: user.password,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('username');
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('exepcts to successfully log in given correct username and password', function (done) {
      chai
        .request(app)
        .post(`/v1/auth/login?apiKey=${process.env.API_LOCK}`)
        .send({
          login: user.username,
          password: user.password,
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('id');
          expect(res.body).to.have.property('username');
          expect(res.body).to.have.property('token');
          done();
        });
    });
    it('expects fail at logging in given wrong password', function (done) {
      chai
        .request(app)
        .post(`/v1/auth/login?apiKey=${process.env.API_LOCK}`)
        .send({
          username: user.username,
          password: faker.internet.password(),
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });
});
