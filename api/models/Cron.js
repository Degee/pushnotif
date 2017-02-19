import cron from 'node-cron';
import NotificationsModel from './Notifications.model';
import AppModel from './App.model';
import DeviceModel from './Device.model';
import SettingsModel from './Settings.model';
import { sendNotification } from './PushNotifications.service'
import moment from 'moment';

const getSettingsByApp = (app, cb) => {
  SettingsModel.findOne({user: app.user}).populate('user').exec((err, settings) => {
    if (err || !settings.user.isActive) cb(err);
    cb(null, settings);
  });
};

const runNotificationsChekcer = () => {
  console.log("Running cron for notifications check!");
  cron.schedule('* * * * *', () => {
    NotificationsModel.find({
      datetime: {
        $gte: moment().subtract(10, 'minutes').toDate(),
        $lt: moment().toDate()
      },
      isSent: false
    }).populate('app devices').exec((err, notifications) => {
      if(notifications.length) console.log(`Found ${notifications.length} to be sent ...`);
      notifications.map(item => {
        if (!item.devices.length) {
          Object.assign(item, {isSent: true}).save();
          return;
        }
        getSettingsByApp(item.app, (err, settings) => {
          const serverKey = settings.fcmToken;
          sendNotification(serverKey, item.devices.map(d => d.registeredId), {
            title: item.title,
            body: item.text
          }, (err) => {
            Object.assign(item, {isSent: true}).save();
          })
        });
      });
    });
  });
};

export default runNotificationsChekcer;