const mongoose = require('mongoose');

function connectToDb() {
    mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log("Bro the database the connected successfully");
    }).catch(err => {
        console.log("ISSUE!!!! Bro the database is not connected");
    })
}

module.exports = connectToDb;