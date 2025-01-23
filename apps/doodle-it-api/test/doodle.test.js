'use strict';

const jwt = require('jsonwebtoken');
const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const app = require('../src/app');
const db = require('../src/models');

const expect = chai.expect;
chai.use(chaiHttp);

describe('Doodle Routes Test', function () {
  let user, token, item;
  before('setting up db', async function () {
    await db.User.deleteMany();
    await db.Doodle.deleteMany();

    user = await db.User.create({
      email: faker.internet.email(),
      username: faker.internet.userName(),
      password: faker.internet.password(),
    });

    token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      process.env.SECRET_KEY,
    );

    item = await db.Doodle.create({
      title: faker.random.word(),
      content: faker.image.imageUrl(),
      width: faker.random.number(),
      height: faker.random.number(),
      author: user.id,
    });
  });

  after('cleaning up db', async function () {
    await db.User.deleteMany();
    await db.Doodle.deleteMany();
  });

  describe('GET /v1/doodle', function () {
    it("expects to get all a user's doodles", function (done) {
      chai
        .request(app)
        .get(`/v1/doodle?apiKey=${process.env.API_LOCK}&userId=${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.have.lengthOf(1);
          done();
        });
    });
    it('expects to be fail if userId not provided', function (done) {
      chai
        .request(app)
        .get(`/v1/doodle?apiKey=${process.env.API_LOCK}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('expects to be denied if user not authorized', function (done) {
      chai
        .request(app)
        .get(`/v1/doodle?apiKey=${process.env.API_LOCK}&userId=${user.id}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('POST /v1/doodle', function () {
    it('expects to create new doodle', function (done) {
      const newItem = {
        title: faker.random.word(),
        content: faker.image.imageUrl(),
        width: faker.random.number(),
        height: faker.random.number(),
      };

      chai
        .request(app)
        .post(`/v1/doodle?apiKey=${process.env.API_LOCK}&userId=${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newItem)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('title', newItem.title);
          expect(res.body).to.have.property('content', newItem.content);
          expect(res.body).to.have.property('author', user.id);
          done();
        });
    });
    it('expects to fail if title not provided', function (done) {
      chai
        .request(app)
        .post(`/v1/doodle?apiKey=${process.env.API_LOCK}&userId=${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          content: faker.image.imageUrl(),
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('expects to fail if content not provided', function (done) {
      chai
        .request(app)
        .post(`/v1/doodle?apiKey=${process.env.API_LOCK}&userId=${user.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: faker.random.word(),
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(500);
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('expects to be fail if userId not provided', function (done) {
      chai
        .request(app)
        .post(`/v1/doodle?apiKey=${process.env.API_LOCK}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: faker.random.word(),
          content: faker.image.imageUrl(),
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          expect(res.body).to.have.property('message');
          done();
        });
    });
    it('expects to be denied if user not authorized', function (done) {
      chai
        .request(app)
        .post(`/v1/doodle?apiKey=${process.env.API_LOCK}&userId=${user.id}`)
        .send({
          title: faker.random.word(),
          content: faker.image.imageUrl(),
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message');
          done();
        });
    });
  });

  describe('GET /v1/doodle/:id', function () {
    it('expects to get doodle with given an id', function (done) {
      chai
        .request(app)
        .get(
          `/v1/doodle/${item.id}?apiKey=${process.env.API_LOCK}&userId=${user.id}`,
        )
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.property('_id', item.id);
          expect(res.body).to.have.property('title', item.title);
          expect(res.body).to.have.property('content', item.content);
          expect(res.body).to.have.property('author', user.id);
          done();
        });
    });
    it('expects to be fail if userId not provided', function (done) {
      chai
        .request(app)
        .get(`/v1/doodle/${item.id}?apiKey=${process.env.API_LOCK}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
    it('expects to be denied if user not authorized', function (done) {
      chai
        .request(app)
        .get(
          `/v1/doodle/${item.id}?apiKey=${process.env.API_LOCK}&userId=${user.id}`,
        )
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('PUT /v1/doodle/:id', function () {
    it('expects to update doodle with given id', function (done) {
      const updatedItem = {
        title: faker.random.word(),
        content: faker.image.imageUrl(),
        width: faker.random.number(),
        height: faker.random.number(),
      };

      chai
        .request(app)
        .put(
          `/v1/doodle/${item.id}?apiKey=${process.env.API_LOCK}&userId=${user.id}`,
        )
        .set('Authorization', `Bearer ${token}`)
        .send(updatedItem)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('Object');
          expect(res.body).to.have.property('_id');
          expect(res.body).to.have.property('title', updatedItem.title);
          expect(res.body).to.have.property('content', updatedItem.content);
          expect(res.body).to.have.property('author', user.id);
          done();
        });
    });
    it('expects to be fail if userId not provided', function (done) {
      chai
        .request(app)
        .put(`/v1/doodle/${item.id}?apiKey=${process.env.API_LOCK}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: faker.random.word(),
          content: faker.image.imageUrl(),
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
    it('expects to be denied if user not authorized', function (done) {
      chai
        .request(app)
        .put(
          `/v1/doodle/${item.id}?apiKey=${process.env.API_LOCK}&userId=${user.id}`,
        )
        .send({
          title: faker.random.word(),
          content: faker.image.imageUrl(),
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });
  });

  describe('DELETE /v1/doodle/:id', function () {
    it('expects to delete doodle with given id', function (done) {
      chai
        .request(app)
        .delete(
          `/v1/doodle/${item.id}?apiKey=${process.env.API_LOCK}&userId=${user.id}`,
        )
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          db.Doodle.findById(item.id, (err, res) => {
            expect(err).to.be.null;
            expect(res).to.be.null;
            done();
          });
        });
    });
    it('expects to be fail if userId not provided', function (done) {
      chai
        .request(app)
        .delete(`/v1/doodle/${item.id}?apiKey=${process.env.API_LOCK}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(400);
          done();
        });
    });
    it('expects to be denied if user not authorized', function (done) {
      chai
        .request(app)
        .delete(
          `/v1/doodle/${item.id}?apiKey=${process.env.API_LOCK}&userId=${user.id}`,
        )
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });
  });
});
