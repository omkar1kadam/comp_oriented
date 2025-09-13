const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: true,
  },
  data: {
    temperature: Number,
    humidity: Number,
    mq135_raw: Number,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);
module.exports = SensorData;
