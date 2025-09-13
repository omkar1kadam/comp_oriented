require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { task } = require("hardhat/config");

// ----------------------
// Custom Tasks
// ----------------------

// List accounts
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

// Check balance of default account
task("balance", "Prints the account balance", async (taskArgs, hre) => {
  const account = new hre.ethers.Wallet(process.env.PRIVATE_KEY, hre.ethers.provider);
  const balance = await hre.ethers.provider.getBalance(account.address);
  console.log(`${account.address} balance: ${hre.ethers.formatEther(balance)} AVAX`);
});

// ----------------------
// Hardhat Config
// ----------------------
module.exports = {
  solidity: "0.8.20",
  networks: {
    fuji: {
      url: process.env.FUJI_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {}, // local default network
  },
};
