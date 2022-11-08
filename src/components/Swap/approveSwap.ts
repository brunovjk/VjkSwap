import { erc20Abi } from "../../utils/abis";
import { vjkSwapContractAddress } from "../../utils/constants";
import { ethers } from "ethers";

export async function ApproveSwap(
  context: any,
  inputTokenInfoIn: any,
  setDisabledControl: any,
  setAlert: any
) {
  const tokenInContract = new ethers.Contract(
    inputTokenInfoIn.token,
    erc20Abi,
    context?.provider
  );

  tokenInContract
    .connect(context?.currentAccount)
    .approve(
      vjkSwapContractAddress,
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
        message: "Swaper Contract approved, please confirm the Swap.",
        open: true,
        hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
      });
      setDisabledControl({
        inputDisabled: true,
        aproveDisabled: true,
        approveLoading: false,
        swapDisabled: false,
        swapLoading: false,
      });
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
        message: "Swaper Contract not approved, please check informations",
        open: true,
        hyperLink: `https://goerli.etherscan.io/tx/${res.hash}`,
      });
    });
}
