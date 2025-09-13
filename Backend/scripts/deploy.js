import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  // Contract name must match the one in Counter.sol
  const Counter = await ethers.getContractFactory("Counter");
  const counter = await Counter.deploy();

  await counter.deployed();
  console.log("Counter deployed to:", counter.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
