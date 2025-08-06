const express = require('express');
const router = express.Router();
const Sensor = require('../models/sensor.model');
const authMiddleware = require('../middlewares/auth.middleware');
const sensorModel = require('../models/sensor.model');
const userModel = require('../models/user.model');
const Reading = require('../models/reading.model');
const mongoose = require('mongoose');  // 🔥 Don't forget this if not globally imported

// ✅ Register new sensor
router.post('/register', async (req, res) => {
  try {
    const { deviceId, location, email } = req.body;

    console.log("📥 Incoming body:", req.body);

    if (!deviceId || !location?.lat || !location?.lng || !email) {
      return res.status(400).json({ error: 'Send deviceId, lat/lng, and email bro' });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      console.log("❌ No user with email:", email);
      return res.status(404).json({ error: 'User not found bro' });
    }

    const existing = await Sensor.findOne({ deviceId });
    if (existing) {
      return res.status(409).json({ error: 'Sensor already exists bro' });
    }

    const newSensor = new Sensor({
      deviceId,
      ownerId: user._id,
      location
    });

    await newSensor.save();

    await userModel.findByIdAndUpdate(
      user._id,
      { $push: { devices: newSensor._id } },
      { new: true }
    );

    console.log("✅ Sensor registered:", newSensor);

    res.status(201).json({ message: 'Sensor registered successfully', sensor: newSensor });
  } catch (err) {
    console.error('❌ Error registering sensor:', err);
    res.status(500).json({ error: 'Server error, try again later bro' });
  }
});




// ✅ Fetch all sensors for a user
router.get('/all_sensors', authMiddleware.authUser, async (req, res) => {
  try {
    const sensors = await sensorModel
      .find({ ownerId: req.user._id })
      .populate('ownerId', 'email');

    res.json({ sensors });
  } catch (err) {
    console.error("❌ Error while fetching sensors:", err);
    res.status(500).json({ message: "Bro failed to fetch sensors", error: err.message || err });
  }
});

// ✅ Get sensor by ID
router.get('/:id', authMiddleware.authUser, async (req, res) => {
  try {
    const sensor = await Sensor.findById(req.params.id).populate('ownerId', 'email');
    if (!sensor) return res.status(404).json({ message: "Sensor not found bro 😢" });

    res.json(sensor);
  } catch (err) {
    console.error("❌ Error fetching sensor by ID:", err);
    res.status(500).json({ message: "Internal server error", error: err.message || err });
  }
});

// ✅ Get readings (from centralized Reading model)
router.get('/:id/readings', authMiddleware.authUser, async (req, res) => {
  try {
    const readings = await Reading.find({ sensorId: req.params.id }).sort({ timestamp: -1 });
    res.json({ readings });
  } catch (err) {
    console.error("❌ Error fetching sensor readings:", err);
    res.status(500).json({ message: "Bro failed to get readings", error: err.message || err });
  }
});

// ✅ Get raw readings from per-device collection (frontend uses this)
router.get('/:deviceId/data', async (req, res) => {
  try {
    const collectionName = `sensor_data_${req.params.deviceId}`;
    const SensorData = mongoose.connection.collection(collectionName);

    const readings = await SensorData
      .find({})
      .sort({ timestamp: -1 })  // ✅ This is the fix that solved your UI issue
      .toArray();

    res.json({ readings });
  } catch (err) {
    console.error('Error fetching sensor data:', err);
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
});

module.exports = router;
