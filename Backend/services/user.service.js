const userModel = require('../models/user.model');

module.exports.CreateUser = async ({
  firstname,
  lastname,
  email,
  password
}) => {
  if (!firstname || !email || !password) {
    throw new Error('Bro fill all the details');
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("Bro this email already exists");

  const user = new userModel({
    fullName: {
      firstName: firstname,
      lastName: lastname
    },
    email,
    password
  });

  await user.save();
  return user;
};


