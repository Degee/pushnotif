process.env.NODE_ENV = 'test';

import { mongoose } from 'mongoose';
import DeviceModel from '../../models/Device.model';
import AppModel from '../../models/App.model';
import NotificationsModel from '../../models/Notifications.model';
import api from '../../api';
import prepareUser from './prepareUser';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);
//Our parent block
let loggedUser = {};
let appMock = {};

describe('Notifications', () => {

  before((done) => {
    prepareUser((user) => {
      loggedUser = user;
      const newApplication = new AppModel({name: 'App for tests', user: loggedUser._id});
      newApplication.save((err, app) => {
        appMock = app;
        done();
      });
    })
  });

  beforeEach((done) => {
    NotificationsModel.remove({}, (err) => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe('/GET Notifications', () => {
    it('it should GET all the notifications', (done) => {
      chai.request(api)
        .get(`/api/application/${appMock._id}/notifications`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('notifications');
          res.body.notifications.should.be.a('array');
          res.body.notifications.length.should.be.eql(0);
          done();
        });
    });
    it('it should GET nothing', (done) => {
      chai.request(api)
        .get(`/api/application/${123}/notifications`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('/GET Notifications', () => {
    it('it should GET all summary', (done) => {
      chai.request(api)
        .get(`/api/summary`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('notifications');
          res.body.notifications.should.be.a('array');
          res.body.notifications.length.should.be.eql(0);
          done();
        });
    });
    it('it should GET nothing', (done) => {
      chai.request(api)
        .get(`/api/application/${123}/notifications`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  /* -------------------------------------------------------------------------------------------*/



  /*
   * Test the /POST/:id route
   */
  describe('/POST Notification by Application', () => {
    it('it should return 404 on non existing app', (done) => {
      const notification = {
        title: "Notif test",
        text: "Huray!",
      }
      chai.request(api)
        .post(`/api/application/123/notifications`)
        .set('Authorization', loggedUser.token)
        .send(notification)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Application with id #123 not found!');
          done();
        });
    });

    it('it should return 422 on no valid data', (done) => {
      const notification = {
        text: "Huray!",
      }
      new NotificationsModel(notification).save((err, item) => {
        chai.request(api)
          .post(`/api/application/${appMock._id}/notifications`)
          .set('Authorization', loggedUser.token)
          .send(notification)
          .end((err, res) => {
            res.should.have.status(422);
            res.body.should.be.a('object');
            res.body.should.have.property('errors');
            res.body.errors.should.have.property('title');
            res.body.errors.title.should.have.property('kind').eql('required');
            done();
          });
      });
    });

    it('it should registered new devices', (done) => {
      const notification = {
        title: "Notif test",
        text: "Huray!",
      }
      chai.request(api)
        .post(`/api/application/${appMock._id}/notifications`)
        .set('Authorization', loggedUser.token)
        .send(notification)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('notification');
          res.body.notification.should.have.property('title');
          res.body.notification.should.have.property('text');
          res.body.notification.should.have.property('datetime');
          res.body.notification.should.have.property('app').eql(appMock._id.toString());
          done();
        });
    });

  });


  describe('/DELETE/:id notification', () => {
    it('it should return 404 on non existing app', (done) => {
      chai.request(api)
        .delete(`/api/application/123/notification/123`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Application with id #123 not found!');
          done();
        });
    });
    it('it should return 404 on non existing notification', (done) => {
      chai.request(api)
        .delete(`/api/application/${appMock._id}/notification/123`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Notification with id #123 not found!');
          done();
        });
    });
    it('it should DELETE an notification given the id', (done) => {
      const notification = new NotificationsModel({
          title: "Notif test",
          text: "Huray!",
          app: appMock._id
        });
      notification.save((err, item) => {
        chai.request(api)
          .delete(`/api/application/${appMock._id}/notification/${item._id}`)
          .set('Authorization', loggedUser.token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Notification successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });

  });


  describe('/GET/:id notification', () => {
    it('it should return 404 on non existing app', (done) => {
      chai.request(api)
        .get(`/api/application/123/notification/123`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Application with id #123 not found!');
          done();
        });
    });
    it('it should return 404 on non existing notification', (done) => {
      chai.request(api)
        .get(`/api/application/${appMock._id}/notification/123`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          done();
        });
    });
    it('it should get an notification by the given id', (done) => {
      const notification = new NotificationsModel({
        title: "Notif test",
        text: "Huray!",
        app: appMock._id
      });
      notification.save((err, item) => {
        chai.request(api)
          .get(`/api/application/${appMock._id}/notification/${item._id}`)
          .set('Authorization', loggedUser.token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('notification');
            res.body.notification.should.have.property('app').eql(appMock._id.toString())
            res.body.notification.should.have.property('title').eql("Notif test");
            done();
          });
      });
    });

  });


  /*
   * Test the /PUT notification route
   */
  describe('/PUT notification', () => {
    it('it should update fields of notification', (done) => {
      const notification = {
        title: "For update!",
        text: "Huray!",
        app: appMock._id
      }
      new NotificationsModel(notification).save((err, item) => {
        chai.request(api)
          .put(`/api/application/${appMock._id}/notification/${item._id}`)
          .set('Authorization', loggedUser.token)
          .send({title: "Hehehe"})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('notification');
            res.body.notification.should.have.property('title').eql('Hehehe');
              done();
          })
      });
    });

    it('it should not update invalid data', (done) => {
      const notification = {
        title: "For update!",
        text: "Huray!",
        app: appMock._id
      }
      new NotificationsModel(notification).save((err, item) => {
        chai.request(api)
          .put(`/api/application/${appMock._id}/notification/${item._id}`)
          .set('Authorization', loggedUser.token)
          .send({app: "132"})
          .end((err, res) => {
            res.should.have.status(422);
            done();
          });
      });
    });

    it('it should return 404 on non existing app', (done) => {
      chai.request(api)
        .put(`/api/application/123/notification/123`)
        .set('Authorization', loggedUser.token)
        .send({app: "132"})
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

  });



});