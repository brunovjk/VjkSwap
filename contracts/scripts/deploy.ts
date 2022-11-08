import { ethers } from "hardhat";

async function main() {
  const VjkSwap = await ethers.getContractFactory("VjkSwap");
  const VjkSwapContract = await VjkSwap.deploy(
    "0xE592427A0AEce92De3Edee1F18E0157C05861564"
  );

  await VjkSwapContract.deployed();

  console.log("VjkSwap Contract Address:", VjkSwapContract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
