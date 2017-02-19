import UserModel from './models/User.model';

const NOT_SECURED_ROUTES = [
  "/users",
  "/users/forgottenPassword",
  "/users/login",
  "/loadAuth",
];


const checkPermissions = (req, res, next) => {
  if (req.session.user) {
    req.user = req.session.user;
    next();
    return;
  }

  if (NOT_SECURED_ROUTES.indexOf(req.url) < 0 ) {
    const token = req.headers['authorization'];
    if (token) {
      UserModel.verifyToken(token, (err, user) => {
        if (err || !user) {
          return res.status(403).send({
            message: 'You are not allowed to access this endpoint. Invalid token!'
          });
        } else {
          // if everything is good
          req.user = user;
          req.session.user = user;
          next();
        }
      });
    } else {
      return res.status(403).send({
        message: 'You are not allowed to access this endpoint.'
      });

    }
  } else {
    next();
  }
};

export default checkPermissions;