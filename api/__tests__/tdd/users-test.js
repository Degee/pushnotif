process.env.NODE_ENV = 'test';

import { mongoose } from 'mongoose';
import UserModel from '../../models/User.model';
import api from '../../api';
import prepareUser from './prepareUser';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);
let loggedUser = {};

//Our parent block
describe('Users', () => {
  beforeEach((done) => { //Before each test we empty the database
    UserModel.remove({}, (err) => {
      prepareUser((user) => {
        loggedUser = user;
        done();
      })
    });
  });

  /*
   * Test the /POST route
   */
  describe('/POST registration', () => {

    it('it should register a new user ', (done) => {
      const user = new UserModel({
        email: 'test@user.com',
        password: "123456"
      });
      chai.request(api)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message');
          res.body.should.have.property('user');
          res.body.should.have.property('settings');
          res.body.should.have.property('token');
          done();
        });
    });

    it('it should not register user without pass or email', (done) => {
      const user = new UserModel({
        password: "123456"
      });
      chai.request(api)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('it should not register user without pass or email', (done) => {
      const user = new UserModel({
        email: 'test@user.com',
      });
      chai.request(api)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });

    it('it should not register existing email', (done) => {
      const user = new UserModel({
        email: 'test@user.com',
        password: "123456"
      });
      user.save((err, u) => {
        chai.request(api)
          .post('/api/users')
          .send(u)
          .end((err, res) => {
            res.should.have.status(409);
            done();
          });
      });
    });
  });


  /*
   * Test the /POST login route
   */
  describe('/POST login', () => {
    it('it should login registered user ', (done) => {
      const user = new UserModel({
        email: 'test@user.com',
        password: "123456"
      });
      user.save((err, u) => {
        chai.request(api)
          .post('/api/users/login')
          .send({
            email: 'test@user.com',
            password: "123456"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message');
            res.body.should.have.property('user');
            res.body.should.have.property('token');
            done();
          });
      });
    });

    it('it should not login user with bad password', (done) => {
      const user = new UserModel({
        email: 'test@user.com',
        password: "654321"
      });
      user.save((err, u) => {
        chai.request(api)
          .post('/api/users/login')
          .send({
            email: 'test@user.com',
            password: "123456"
          })
          .end((err, res) => {
            res.should.have.status(401);
            res.body.should.have.property('message').eql('Authorization failed! Bad password!');
            done();
          });
      });
    });

    it('it should not login user with non existing email', (done) => {
      chai.request(api)
        .post('/api/users/login')
        .send({
          email: 'test@user.com',
          password: "123456"
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('Authorization failed! Bad email!');
          done();
        });
    });


  });


  /*
   * Test the /POST login route
   */
  describe('/POST forgottenPassword', () => {
    it('it should send new password', (done) => {
      const user = new UserModel({
        email: 'jirilevy@seznam.cz',
        password: "654321"
      });
      user.save((err, u) => {
        chai.request(api)
          .post('/api/users/forgottenPassword')
          .send({email: 'jirilevy@seznam.cz'})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Password successfully renewed! Check your email.');

            chai.request(api)
              .post('/api/users/login')
              .send({email: 'jirilevy@seznam.cz', password: "654321"})
              .end((err, res) => {
                res.should.have.status(401);
                res.body.should.have.property('message').eql('Authorization failed! Bad password!');
                done();
              })
          });
      });
    });

    it('it should not send new password on not exist email', (done) => {
      chai.request(api)
        .post('/api/users/forgottenPassword')
        .send({email: 'test@user.com'})
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Email not found!');
          done();
        });
    });

  });

  /*
   * Test the /GET login route
   */
  describe('/GET logout', () => {
    it('it should logout user', (done) => {
      const user = new UserModel({
        email: 'jirilevy@seznam.cz',
        password: "654321"
      });
      user.save((err, u) => {
        chai.request(api)
          .post('/api/users/login')
          .send({email: 'jirilevy@seznam.cz', password: "654321"})
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('token');
            chai.request(api)
              .get('/api/users/logout')
              .set('Authorization', res.body.token)
              .end((err, res2) => {
                res2.should.have.status(205);
                chai.request(api)
                  .get('/api/users/logout')
                  .set('Authorization', res.body.token)
                  .end((err, res3) => {
                    res3.should.have.status(403);
                  });
                done();
              })
          });
      });
    });

    it('it should not send new password on not exist email', (done) => {
      chai.request(api)
        .post('/api/users/forgottenPassword')
        .send({email: 'test@user.com'})
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('Email not found!');
          done();
        });
    });

  });


  /*
   * Test the /PUT user route
   */
  describe('/PUT user', () => {
    it('it should update password of user', (done) => {
      chai.request(api)
        .put('/api/user/me')
        .set('Authorization', loggedUser.token)
        .send({password: "newPassword", oldPassword: "supersecretpassword"})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          chai.request(api)
            .post('/api/users/login')
            .send({email: loggedUser.email, password: "newPassword"})
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.property('token');
              done();
            })
        });
    });

    it('it should not update invalid data', (done) => {
      const user = new UserModel({
        email: 'jirilevy@seznam.cz',
        password: "654321"
      });
      user.save((err, u) => {
        chai.request(api)
          .put('/api/user/me')
          .set('Authorization', loggedUser.token)
          .send({password: ""})
          .end((err, res) => {
            res.should.have.status(422);
            done();
          });
      });
    });

  });


  /*
   * Test the /GET config user route
   */
  describe('/GET api config', () => {
    it('it should return config', (done) => {
      chai.request(api)
        .get('/api/user/me/apiConfig')
        .set('Authorization', loggedUser.token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('settings');
          done();
        });
    });
  });


  /*
   * Test the /POST config user route
   */
  describe('/POST api config', () => {
    it('it should update config', (done) => {
      chai.request(api)
        .post('/api/user/me/apiConfig')
        .set('Authorization', loggedUser.token)
        .send({fcmToken: "123456"})
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('settings');
          res.body.settings.should.have.property('fcmToken').eql("123456");
          done();
        });
    });
    it('it should not update config - validation error', (done) => {
      chai.request(api)
        .post('/api/user/me/apiConfig')
        .set('Authorization', loggedUser.token)
        .send({user: "0"})
        .end((err, res) => {
          res.should.have.status(422);
          done();
        });
    });



  });

});
