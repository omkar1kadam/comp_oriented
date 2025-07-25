const mongoose = require("mongoose")

const blackListTokenSchema = new moongoose.Schema({
    token: {type: String, required : true, unique: true},
    createdAt: {type: Date,default: Date.now, expires: 86400} // in 24h
});

module.exports = moongoose.model("BlackListToken",blackListTokenSchema);