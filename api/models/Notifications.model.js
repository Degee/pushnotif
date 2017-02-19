import mongoose from 'mongoose';

// Defining user entity
const Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    default: "none",
    required: true,
  },
  datetime: {
    type: Date,
    default: Date.now
  },
  isSent: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  repeatDays: {
    type: Number,
    default: 0
  },
  app: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'App',
    required: true,
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
  }]
});

//Exporting our model
const NotificationsModel = mongoose.model('Notifications', Schema);

export default NotificationsModel;
