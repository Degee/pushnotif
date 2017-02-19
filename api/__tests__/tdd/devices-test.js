process.env.NODE_ENV = 'test';

import { mongoose } from 'mongoose';
import DeviceModel from '../../models/Device.model';
import AppModel from '../../models/App.model';
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

describe('Devices', () => {

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
    DeviceModel.remove({}, (err) => {
      done();
    });
  });

  /*
   * Test the /GET route
   */
  describe('/GET Devices', () => {
    it('it should GET all the devices', (done) => {
      chai.request(api)
        .get('/api/devices')
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('devices');
          res.body.devices.should.be.a('array');
          res.body.devices.length.should.be.eql(0);
          done();
        });
    });
  });

  /* -------------------------------------------------------------------------------------------*/

  /*
   * Test the /GET/:appId route
   */
  describe('/GET/:appId Devices by Application', () => {
    it('it should return 404 on non existing app', (done) => {
      chai.request(api)
        .get(`/api/application/123/devices`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('No devices found for application with id #123');
          done();
        });
    });
    it('it should GET all the devices', (done) => {
      chai.request(api)
        .get(`/api/application/${appMock._id}/devices`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('devices');
          res.body.devices.should.be.a('array');
          res.body.devices.length.should.be.eql(0);
          done();
        });
    });
  });


  /*
   * Test the /POST/:id route
   */
  describe('/POST Devices by Application', () => {
    it('it should return 404 on non existing app', (done) => {
      const device = {
        registeredId: "123ad456ad323"
      }
      chai.request(api)
        .post(`/api/application/123/devices`)
        .set('Authorization', loggedUser.token)
        .send(device)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Application with id #123 not found!');
          done();
        });
    });

    it('it should return 409 on already added', (done) => {
      const device = {
        registeredId: "123ad456ad323",
        app: appMock._id
      };
      new DeviceModel(device).save((err, item) => {
        chai.request(api)
          .post(`/api/application/${appMock._id}/devices`)
          .set('Authorization', loggedUser.token)
          .send(device)
          .end((err, res) => {
            res.should.have.status(409);
            res.body.should.be.a('object');
            res.body.should.have.property('message');
            done();
          });
      });
    });

    it('it should registered new devices', (done) => {
      const device = {
        registeredId: "123ad456ad323",
        app: appMock._id
      }
      chai.request(api)
        .post(`/api/application/${appMock._id}/devices`)
        .set('Authorization', loggedUser.token)
        .send(device)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('device');
          res.body.device.should.have.property('registeredId');
          res.body.device.should.have.property('registeredAt');
          res.body.device.should.have.property('info');
          res.body.device.should.have.property('app').eql(appMock._id.toString());
          done();
        });
    });

  });


  /* -------------------------------------------------------------------------------------------*/

  /*
   * Test the /DELETE/:id route
   */
  describe('/DELETE/:id device', () => {
    it('it should return 404 on non existing app', (done) => {
      chai.request(api)
        .delete(`/api/application/123/device/123`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Application with id #123 not found!');
          done();
        });
    });
    it('it should return 404 on non existing device', (done) => {
      chai.request(api)
        .delete(`/api/application/${appMock.id}/device/123`)
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Device with id #123 not found!');
          done();
        });
    });
    it('it should DELETE an application given the id', (done) => {
      const device = new DeviceModel({
        registeredId: "my unique id",
        app: appMock._id
      })
      device.save((err, item) => {
        chai.request(api)
          .delete(`/api/application/${appMock.id}/device/${item.id}`)
          .set('Authorization', loggedUser.token)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Device successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });

  });



});