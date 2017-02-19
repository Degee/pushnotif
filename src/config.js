require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: process.env.APIHOST || 'localhost',
  apiPort: process.env.APIPORT,
  db: 'mongodb://localhost/pushnotif',
  dbTest: 'mongodb://localhost/pushnotif_test',
  app: {
    title: 'PushNotif',
    description: 'Client for push notification service.',
    head: {
      titleTemplate: '%s | PushNotif',
      meta: [
        {name: 'description', content: 'Client for push notification service.'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'PushNotif service'},
        {property: 'og:image', content: 'https://react-redux.herokuapp.com/logo.jpg'},
        {property: 'og:locale', content: 'en_US'},
        {property: 'og:title', content: 'PushNotif'},
        {property: 'og:description', content: 'Client for push notification service.'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@degee'},
        {property: 'og:creator', content: '@degee'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    }
  },

}, environment);
