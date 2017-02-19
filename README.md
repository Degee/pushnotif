# Pushnotif

## About

Push notification service that allows you to send Android and iOS notifications using [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/).

## Prerequests
Node > 5.6
MongoDB - Dont know, how to install MongoDB? Here is [manual] (https://docs.mongodb.com/v3.0/tutorial/)

## Installation

```bash
npm install
```

### Settings of MongoDB connection

Open file `src/config.js` then edit connection to MongoDB fields.

```bash
	...
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  db: 'mongodb://localhost/pushnotif', //HERE SET PROD OR DEV DB
  dbTest: 'mongodb://localhost/pushnotif_test', //HERE SET TEST DB
  app: {
    title: 'PushNotif',
	...
```

## Running Server API + client

```bash
npm run start
```

## Running only Server API

```bash
npm run start-prod-api
```

## Launch app
Open your browser on [localhost:8080](http://localhost:8080) and you should see login form. You can create new user. Then you need set in the setting page FCM token to be able to sent notifications.

Thats It!

---
If you have any questions or problems, feel free to contact me

– Jiri Levy, [@Degee_](https://twitter.com/Degee)
