import mongoose from 'mongoose';

// Defining application entity
const Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  baseUri: {
    type: String,
    default: "none"
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
  }]
});

//Exporting our model
const AppModel = mongoose.model('App', Schema);

export default AppModel;
