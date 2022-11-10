import { erc20Abi } from "../../utils/abis";
import { Router02_Address } from "../../utils/constants";
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

  // Check if has allowance
  const amountApproved = await tokenInContract
    .connect(context?.currentAccount)
    .allowance(
      context?.currentAccount.provider.provider.selectedAddress,
      Router02_Address
    );
  const amountIn = ethers.utils.parseUnits(
    inputTokenInfoIn.amount,
    inputTokenInfoIn.decimals
  );

  // If allowance is greater than amount to swap: Approve Swap
  if (amountApproved.gte(amountIn)) {
    setAlert({
      severity: "success",
      message: "Swaper Contract approved, please confirm the Swap.",
      open: true,
    });
    setDisabledControl({
      inputDisabled: true,
      aproveDisabled: true,
      approveLoading: false,
      swapDisabled: false,
      swapLoading: false,
    });
  } else {
    // If allowance not enough, approve Swaper, wait and Approve swap

    tokenInContract
      .connect(context?.currentAccount)
      .approve(
        Router02_Address,
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
}
