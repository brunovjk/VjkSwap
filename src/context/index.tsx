import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { checkChainIdFunction } from "./checkChainId";
import { checkIfWalletisConnectedFunction } from "./checkIfWalletisConnected";
import { connectWalletFunction } from "./connectWallet";

declare var window: any;
const { ethereum } = window;

export const Context = createContext<ContextInterface | null>(null);

export function ContextProvider({ children }: any) {
  const [seed, setSeed] = useState();
  const [loadingApp, setLoadingApp] = useState(false);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [wethAddres, setWethAddres] = useState("");
  const [tokenList, setTokenList] = useState<any[]>([]);

  const [themeSelector, setThemeSelector] = useState(
    localStorage.getItem("themeSelector") === "true" ? true : false
  );

  const provider: any = ethereum
    ? new ethers.providers.Web3Provider(ethereum, "any")
    : undefined;

  const checkChainId = async () => {
    checkChainIdFunction({
      ethereum,
      setTokenList,
      setWethAddres,
      setChainId,
    });
  };
  const checkIfWalletisConnected = async () => {
    checkIfWalletisConnectedFunction({
      ethereum,
      provider,
      setSigner,
    });
  };
  const connectWallet = async () => {
    connectWalletFunction({
      ethereum,
      provider,
      setSigner,
    });
  };

  const context: ContextInterface = {
    themeSelector: themeSelector,
    setThemeSelector: setThemeSelector,
    loadingApp: loadingApp,
    provider: provider,
    currentAccount: signer,
    chainId: chainId,
    connectWallet: connectWallet,
    wethAddres: wethAddres,
    tokenList: tokenList,
    seed: seed,
    setSeed: setSeed,
  };

  useEffect(() => {
    if (ethereum) {
      ethereum.on("chainChanged", () => {
        setLoadingApp(true);
        checkChainId();
        setTimeout(() => {
          setLoadingApp(false);
        }, 500);
      });
      ethereum.on("accountsChanged", () => {
        setLoadingApp(true);
        checkIfWalletisConnected();
        setTimeout(() => {
          setLoadingApp(false);
        }, 500);
      });
    }
  });

  useEffect(() => {
    checkIfWalletisConnected();
    checkChainId();
  }, []);

  return <Context.Provider value={context}>{children}</Context.Provider>;
}
