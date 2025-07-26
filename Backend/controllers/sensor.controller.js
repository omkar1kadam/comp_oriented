// controllers/sensor.controller.js
const Sensor = require('../models/sensor.model');

module.exports.registerSensor = async (req, res) => {
  try {
    const { deviceId, location } = req.body;

    // Check if sensor already exists
    const existing = await Sensor.findOne({ deviceId });
    if (existing) {
      return res.status(400).json({ message: "Bro, sensor already exists" });
    }

    const sensor = new Sensor({
      deviceId,
      location,
      ownerId: req.user._id
    });

    await sensor.save();
    return res.status(201).json({ message: "Bro sensor registered successfully", sensor });
  } catch (err) {
    return res.status(500).json({ message: "Server issue bro", error: err.message });
  }
};
