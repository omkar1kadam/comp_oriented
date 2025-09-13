const express = require('express');
const { Parser } = require('json2csv');
const router = express.Router();
const Reading = require('../models/Reading'); // adjust path to your model

router.get('/download-csv', async (req, res) => {
  try {
    const data = await Reading.find().lean();
    const fields = ['deviceId', 'timestamp', 'temperature', 'humidity']; // replace with your fields
    const parser = new Parser({ fields });
    const csv = parser.parse(data);

    res.header('Content-Type', 'text/csv');
    res.attachment('readings.csv');
    return res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error generating CSV');
  }
});

module.exports = router;
