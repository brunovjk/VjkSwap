import { vjkSwapContractABI } from "../../utils/abis";
import { vjkSwapContractAddress } from "../../utils/constants";
import { ethers } from "ethers";

export async function ExecuteSwap(
  context: any,
  inputTokenInfoIn: any,
  inputTokenInfoOut: any,
  setDisabledControl: any,
  setAlert: any
) {
  const VjkSwapContract = new ethers.Contract(
    vjkSwapContractAddress,
    vjkSwapContractABI,
    context?.provider
  );

  VjkSwapContract.connect(context?.currentAccount)
    .swapExactInputSingle(
      inputTokenInfoIn.token,
      inputTokenInfoOut.token,
      ethers.utils.parseUnits(
        inputTokenInfoIn.amount,
        inputTokenInfoIn.decimals
      )
    )
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
        message:
          "Not able to requested transaction, please if tokens have enough pool",
        open: true,
        hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
      });
    });
}
