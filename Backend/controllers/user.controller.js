// controllers/user.controller.js
const userModel = require('../models/user.model');
const SensorModel = require('../models/sensor.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model.js');

// 🆕 Register User
module.exports.registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password, walletAddress } = req.body;

    const user = await userService.CreateUser({
      firstname: fullName.firstName,
      lastname: fullName.lastName,
      email,
      password,        // 👈 pass raw password, service will hash it
      walletAddress,   // 🆕 added wallet
    });

    const token = user.generateAuthToken();

    // ✅ Secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      message: "Bro registered successfully 🚀",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        walletAddress: user.walletAddress,
      },
    });
  } catch (error) {
    console.error("❌ Register error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

// 🆕 Login User
module.exports.loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, walletAddress } = req.body;

    // Allow login by email OR wallet
    const query = email ? { email } : { walletAddress };
    const user = await userModel.findOne(query).select("+password");

    if (!user) {
      return res.status(401).json({ message: "Bro Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Bro Invalid credentials" });
    }

    const token = user.generateAuthToken();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Bro logged in 🚀",
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        walletAddress: user.walletAddress,
      },
    });
  } catch (error) {
    console.error("❌ Login error:", error.message);
    res.status(500).json({ message: "Bro something went wrong 💥" });
  }
};

// 🆕 Get User Profile + Devices
module.exports.getUserProfile = async (req, res) => {
  try {
    const user = req.user;

    const sensors = await SensorModel.find({ ownerId: user._id }).select(
      "deviceId location registered_on lastActive"
    );

    res.status(200).json({
      name: `${user.fullName?.firstName || ""} ${user.fullName?.lastName || ""}`,
      email: user.email,
      walletAddress: user.walletAddress, // 🆕 include wallet
      devices: sensors,
    });
  } catch (error) {
    console.error("Bro error in fetching profile with devices:", error);
    res.status(500).json({ message: "Bro, something went wrong on the server 💥" });
  }
};

// 🆕 Logout User
module.exports.logOutUser = async (req, res) => {
  try {
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
  } catch (error) {
    console.error("❌ Logout error:", error.message);
    res.status(500).json({ message: "Bro something went wrong 💥" });
  }
};
