import mongoose from 'mongoose';

// Defining user entity
const Schema = mongoose.Schema({
  datetime: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isDelivered: {
    type: Boolean,
    default: 0
  },
  notification: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Notification',
    required: true,
  },
  devices: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Device',
    required: true,
  }]
});

//Exporting our model
const SummaryModel = mongoose.model('Summary', Schema);

export default SummaryModel;
