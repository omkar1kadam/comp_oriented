// ----------------------
// Load environment variables first
// ----------------------
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDB = require('./db/db');
const http = require('http');

// ----------------------
// Import routes
// ----------------------
const userRoutes = require('./routes/user.routes');
const sensorRoutes = require('./routes/sensor.routes');
const dataRoutes = require('./routes/data.routes');
const companyRoutes = require('./routes/company.routes');

// ----------------------
// Initialize Express
// ----------------------
const app = express();

// ----------------------
// Connect to MongoDB
// ----------------------
connectToDB();

// ----------------------
// Middleware
// ----------------------
app.use(cors({
  origin: 'http://localhost:3000', // change to your frontend URL in prod
  credentials: true
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
// API Routes
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
// Use process.env.PORT for Render, fallback to 5000 locally
const PORT = process.env.PORT || 5000;

// Optional: Use HTTP server if you later need socket support
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

// Export app for testing or future use
module.exports = app;
