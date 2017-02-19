let mongoose = require('mongoose');
import UsersModel from '../../models/User.model';
import SettingsModel from '../../models/Settings.model';
import sendMail from '../../models/Mailer';

/*
 * POST /users route to register new user.
 */
export const postUsers = (req, res) => {
  const user = new UsersModel(req.body);
  user.generateToken((user) => {
    user.save((err, item) => {
      if(err) {
        if (err.errors.email &&
          err.errors.email.kind == 'unique') {
          res.status(409).json({message: "User already exist!"});
        } else {
          res.status(422).send(err);
        }
      }
      else {
        const settings = SettingsModel({user: item._id});
        settings.save((err, set) => {
          req.session.user = user;
          res.status(201).json({message: "User successfully added!", user: item, settings: set, token: user.token });
        })
      }
    });
  });
}

export const login = (req, res) => {
  UsersModel.findOne({email: req.body.email}).populate('settings').exec((err, user) => {
    if (user) {
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          user.generateToken((user) => {
            UsersModel.update({ _id: user._id}, {token: user.token}, (err, item) => {
              if(err) {
                res.status(422).send(err);
                return;
              }
              req.session.user = user;
              res.status(200).json({message: "User successfully logged in!", user: user, token: user.token });
            });
          });
        } else {
          res.status(401).json({message: "Authorization failed! Bad password!"});
        }
      })
    } else {
      res.status(401).json({message: "Authorization failed! Bad email!"});
    }
  });
}



export const forgottenPassword = (req, res) => {
  const newPass = Math.random().toString(36).substring(7);
  UsersModel.findOne({email: req.body.email}).exec((err, user) => {
    if (user) {
      const newPass = Math.random().toString(36).substring(7);
      Object.assign(user, {password: newPass}).save((err, item) => {
        sendMail({
          to: item.email,
          subject: "Forgotten password",
          html: `Hi there, <br> you was requested for a forgotten password.<br> There is a new one: <b>${newPass}</b><br><br>Enjoy our service :-)`
        }, (err, info) => {
          if (err) {
            res.status(500).json(err);
            return;
          }
          res.status(200).json({message: "Password successfully renewed! Check your email."});
        })
      })
    } else {
      res.status(404).json({message: "Email not found!"});
    }
  });
}


export const logout = (req, res) => {
  UsersModel.findOne({_id: req.user._id}).exec((err, user) => {
    if (user) {
      Object.assign(user, {token: ''}).save((err, item) => {
        if (err) {
          res.status(500).json(err);
          return;
        }
        req.session.destroy(() => {
          req.session = null;
        });
        res.status(205).json({message: "User was logged out!"});
      })
    } else {
      res.status(403).json({message: "Forbidden!!!"});
    }
  });
}



export const updateUser = (req, res) => {
  UsersModel.findById({_id: req.user._id}, (err, user) => {
    if(!user || err) {
      res.status(422).send({message: 'User was not found!'});
      return;
    }

    if (req.body.oldPassword || req.body.password) {
      user.comparePassword(req.body.oldPassword, (err, isMatch) => {
        if (isMatch && req.body.password) {
          Object.assign(user, req.body).save((err, user) => {
            if (err) {
              res.status(422).send(err);
              return;
            }
            req.session.user = user;
            res.json({message: 'User was updated!', user});
          });
        } else {
          res.status(422).send({message: "Old password is wrong or new is not set!"});
        }
      });
    } else {
      Object.assign(user, req.body).save((err, user) => {
        if(err) {
          res.status(422).send(err);
          return;
        }
        req.session.user = user;
        res.json({ message: 'User was updated!', user });
      });
    }
  });
}

export const getApiConfig = (req, res) => {
  SettingsModel.findOne({user: req.user._id}).exec((err, settings) => {
    if(err) {
      res.status(404).send(err);
      return;
    }
    res.json({settings});
  });
}

export const postApiConfig = (req, res) => {
  SettingsModel.findOne({user: req.user._id}).exec((err, settings) => {
    if(err) {
      res.status(404).send(err);
      return;
    }
    Object.assign(settings, req.body).save((err, saved) => {
      if (err) {
        res.status(422).send(err);
        return;
      }
      res.json({settings: saved});
    })
  });

}



