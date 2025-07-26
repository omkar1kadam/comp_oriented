const express = require('express');
const router = express.Router();
const Sensor = require('../models/sensor.model');
const getSensorModel = require('../utils/getSensorModel'); // ✅

router.post('/submit', async (req, res) => {
  try {
    const { deviceId, data } = req.body;

    if (!deviceId || !data) {
      return res.status(400).json({ message: "Bro, send both deviceId and data" });
    }

    const sensor = await Sensor.findOne({ deviceId });
    if (!sensor) {
      return res.status(404).json({ message: "Bro, unknown sensor device" });
    }

    const SensorDataModel = getSensorModel(deviceId); // ✅ use dynamic model
    const newData = new SensorDataModel({ data });
    await newData.save();

    sensor.lastActive = new Date();
    await sensor.save();

    res.status(201).json({ message: "Data stored successfully bro" });
  } catch (err) {
    console.error("Error storing data:", err);
    res.status(500).json({ message: "Internal error bro", error: err.message });
  }
});

module.exports = router;
