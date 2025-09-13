const { ethers } = require("ethers");
const fs = require("fs");
require("dotenv").config();

// Connect to Fuji
const provider = new ethers.JsonRpcProvider(process.env.FUJI_RPC_URL);
const ownerWallet = new ethers.Wallet(process.env.OWNER_PRIVATE_KEY, provider);

// Load contract ABI
const abi = JSON.parse(fs.readFileSync("artifacts/contracts/SensorToken.sol/SensorToken.json")).abi;
const contract = new ethers.Contract(process.env.SENSORTOKEN_ADDRESS, abi, ownerWallet);

// Function to reward a sensor wallet
async function rewardSensor(sensorWallet, amount) {
    try {
        const tx = await contract.mintReward(sensorWallet, amount);
        console.log("Transaction sent:", tx.hash);
        await tx.wait();
        console.log("Reward sent successfully!");
    } catch (err) {
        console.error("Error sending reward:", err);
    }
}

module.exports = { rewardSensor };
