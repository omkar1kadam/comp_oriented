// controllers/user.controller.js
const userModel = require('../models/user.model');
const SensorModel = require('../models/sensor.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model.js');

module.exports.registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password } = req.body;
  const hashedPassword = await userModel.hashPassword(password);

  const user = await userService.CreateUser({
    firstname: fullName.firstName,
    lastname: fullName.lastName,
    email,
    password: hashedPassword
  });

  const token = user.generateAuthToken();

  // ✅ Secure cookie settings for cross-origin
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });

  res.status(201).json({ token, user });
};

module.exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(401).json({ message: "Bro Invalid credentials" });
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Bro Invalid credentials" });
  }

  const token = user.generateAuthToken();

  // ✅ Secure cookie settings for cross-origin
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ token, user });
};

module.exports.getUserProfile = async (req, res, next) => {
  try {
    const user = req.user;

    const sensors = await SensorModel.find({ ownerId: user._id }).select(
      "deviceId location registered_on lastActive"
    );

    res.status(200).json({
      name: `${user.fullName?.firstName || ""} ${user.fullName?.lastName || ""}`,
      email: user.email,
      devices: sensors
    });
  } catch (error) {
    console.error("Bro error in fetching profile with devices:", error);
    res.status(500).json({ message: "Bro, something went wrong on the server 💥" });
  }
};

module.exports.logOutUser = async (req, res, next) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (token) {
    await blackListTokenModel.create({ token });
  }

  res.status(200).json({ message: "Bro Logged out!" });
};
