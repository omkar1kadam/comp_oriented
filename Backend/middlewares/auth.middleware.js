const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const blackListToken = require('../models/blacklistToken.model');
// const captainModel = require('../models/captain.model');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log("📦 Received Token:", token);

    if (!token) {
        console.log("❌ No token provided");
        return res.status(401).json({ message: 'Bro Unauthorized (no token)' });
    }

    const isBlacklisted = await blackListToken.findOne({ token: token });
    if (isBlacklisted) {
        console.log("❌ Token is blacklisted");
        return res.status(401).json({ message: 'Bro Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("✅ Token decoded:", decoded);

        const user = await userModel.findById(decoded._id);
        if (!user) {
            console.log("❌ User not found in DB");
            return res.status(401).json({ message: 'Bro User not found' });
        }

        req.user = user;
        console.log("✅ Authenticated user:", user.email);

        return next();
    } catch (err) {
        console.log("❌ JWT verification failed:", err.message);
        return res.status(401).json({ message: "Bro Unauthorized (invalid token)" });
    }
};
