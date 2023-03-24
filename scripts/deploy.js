// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const DataProofNFTcontractFactory = await hre.ethers.getContractFactory(
    "DataProofNFT"
  );
  const DataProofNFTcontract = await DataProofNFTcontractFactory.deploy();
  await DataProofNFTcontract.deployed();
  console.log("the address : " + DataProofNFTcontract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
