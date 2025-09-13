const userModel = require('../models/user.model');

module.exports.CreateUser = async ({
  firstname,
  lastname,
  email,
  password,
  walletAddress
}) => {
  if (!firstname || !email || !password || !walletAddress) {
    throw new Error('Bro fill all the details');
  }

  // 🔎 Check if email exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) throw new Error("Bro this email already exists");

  // 🔎 Check if wallet exists
  const existingWallet = await userModel.findOne({ walletAddress });
  if (existingWallet) throw new Error("Bro this wallet address is already linked to another account");

  // 🔑 Hash password before saving
  const hashedPassword = await userModel.hashPassword(password);

  // ✅ Create user
  const user = new userModel({
    fullName: {
      firstName: firstname,
      lastName: lastname
    },
    email,
    password: hashedPassword,
    walletAddress
  });

  await user.save();
  return user;
};
