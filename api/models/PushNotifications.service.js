import FCM from 'fcm-node';

export const checkValidToken = (token, cb) => {
  const fcm = new FCM(token);
  fcm.send({to: ''}, function(err, response){
    err ? cb(err) : cb(null, response)
  });
}

export const sendNotification = (serverKey, target, data, cb = () => {}) => {
  const fcm = new FCM(serverKey);
  const message = {
    registration_ids: target,
    collapse_key: 'pushnotif',
    notification: data,
  };
  fcm.send(message, function(err, response){
    err ? cb(err, response) : cb(null, response);
  });
};