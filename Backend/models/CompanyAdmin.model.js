const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const companyAdminSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        minlength: [3, 'Bro, Company name should be at least 3 characters long'],
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true,
        match: [/^0x[a-fA-F0-9]{40}$/, 'Bro, enter a valid Ethereum wallet address'],
    },
    role: {
        type: String,
        enum: ["admin", "superadmin"],
        default: "admin",
    },
    employees: {
        type: [mongoose.Schema.Types.ObjectId], // references to employees
        ref: 'User',
        default: [],
    },
    created_on: {
        type: Date,
        default: Date.now,
    },
    socketId: {
        type: String,
    }
});

// Generate JWT
companyAdminSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, role: "company_admin" },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// Compare password
companyAdminSchema.methods.comparePassword = async function (Password) {
    return await bcrypt.compare(Password, this.password);
};

// Hash password
companyAdminSchema.statics.hashPassword = async function (Password) {
    return await bcrypt.hash(Password, 10);
};

const CompanyAdminModel = mongoose.model("CompanyAdmin", companyAdminSchema);
module.exports = CompanyAdminModel;
