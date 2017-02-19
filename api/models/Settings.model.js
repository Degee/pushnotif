import mongoose from 'mongoose';

// Defining user entity
const Schema = mongoose.Schema({
  fcmToken: {
    type: String,
    default: '',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

//Exporting our model
const SettingsModel = mongoose.model('Settings', Schema);

export default SettingsModel;