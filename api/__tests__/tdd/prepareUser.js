import { mongoose } from 'mongoose';
import UserModel from '../../models/User.model';
import api from '../../api';

//Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

let loggedUser = {
  email: "te@st.com",
  password: 'supersecretpassword'
};

//Our parent block
const prepareUser = (callback) => {
  UserModel.remove({}, (err) => {
    chai.request(api)
      .post('/api/users')
      .send(loggedUser)
      .end((er, res) => {
        callback(res.body.user);
      });
  });
};

export default prepareUser;