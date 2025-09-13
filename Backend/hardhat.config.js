require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
const { task } = require("hardhat/config");

// ----------------------
// Custom Tasks
// ----------------------

// List accounts
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();
  accounts.forEach(account => console.log(account.address));
});

// Check balance of a wallet
task("balance", "Prints the balance of the default account", async (taskArgs, hre) => {
  if (!process.env.PRIVATE_KEY) {
    console.log("Error: PRIVATE_KEY not set in .env");
    return;
  }
  const account = new hre.ethers.Wallet(process.env.PRIVATE_KEY, hre.ethers.provider);
  const balance = await hre.ethers.provider.getBalance(account.address);
  console.log(`${account.address} balance: ${hre.ethers.formatEther(balance)} AVAX`);
});

// ----------------------
// Hardhat Config
// ----------------------
module.exports = {
  solidity: {
    compilers: [
      { version: "0.8.20" },
      { version: "0.8.28" }, // add this to handle other contracts like Counter.sol
    ],
  },
  networks: {
    fuji: {
      url: process.env.FUJI_RPC_URL || "https://api.avax-test.network/ext/bc/C/rpc",
      accounts: process.env.PRIVATE_KEY ? [process.env.PRIVATE_KEY] : [],
    },
    hardhat: {}, // local network
  },
  etherscan: {
    apiKey: process.env.SNOWTRACE_API_KEY || "", // optional: verify contracts on Snowtrace
  },
};
