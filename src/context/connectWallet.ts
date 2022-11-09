export const connectWalletFunction = async ({
  ethereum,
  provider,
  setSigner,
}: any) => {
  try {
    if (ethereum && provider) {
      await provider.send("eth_requestAccounts", []);

      const signer: any = provider.getSigner();

      if (signer._isSigner) {
        setSigner(signer);
      } else {
        console.log("No accounts found.");
      }
    } else {
      return console.log("connectWallet");
    }
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object.");
  }
};
