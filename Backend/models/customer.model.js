const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const customerSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, 'Bro, First name should be at least 3 characters long'],
        },
        lastName: {
            type: String,
            minlength: [3, 'Bro, Last name should be at least 3 characters long'],
        }
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
    phone: {
        type: String,
        required: true,
        match: [/^[0-9]{10}$/, 'Bro, enter a valid 10-digit phone number'],
    },
    address: {
        type: String,
        required: false,
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId], // Store order references
        ref: 'Order',
        default: [],
    },
    joined_on: {
        type: Date,
        default: Date.now,
    }
});

// Generate JWT
customerSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { _id: this._id, role: "customer" },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

// Compare password
customerSchema.methods.comparePassword = async function (Password) {
    return await bcrypt.compare(Password, this.password);
};

// Hash password
customerSchema.statics.hashPassword = async function (Password) {
    return await bcrypt.hash(Password, 10);
};

const CustomerModel = mongoose.model("Customer", customerSchema);
module.exports = CustomerModel;
