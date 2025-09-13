const express = require("express");
const router = express.Router();
const SensorData = require("../models/SensorData");

// Dynamic company route
router.get("/:company/data", async (req, res) => {
  try {
    const { company } = req.params;
    console.log(`API called by: ${company}`);

    // Fetch latest sensor record
    const latestData = await SensorData.find().sort({ _id: -1 }).limit(1);

    res.json({
      company,
      data: latestData,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
