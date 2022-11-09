import {
  Weth_Goerli_Address,
  Weth_Mainnet_Address,
  tokenList_Mainnet,
  tokenList_Goerli,
} from "../utils/constants";

export const checkChainIdFunction = async ({
  ethereum,
  setTokenList,
  setWethAddres,
  setChainId,
}: any) => {
  try {
    if (!ethereum) return console.log("checkChainId");

    const chainId = await ethereum.request({ method: "eth_chainId" });

    if (chainId === "0x1") {
      setTokenList(
        tokenList_Mainnet.concat(
          JSON.parse(
            localStorage.getItem("local_added_tokenList_Mainnet") || "[]"
          )
        )
      );
      setWethAddres(Weth_Mainnet_Address);
      setChainId(chainId);
    } else if (chainId === "0x5") {
      setTokenList(
        tokenList_Goerli.concat(
          JSON.parse(
            localStorage.getItem("local_added_tokenList_Goerli") || "[]"
          )
        )
      );
      setWethAddres(Weth_Goerli_Address);
      setChainId(chainId);
    } else {
      setChainId(null);
    }
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object.");
  }
};
