export const connectWalletFunction = async ({
  ethereum,
  provider,
  setSigner,
}: any) => {
  try {
    if (!ethereum)
      return console.log("Please install a Cryptocurrency Software Wallet");

    await provider.send("eth_requestAccounts", []);

    const signer: any = provider.getSigner();

    if (signer._isSigner) {
      setSigner(signer);
    } else {
      console.log("No accounts found.");
    }
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object.");
  }
};
