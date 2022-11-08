import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { ercAbi } from "../abis";

const WETH_ADDRESS_GOLERI = "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6"; //Goerli
const LINK_ADDRESS_GOLERI = "0x326C977E6efc84E512bB9C30f76E30c160eD06FB"; // Goerli

const WETH_ADDRESS_MAINNET = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; //Mainnet
const DAI_ADDRESS_MAINNET = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; //Mainnet

const SwapRouterAddress = "0xE592427A0AEce92De3Edee1F18E0157C05861564"; // Mainnet + Goleri

describe("VjkSwap contract", function () {
  async function deployTokenFixture() {
    const VjkSwap = await ethers.getContractFactory("VjkSwap");
    const [owner, addr1] = await ethers.getSigners();

    const VjkSwapContract = await VjkSwap.deploy(SwapRouterAddress);

    await VjkSwapContract.deployed();

    // Fixtures can return anything you consider useful for your tests
    return { VjkSwapContract, owner, addr1 };
  }

  it("Should print a new VjkSwapContract address", async function () {
    const { VjkSwapContract } = await loadFixture(deployTokenFixture);

    console.log(`VjkSwapContract deployed at: ${VjkSwapContract.address}`);
    expect(VjkSwapContract.address);
  });

  // it("Should wrap some Eth", async function () {
  //   const { owner } = await loadFixture(deployTokenFixture);

  //   const valueToWrap = ethers.utils.parseEther("10");
  //   const WETH = new ethers.Contract(WETH_ADDRESS_GOLERI, ercAbi, owner);
  //   const balanceOfBeforeDeposit = await WETH.balanceOf(owner.address);

  //   console.log(
  //     `Balance before: ${ethers.utils.formatEther(balanceOfBeforeDeposit)} WETH`
  //   );

  //   const deposit = await WETH.deposit({
  //     value: valueToWrap,
  //   });
  //   await deposit.wait();
  //   const balanceOfAfterDeposit = await WETH.balanceOf(owner.address);

  //   console.log(
  //     `Wrapped: ${ethers.utils.formatEther(
  //       valueToWrap
  //     )} ETH, Balance after Wrap: ${ethers.utils.formatEther(
  //       balanceOfAfterDeposit
  //     )} WETH`
  //   );

  //   expect(
  //     parseInt(ethers.utils.formatEther(balanceOfBeforeDeposit)) +
  //       parseInt(ethers.utils.formatEther(valueToWrap))
  //   ).to.equal(parseInt(ethers.utils.formatEther(balanceOfAfterDeposit)));
  // });

  // it("Should swap Weth to Link", async function () {});

  // it("Should return a Link balance bigger than initial balance", async function () {});
});
