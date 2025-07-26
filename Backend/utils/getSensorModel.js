const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  data: mongoose.Schema.Types.Mixed, // flexible structure
});

const modelCache = {}; // avoids recreating model

const getSensorModel = (deviceId) => {
  const collectionName = `sensor_data_${deviceId}`;

  if (modelCache[collectionName]) {
    return modelCache[collectionName];
  }

  const model = mongoose.model(collectionName, sensorDataSchema, collectionName);
  modelCache[collectionName] = model;
  return model;
};

module.exports = getSensorModel;
