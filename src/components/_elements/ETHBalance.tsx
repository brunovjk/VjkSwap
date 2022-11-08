import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import { Context } from "../../context";
import { DisplayTokenInfo } from "./DisplayTokenInfo";

export function ETHBalance() {
  const context = useContext(Context);
  const [balance, setBalance] = useState("-.--");

  const provider = context?.provider;
  const signer = context?.currentAccount;
  const signerAddress = signer.provider.provider.selectedAddress;

  try {
    provider.getBalance(signerAddress).then((res: any) => {
      setBalance(ethers.utils.formatEther(res));
    });
  } catch (error) {
    console.log(error);
  }

  return <DisplayTokenInfo symbol={"ETH"} name={"ETH"} balance={balance} />;
}
