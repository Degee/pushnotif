let mongoose = require('mongoose');
import NotificationsModel from '../../models/Notifications.model';
import AppModel from '../../models/App.model';
import SummaryModel from '../../models/Summary.model';
import moment from 'moment';

export const getNotifications = (req, res) => {
  AppModel.findById(req.params.id, (err, app) => {
    if(err || !app || (app.user.toString() != req.user._id)) {
      res.status(404).json({message: `No notifications found for application with id #${req.params.id}`});
      return;
    }
    let query = NotificationsModel.find({app: app._id}).populate('app devices');
    query.exec((err, not) => {
      if(err) res.send(err);
      res.json({notifications: not});
    });
  });
}

export const postNotifications = (req, res) => {
  AppModel.findById(req.params.id, (err, app) => {
    if(err || !app || (app.user.toString() != req.user._id)) {
      res.status(404).json({message: `Application with id #${req.params.id} not found!`});
      return;
    }

    const notification = new NotificationsModel(Object.assign({}, req.body, { app: req.params.id }));
    if (req.body.datetime) {
      notification.datetime = moment(req.body.datetime);
    }
    notification.save((err, notification) => {
      if(err) {
          res.status(422).send(err);
      }
      else {
        res.status(201).json({message: "Notification successfully added!", notification });
      }
    });
  });

}

export const getNotification = (req, res) => {
  AppModel.findById(req.params.appId, (err, app) => {
    if(err || !app || (app.user.toString() != req.user._id)) {
      res.status(404).json({message: `Application with id #${req.params.appId} not found!`});
      return;
    }

    NotificationsModel.findById(req.params.id, (err, item) => {
      if(err || (item.app.toString() != app._id)) {
        res.status(404).send(err);
        return;
      }
      res.json({notification: item});
    });
  });
}

export const deleteNotification = (req, res) => {
  AppModel.findById(req.params.appId, (err, app) => {
    if(err || !app || (app.user.toString() != req.user._id)) {
      res.status(404).json({message: `Application with id #${req.params.appId} not found!`});
      return;
    }

    NotificationsModel.remove({_id : req.params.id, app: app._id}, (err, result) => {
      if (err)  {
        res.status(404).send({message: `Notification with id #${req.params.id} not found!`});
        return;
      }
      res.json({ message: "Notification successfully deleted!", result });
    });

  });
}


export const updateNotification = (req, res) => {
  AppModel.findById(req.params.appId, (err, app) => {
    if(err || !app || (app.user.toString() != req.user._id)) {
      res.status(404).json({message: `Application with id #${req.params.appId} not found!`});
      return;
    }

    NotificationsModel.findById({_id: req.params.id}, (err, item) => {
      if(!app || err || (item.app.toString() != app._id)) {
        res.status(404).send({message: 'Notification was not found!'});
        return;
      }
      if (req.body.datetime) {
        req.body.datetime = moment(req.body.datetime);
      }
      Object.assign(item, req.body).save((err, notification) => {
        if(err) {
          res.status(422).send(err);
          return;
        }
        res.json({ message: 'Notification updated!', notification });
      });
    });
  });
}

export const getSummary = (req, res) => {
  AppModel.find({user: req.user._id}).exec((err, apps) => {
    const appIds = apps.map((item) => item._id);
    let query = NotificationsModel.find({"app": appIds}).populate('app devices');;
    query.exec((err, not) => {
      if(err) res.send(err);
      res.json({notifications: not});
    });
  });
}