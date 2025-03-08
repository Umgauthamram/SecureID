// const { ethers } = require("hardhat");

// async function main() {
//     const FileStorage = await ethers.getContractFactory("FileStorage");
//     const fileStorage = await FileStorage.deploy();

//     console.log("Contract deployed to:", fileStorage.address);
// }

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });
const hre = require("hardhat");

async function main() {
  const FileStorage = await hre.ethers.getContractFactory("FileStorage");
  const fileStorage = await FileStorage.deploy();
  await fileStorage.waitForDeployment();

  console.log("FileStorage deployed to:", await fileStorage.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
    