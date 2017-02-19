let mongoose = require('mongoose');
import AppModel from '../../models/App.model';

/*
 * GET /applications route to retrieve all the applications.
 */
export const getApps = (req, res) => {
  let query = AppModel.find({user: req.user._id});
  query.exec((err, apps) => {
    if(err) res.send(err);
    res.json({applications: apps});
  });
}

/*
 * POST /applications to save a new application.
 */
export const postApps = (req, res) => {
  const newApplication = new AppModel(Object.assign({}, req.body, { user: req.user._id }));
  newApplication.save((err, app) => {
    if(err) {
      res.status(422).send(err);
    }
    else {
      Object.assign(app, {baseUri: `/application/${app._id}/devices`}).save((err, app) => {
        if(err) res.status(422).send(err);
        res.status(201).json({message: "Application successfully added!", app });
      });

    }
  });
}


/*
 * GET /application/:id route to retrieve a application given its id.
 */
export const getApp = (req, res) => {
  AppModel.findById(req.params.id, (err, app) => {
    if(err || (app.user.toString() != req.user._id)) {
      res.status(404).send({message: 'Application was not found!'});
      return;
    }
    res.json({app});
  });
}

/*
 * DELETE /application/:id to delete a application given its id.
 */
export const deleteApp = (req, res) => {
  AppModel.remove({_id : req.params.id, user: req.user._id}, (err, result) => {
    if (err)  {
      res.status(404).send({message: 'Application was not found!'});
      return;
    }
    res.json({ message: "Application successfully deleted!", result });
  });
}

/*
 * PUT /application/:id to update a a aplication given its id
 */
export const updateApp = (req, res) => {
  AppModel.findById({_id: req.params.id}, (err, app) => {
    if(!app || err || (app.user.toString() != req.user._id)) {
      res.status(404).send({message: 'Application was not found!'});
      return;
    }
    Object.assign(app, req.body).save((err, app) => {
      if(err) res.status(404).send({message: 'Application was not found!'});
      res.json({ message: 'Application updated!', app });
    });
  });
}