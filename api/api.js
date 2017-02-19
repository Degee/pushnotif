import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import config from '../src/config';

import router from './routes';

import http from 'http';
import morgan from 'morgan';
import mongoose from 'mongoose';

import runNotificationsChecker from './models/Cron';
runNotificationsChecker();

const app = express();

const server = new http.Server(app);


app.use(session({
  secret: 'react and redux rule!!!!',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}));

process.env.NODE_ENV ===  'development' && app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

//Connecting MongoDB using mongoose to our application
mongoose.Promise = global.Promise;
process.env.NODE_ENV === 'test' ? mongoose.connect(config.dbTest) : mongoose.connect(config.db);

//This callback will be triggered once the connection is successfully established to MongoDB
mongoose.connection.on('connected', function () {
  process.env.NODE_ENV === 'development' &&
  console.log('Mongoose default connection open to ' + config.db);
});

// Our application router
process.env.NODE_ENV ===  'test' ?
  app.use('/api/', router) :
  app.use(router);

if (config.apiPort) {
  app.listen(config.apiPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('----\n==> 🌎  API is running on port %s', config.apiPort);
    console.info('==> 💻  Send requests to http://%s:%s', config.apiHost, config.apiPort);
  });

} else {
  process.env.NODE_ENV === 'development' &&
  console.error('==>     ERROR: No PORT environment variable has been specified');
}

export default app;