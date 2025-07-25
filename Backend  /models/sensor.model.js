const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
    minlength: [3,'Bro the device id should be at least 3 characters long'],
    unique: true,
  },
  ownerId: {
    type: String,
    required: true,
  },
  location:{
    type: String,
    required: true,
  },
  registered_on: {
    type: Date,
    default: Date.now,
  },
  lastActive: {
  type: Date,
  default: Date.now,
  },
  status: {
    type: Boolean,
  },
})

const SensorModel = mongoose.model("Sensor",sensorSchema);

module.exports = SensorModel;
