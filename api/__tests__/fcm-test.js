process.env.NODE_ENV = 'test';

import { sendNotification, checkValidToken } from '../models/PushNotifications.service';

//Require the dev-dependencies
const chai = require('chai');
const should = chai.should();

//Our parent block
describe('FCM Token', () => {

  describe('', () => {
    it('it should return error', (done) => {
      checkValidToken('123invalidtoken456', (err, res) => {
            err.should.be.a('string');
            err.should.eql('InvalidServerResponse');
            done();
          });
      }).timeout(10000);;
    });

});
