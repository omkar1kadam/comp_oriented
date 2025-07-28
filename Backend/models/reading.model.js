const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
  sensorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sensor',
    required: true
  },
  data: {
    temperature: Number,
    humidity: Number,
    mq135_raw: Number
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Reading', readingSchema);
