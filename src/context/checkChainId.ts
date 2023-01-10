import {
  Weth_Mainnet_Address,
  Weth_Goerli_Address,
  Weth_Polygon_Address,
  Weth_Mumbai_Address,
  Weth_Optimism_Address,
  Weth_Arbitrum_Address,
  tokenList_Mainnet,
  tokenList_Goerli,
  tokenList_Polygon,
  tokenList_Mumbai,
  tokenList_Optimism,
  tokenList_Arbitrum,
} from "../utils/constants";

export const checkChainIdFunction = async ({
  ethereum,
  setTokenList,
  setWethAddres,
  setChainId,
}: any) => {
  try {
    if (!ethereum) return console.log("checkChainId");

    const chainId = parseInt(await ethereum.request({ method: "eth_chainId" }));
    if (chainId === 1) {
      setTokenList(
        tokenList_Mainnet.concat(
          JSON.parse(
            localStorage.getItem("local_added_tokenList_Mainnet") || "[]"
          )
        )
      );
      setWethAddres(Weth_Mainnet_Address);
      setChainId(chainId);
    } else if (chainId === 5) {
      setTokenList(
        tokenList_Goerli.concat(
          JSON.parse(
            localStorage.getItem("local_added_tokenList_Goerli") || "[]"
          )
        )
      );
      setWethAddres(Weth_Goerli_Address);
      setChainId(chainId);
    } else if (chainId === 137) {
      setTokenList(
        tokenList_Polygon.concat(
          JSON.parse(
            localStorage.getItem("local_added_tokenList_Polygon") || "[]"
          )
        )
      );
      setWethAddres(Weth_Polygon_Address);
      setChainId(chainId);
    } else if (chainId === 80001) {
      setTokenList(
        tokenList_Mumbai.concat(
          JSON.parse(
            localStorage.getItem("local_added_tokenList_Mumbai") || "[]"
          )
        )
      );
      setWethAddres(Weth_Mumbai_Address);
      setChainId(chainId);
    } else if (chainId === 10) {
      setTokenList(
        tokenList_Optimism.concat(
          JSON.parse(
            localStorage.getItem("local_added_tokenList_Optimism") || "[]"
          )
        )
      );
      setWethAddres(Weth_Optimism_Address);
      setChainId(chainId);
    } else if (chainId === 42161) {
      setTokenList(
        tokenList_Arbitrum.concat(
          JSON.parse(
            localStorage.getItem("local_added_tokenList_Arbitrum") || "[]"
          )
        )
      );
      setWethAddres(Weth_Arbitrum_Address);
      setChainId(chainId);
    } else {
      setChainId(null);
    }
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object.");
  }
};
