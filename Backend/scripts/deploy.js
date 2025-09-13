const hre = require("hardhat");

async function main() {
  const SensorToken = await hre.ethers.getContractFactory("SensorToken");
  const token = await SensorToken.deploy(); // deploy returns a Contract instance
  console.log("Deploying...");

  await token.waitForDeployment(); // <-- new syntax in Hardhat 2.26+
  console.log("SensorToken deployed to:", token.target); // token.target is the contract address
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
