process.env.NODE_ENV = 'test';

import { mongoose } from 'mongoose';
import AppModel from '../../models/App.model';
import api from '../../api';
import prepareUser from './prepareUser';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

let loggedUser = {};

//Our parent block
describe('Applications', () => {
  before((done) => {
    prepareUser((user) => {
      loggedUser = user;
      done();
    })
  });

  beforeEach((done) => { //Before each test we empty the database
    AppModel.remove({}, (err) => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe('/GET applications', () => {
    it('it should GET all the applications', (done) => {
      chai.request(api)
        .get('/api/applications')
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('applications');
          res.body.applications.should.be.a('array');
          res.body.applications.length.should.be.eql(0);
          done();
        });
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST applications', () => {
    it('it should not POST an application without name field', (done) => {
      const newApp = {
      }
      chai.request(api)
        .post('/api/applications')
        .set('Authorization', loggedUser.token)
        .send(newApp)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('name');
          res.body.errors.name.should.have.property('kind').eql('required');
          done();
        });
    });

    it('it should POST an application ', (done) => {
      const newApp = {
        name: "Test app",
        baseUri: "",
      }
      chai.request(api)
        .post('/api/applications')
        .set('Authorization', loggedUser.token)
        .send(newApp)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Application successfully added!');
          res.body.app.should.have.property('name');
          res.body.app.should.have.property('baseUri');
          res.body.app.should.have.property('isActive');
          res.body.app.should.have.property('createdAt');
          res.body.app.should.have.property('user');
          res.body.app.should.have.property('user').eql(loggedUser._id);
          done();
        });
    });
  });

  /*
   * Test the /GET/:id route
   */
  describe('/GET/:id application', () => {
    it('it should GET an application by the given id', (done) => {
      const newApp = new AppModel({
        name: "My first app",
        user: loggedUser._id
      })
      newApp.save((err, app) => {
        chai.request(api)
          .get(`/api/application/${ app.id}`)
          .set('Authorization', loggedUser.token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('app');
            res.body.app.should.have.property('name');
            res.body.app.should.have.property('baseUri');
            res.body.app.should.have.property('isActive');
            res.body.app.should.have.property('createdAt');
            res.body.app.should.have.property('_id').eql(newApp._id.toString());
            done();
          });
      });

    });
    it('it should return 404 on non existing application', (done) => {
      chai.request(api)
        .get(`/api/application/123`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  /*
   * Test the /PUT/:id route
   */
  describe('/PUT/:id application', () => {
    it('it should return 404 on non existing application', (done) => {
      chai.request(api)
        .put(`/api/application/123`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('it should UPDATE an application given the id', (done) => {
      const newApp = new AppModel({
        name: "My first app",
        user: loggedUser._id,
      });
      newApp.save((err, app) => {
        chai.request(api)
          .put(`/api/application/${app._id}`)
          .set('Authorization', loggedUser.token)
          .send({name: "Edited name", baseUri: "edited/test"})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Application updated!');
            res.body.app.should.have.property('name').eql("Edited name");
            res.body.app.should.have.property('baseUri').eql("edited/test");
            done();
          });
      });
    });
  });

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id application', () => {
    it('it should return 404 on non existing application', (done) => {
      chai.request(api)
        .delete(`/api/application/123`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
    it('it should DELETE an application given the id', (done) => {
      const newApp = new AppModel({
        name: "My first app",
        user: loggedUser._id
      });
      newApp.save((err, app) => {
        chai.request(api)
          .delete(`/api/application/${app.id}`)
          .set('Authorization', loggedUser.token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Application successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });
  });

});
