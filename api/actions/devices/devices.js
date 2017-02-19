import DeviceModel from '../../models/Device.model';
import AppModel from '../../models/App.model';

export const getDevices = (req, res) => {
  AppModel.find({user: req.user._id}).exec((err, apps) => {
    const appIds = apps.map((item) => item._id);
    let query = DeviceModel.find({app: appIds}).populate('app');
    query.exec((err, items) => {
      if(err) res.send(err);
      res.json({devices: items});
    });
  })
}

export const getDevicesByApplication = (req, res) => {
  AppModel.findById(req.params.id, (err, app) => {
    if(err || !app || (app.user.toString() != req.user._id)) {
      res.status(404).json({message: `No devices found for application with id #${req.params.id}`});
      return;
    }
    DeviceModel.find({app: app._id}).populate('app').exec((err, items) => {
      if(err) res.send(err);
      res.json({devices: items});

    });
  });
}


export const postDevice = (req, res) => {
  AppModel.findById(req.params.id, (err, app) => {
    if(err || !app) {
      res.status(404).json({message: `Application with id #${req.params.id} not found!`});
      return;
    }

    const device = new DeviceModel(Object.assign(
      {},
      { registeredId: req.body.token ? req.body.token : req.body.registeredId },
      { app: req.params.id },
      { info: req.body.toString() }
    ));
    device.save((err, device) => {
      if(err) {
        if (err.errors.registeredId &&
          err.errors.registeredId.kind == 'unique') {
          res.status(409).json({message: 'Device already registered!'});
        } else {
          console.log(err);
          res.status(422).send(err);
        }
      }
      else {
        res.status(201).json({message: "Device successfully added!", device });
      }
    });
  });
}

export const deleteDevice = (req, res) => {
  AppModel.findById(req.params.appId, (err, app) => {
    if(err || !app) {
      res.status(404).json({message: `Application with id #${req.params.appId} not found!`});
      return;
    }

    DeviceModel.remove({_id : req.params.id, app: app._id}, (err, result) => {
      if (err)  {
        DeviceModel.find({registeredId : req.params.id, app: app._id}).remove((err, result) => {
          console.log(err || (result.result.n < 1), err, result.result.n < 1);
          if (err || (result.result.n < 1))  {
            res.status(404).send({message: `Device with id #${req.params.id} not found!`});
          } else {
            res.json({ message: "Device successfully deleted!", result });
          }
        });
      } else {
        res.json({ message: "Device successfully deleted!", result });
      }
    });

  });
}

