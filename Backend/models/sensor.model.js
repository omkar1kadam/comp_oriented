const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: [true, 'Bro, deviceId is required'],
    minlength: [3, 'Bro the device id should be at least 3 characters long'],
    unique: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    }
  },
  registered_on: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
    type: Date,
    default: Date.now,
  }
  // 🚫 removed status field
});

const SensorModel = mongoose.model('Sensor', sensorSchema);
module.exports = SensorModel;
