const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'Bro, First name should be at least 3 characters long'],
        },
        lastName: {
            type: String,
            required: false,
            minlength: [3, 'Bro, Last name should be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        minlength: [5, 'Bro, the Email should be at least 5 characters long']
    },
    password: {
        type: String,
        required: true,
        select: false, // password won’t be returned by default in queries
    },
    walletAddress: {
        type: String,
        required: true, // 🆕 wallet required
        unique: true,   // one wallet per user
        match: [/^0x[a-fA-F0-9]{40}$/, 'Bro, enter a valid Ethereum wallet address'],
    },
    devices: {
        type: [String],
        default: [],
    },
    token_balance: {
        type: Number,
        default: 0,
    },
    joined_on: {
        type: Date,
        default: Date.now,
    },
    socketId: {
        type: String,
    }
});

// 🔑 Generate JWT
userSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// 🔑 Compare password
userSchema.methods.comparePassword = async function (Password) {
    return await bcrypt.compare(Password, this.password);
};

// 🔑 Hash password before saving
userSchema.statics.hashPassword = async function (Password) {
    return await bcrypt.hash(Password, 10);
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;
