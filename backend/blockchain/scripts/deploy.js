const hre = require("hardhat");

async function main() {
  const MyContract = await hre.ethers.getContractFactory("MyContract");
  const contract = await MyContract.deploy("Hello, Blockchain!");

  await contract.deployed();

  console.log(`Contract deployed at: ${contract.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
