import React, { useState, useContext } from "react";
import { ethers } from "ethers";
import { Context } from "../../context";
import { DisplayTokenInfo } from "../_elements";
import { erc20Abi } from "../../utils/abis";

export function TokenBalance({ token }: any) {
  const context = useContext(Context);
  const [balance, setBalance] = useState("-.--");

  const provider = context?.provider;
  const signer = context?.currentAccount;
  const signerAddress = signer.provider.provider.selectedAddress;
  const contract = new ethers.Contract(token.address, erc20Abi, provider);

  try {
    contract.balanceOf(signerAddress).then((res: any) => {
      setBalance(ethers.utils.formatUnits(res, token.decimals));
    });
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      {token.name && token.symbol && balance && (
        <DisplayTokenInfo
          symbol={token.symbol}
          name={token.name}
          address={token.address}
          balance={balance}
        />
      )}
    </>
  );
}
