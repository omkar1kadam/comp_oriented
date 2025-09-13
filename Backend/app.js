require('dotenv').config(); // 💥 Load env variables first
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDB = require('./db/db');

// Routes
const userRoutes = require('./routes/user.routes');
const sensorRoutes = require('./routes/sensor.routes');
const dataRoutes = require('./routes/data.routes');
const companyRoutes = require('./routes/company.routes');

const app = express();

// ----------------------
// Connect to MongoDB
// ----------------------
connectToDB();

// ----------------------
// Middleware
// ----------------------
app.use(cors({
  origin: 'http://localhost:3000', // your React frontend
  credentials: true // allow cookies
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ----------------------
// Test route
// ----------------------
app.get('/', (req, res) => {
  res.send('Hello World! Backend running ✅');
});

// ----------------------
// Routes
// ----------------------
app.use('/users', userRoutes);
app.use('/sensors', sensorRoutes);
app.use('/data', dataRoutes);
app.use('/company', companyRoutes);

// ----------------------
// Global Error Handler
// ----------------------
app.use((err, req, res, next) => {
  console.error('❌ Global Error:', err);
  res.status(500).json({ error: 'Server error bro 😅', details: err.message || err });
});

// ----------------------
// Start server
// ----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
