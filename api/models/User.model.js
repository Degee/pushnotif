import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import uniqueValidator from 'mongoose-unique-validator';

// Defining user entity
const Schema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  token: {
    type: String,
    default: null
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Settings',
  }
});

Schema.pre('save', function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  if (!user.password) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

Schema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

Schema.methods.generateToken = function(cb) {
  const user = this;
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(`${user.password}${user.password}`, salt, function(err, hash) {
      user.token = hash;
      cb(user);
    });
  });
};

Schema.statics.verifyToken = function verifyToken(token, cb) {
  return this.findOne().where('token', token.trim()).exec(cb);
}

Schema.plugin(uniqueValidator);

//Exporting our model
const UserModel = mongoose.model('User', Schema);

export default UserModel;
