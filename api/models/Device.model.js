import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Defining user entity
const Schema = mongoose.Schema({
  registeredId: {
    type: String,
    unique: true,
  },
  info: {
    type: String,
    default: ""
  },
  registeredAt: {
    type: Date,
    default: Date.now
  },
  app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App',
    required: true,
  }
});


Schema.plugin(uniqueValidator);

//Exporting our model
const DeviceModel = mongoose.model('Device', Schema);

export default DeviceModel;
