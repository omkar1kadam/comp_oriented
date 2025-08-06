require('dotenv').config(); // 💥 must be before using process.env
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectToDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const sensorRoutes = require('./routes/sensor.routes');
const dataRoutes = require('./routes/data.routes');



connectToDB();

app.use(cors({
  origin: 'https://plantera-omkar.vercel.app/', // your React frontend
  credentials: true               // allow cookies from frontend
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/',(req, res) => {
  res.send('Hello World!  try 4');
}); 

app.use('/users', userRoutes);
app.use('/sensors', sensorRoutes);
app.use('/data', dataRoutes);


module.exports = app;