const userModel = require('../models/user.model');

module.exports.CreateUser = async ({
    firstname,lastname,email,password
}) => {
    if (!firstname || !email || !password) {
        throw new Error('Bro fill all the details');
    }
    const user = userModel({
        fullName: {
            firstname,
            lastname
        },
        email,
        password,
    })
    return user;
}