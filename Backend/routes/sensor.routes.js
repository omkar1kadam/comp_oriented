const express = require('express');
const router = express.Router();
const Sensor = require('../models/sensor.model');
const authMiddleware = require('../middlewares/auth.middleware');
const sensorModel = require('../models/sensor.model');
const userModel = require('../models/user.model');

// Register new sensor
router.post('/register', authMiddleware.authUser, async (req, res) => {
  console.log("Route hit");
  try {
    const { deviceId, location } = req.body;

    if (!deviceId || !location?.lat || !location?.lng) {
      return res.status(400).json({ error: 'Bro, send deviceId and full location (lat/lng)' });
    }

    const existing = await Sensor.findOne({ deviceId });
    if (existing) {
      return res.status(409).json({ error: 'Sensor with this deviceId already exists bro' });
    }

    const newSensor = new Sensor({
      deviceId,
      ownerId: req.user._id,
      location
    });

    await newSensor.save();

    // 🔥 THIS LINE LINKS SENSOR TO USER
    await userModel.findByIdAndUpdate(
      req.user._id,
      { $push: { devices: newSensor._id } },
      { new: true }
    );

    res.status(201).json({ message: 'Sensor registered successfully', sensor: newSensor });
  } catch (err) {
    console.error('Error registering sensor:', err);
    res.status(500).json({ error: 'Bro, something went wrong on the server' });
  }
});


router.get('/all_sensors', authMiddleware.authUser, async (req, res) => {
  try {
    const user = req.user;
    console.log("🔐 Logged-in user ID:", user._id);

    // 🧠 Populate email from the User collection
    const sensors = await sensorModel
      .find({ ownerId: user._id })
      .populate('ownerId', 'email');

    res.json({ sensors });
  } catch (err) {
    console.error("❌ Error while fetching sensors:", err);
    res.status(500).json({ message: "Bro failed to fetch sensors", error: err.message || err });
  }
});





module.exports = router;
