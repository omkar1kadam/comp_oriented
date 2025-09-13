const express = require('express');
const router = express.Router();
const Sensor = require('../models/sensor.model');
const authMiddleware = require('../middlewares/auth.middleware');
const sensorModel = require('../models/sensor.model');
const userModel = require('../models/user.model');
const Reading = require('../models/reading.model');
const mongoose = require('mongoose');  
const { rewardSensor } = require('../reward'); // <-- add this
const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

// ----------------------
// Register new sensor
// ----------------------
router.post('/register', async (req, res) => {
  try {
    const { deviceId, location, email } = req.body;

    if (!deviceId || !location?.lat || !location?.lng || !email) {
      return res.status(400).json({ error: 'Send deviceId, lat/lng, and email bro' });
    }

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found bro' });

    const existing = await Sensor.findOne({ deviceId });
    if (existing) return res.status(409).json({ error: 'Sensor already exists bro' });

    const newSensor = new Sensor({ deviceId, ownerId: user._id, location });
    await newSensor.save();

    await userModel.findByIdAndUpdate(
      user._id,
      { $push: { devices: newSensor._id } },
      { new: true }
    );

    res.status(201).json({ message: 'Sensor registered successfully', sensor: newSensor });
  } catch (err) {
    console.error('❌ Error registering sensor:', err);
    res.status(500).json({ error: 'Server error, try again later bro' });
  }
});

// ----------------------
// Fetch all sensors for a user
// ----------------------
router.get('/all_sensors', authMiddleware.authUser, async (req, res) => {
  try {
    const sensors = await sensorModel.find({ ownerId: req.user._id }).populate('ownerId', 'email');
    res.json({ sensors });
  } catch (err) {
    console.error("❌ Error fetching sensors:", err);
    res.status(500).json({ message: "Bro failed to fetch sensors", error: err.message || err });
  }
});

// ----------------------
// Get sensor by ID
// ----------------------
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

// ----------------------
// Get readings (centralized)
// ----------------------
router.get('/:id/readings', authMiddleware.authUser, async (req, res) => {
  try {
    const readings = await Reading.find({ sensorId: req.params.id }).sort({ timestamp: -1 });
    res.json({ readings });
  } catch (err) {
    console.error("❌ Error fetching readings:", err);
    res.status(500).json({ message: "Bro failed to get readings", error: err.message || err });
  }
});

// ----------------------
// Get raw readings from per-device collection
// ----------------------
router.get('/:deviceId/data', async (req, res) => {
  try {
    const collectionName = `sensor_data_${req.params.deviceId}`;
    const SensorData = mongoose.connection.collection(collectionName);

    const { fromDate, toDate } = req.query;
    const query = {};

    if (fromDate && toDate) {
      query.timestamp = { $gte: new Date(fromDate), $lte: new Date(toDate) };
    } else {
      const today = new Date();
      query.timestamp = {
        $gte: new Date(today.setHours(0, 0, 0, 0)),
        $lte: new Date(today.setHours(23, 59, 59, 999))
      };
    }

    const readings = await SensorData.find(query).sort({ timestamp: -1 }).toArray();

    res.json({ readings });
  } catch (err) {
    console.error('Error fetching sensor data:', err);
    res.status(500).json({ error: 'Failed to fetch sensor data' });
  }
});

// ----------------------
// POST route for sensor to send data & get token reward
// ----------------------
router.post('/:deviceId/send_data', async (req, res) => {
  try {
    const { deviceId } = req.params;
    const { wallet, data } = req.body;

    if (!wallet || !data) {
      return res.status(400).json({ error: "Send both wallet and data bro" });
    }

    // ✅ Save to per-device collection
    const collectionName = `sensor_data_${deviceId}`;
    const SensorData = mongoose.connection.collection(collectionName);
    await SensorData.insertOne({ ...data, timestamp: new Date() });

    // ✅ Reward the sensor wallet (1 token per block, adjust as needed)
    await rewardSensor(wallet, 1);

    res.json({ status: "Sensor data saved & reward sent" });
  } catch (err) {
    console.error("❌ Error sending data / reward:", err);
    res.status(500).json({ error: "Failed to save data or send reward" });
  }
});

router.get('/balance/:wallet', async (req, res) => {
  try {
    const wallet = req.params.wallet;

    // Connect to Fuji RPC
    const provider = new ethers.JsonRpcProvider(process.env.FUJI_RPC_URL);

    // Load contract ABI
    const abi = JSON.parse(fs.readFileSync('artifacts/contracts/SensorToken.sol/SensorToken.json')).abi;

    // Connect contract
    const contract = new ethers.Contract(process.env.SENSORTOKEN_ADDRESS, abi, provider);

    // Get balance
    const balance = await contract.balanceOf(wallet);

    res.json({
      wallet,
      balance: ethers.formatUnits(balance, 18) // convert from wei to tokens
    });
  } catch (err) {
    console.error("❌ Error fetching token balance:", err);
    res.status(500).json({ error: 'Failed to get token balance', details: err.message });
  }
});


router.get('/owner/balance', async (req, res) => {
  try {
    // Owner wallet from .env
    const ownerWallet = process.env.OWNER_PRIVATE_KEY; 

    if (!ownerWallet) return res.status(400).json({ error: "Owner wallet not set in .env" });

    // Connect to Fuji RPC
    const provider = new ethers.JsonRpcProvider(process.env.FUJI_RPC_URL);

    // Load contract ABI
    const abi = JSON.parse(fs.readFileSync('artifacts/contracts/SensorToken.sol/SensorToken.json')).abi;

    // Connect contract
    const contract = new ethers.Contract(process.env.SENSORTOKEN_ADDRESS, abi, provider);

    // Create wallet instance from private key (to get address)
    const wallet = new ethers.Wallet(ownerWallet, provider);

    // Get balance
    const balance = await contract.balanceOf(wallet.address);

    res.json({
      wallet: wallet.address,
      balance: ethers.formatUnits(balance, 18)
    });
  } catch (err) {
    console.error("❌ Error fetching owner balance:", err);
    res.status(500).json({ error: 'Failed to get owner balance', details: err.message });
  }
});


module.exports = router;
