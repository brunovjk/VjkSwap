import { Router02_Address } from "../../utils/constants";
import { Router02Abi } from "../../utils/abis";
import { ethers } from "ethers";

export async function ExecuteSwap(
  context: any,
  inputTokenInfoIn: any,
  inputTokenInfoOut: any,
  setDisabledControl: any,
  setAlert: any
) {
  const amountIn = ethers.utils
    .parseUnits(inputTokenInfoIn.amount, inputTokenInfoIn.decimals)
    .toHexString();
  const amountOutMin = inputTokenInfoOut.amount
    .div(ethers.BigNumber.from("100"))
    .mul(ethers.BigNumber.from("95"))
    .toHexString(); // Slippage tolerance 5% // TODO
  const path = [inputTokenInfoIn.token, inputTokenInfoOut.token];
  const to = context?.currentAccount.provider.provider.selectedAddress;
  const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

  const Router02Contract = new ethers.Contract(
    Router02_Address,
    Router02Abi,
    context?.provider
  );

  Router02Contract.connect(context?.currentAccount)
    .swapExactTokensForTokens(amountIn, amountOutMin, path, to, deadline)
    .then(async (res: any) => {
      setAlert({
        severity: "info",
        message: "Transaction requested, please wait confirmation.",
        open: true,
        hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
      });
      await res.wait();
      setAlert({
        severity: "success",
        message: "Swap transaction executed successfully.",
        open: true,
        hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
      });
      setDisabledControl({
        inputDisabled: false,
        aproveDisabled: false,
        approveLoading: false,
        swapDisabled: true,
        swapLoading: false,
      });
      context?.setSeed(Math.random());
    })
    .catch((res: any) => {
      setDisabledControl({
        inputDisabled: false,
        aproveDisabled: false,
        approveLoading: false,
        swapDisabled: true,
        swapLoading: false,
      });
      setAlert({
        severity: "error",
        message: `A swap of this size may have a high price impact, given the current liquidity in the pool. ${res.reason}`,
        open: true,
        hyperLink: "#",
      });
    });
}
