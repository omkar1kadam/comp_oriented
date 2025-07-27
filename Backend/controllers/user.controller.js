const userModel = require('../models/user.model');
const SensorModel = require('../models/sensor.model');
const userService = require('../services/user.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName , email, password } = req.body;

    const hashedPassword = await userModel.hashPassword(password);

    const user = await userService.CreateUser({
        firstname: fullName.firstName,
        lastname: fullName.lastName,
        email,
        password: hashedPassword
    });

    const token = user.generateAuthToken();

    res.status(201).json({token, user })
}

module.exports.loginUser = async (req , res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const {email,password} = req.body;

    const user = await userModel.findOne({email}).select('+password');
    if(!user) {
        return res.status(401).json({message: "Bro Invalid credentials"})
    }

    const isMatch = await user.comparePassword(password);  // ✅ Correct
    if (!isMatch) {
        return res.status(401).json({message: "Bro Invalid credentials"});
    }

    const token = user.generateAuthToken();

    res.cookie('token',token);

    res.status(200).json({token , user});
}

module.exports.getUserProfile = async (req, res, next) => {
  try {
    const user = req.user; // comes from auth middleware

    // find all sensors where ownerId matches current user
    const sensors = await SensorModel.find({ ownerId: user._id }).select('deviceId location registered_on lastActive');

    res.status(200).json({
      name: `${user.fullName?.firstName || ''} ${user.fullName?.lastName || ''}`,
      email: user.email,
      devices: sensors // full device list!
    });

  } catch (error) {
    console.error("Bro error in fetching profile with devices:", error);
    res.status(500).json({ message: "Bro, something went wrong on the server 💥" });
  }
};


module.exports.logOutUser = async (req,res,next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];
    //  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6...
    await blackListTokenModel.create({token});
    res.status(200).json({message: "Bro Logged out!"})
}