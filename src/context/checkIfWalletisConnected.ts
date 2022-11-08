export const checkIfWalletisConnectedFunction = async ({
  ethereum,
  provider,
  setSigner,
}: any) => {
  try {
    if (!ethereum)
      return console.log("Please install a Cryptocurrency Software Wallet");

    await provider.send("eth_accounts");

    const signer: any = provider.getSigner();
    const signerAddress = signer.provider.provider.selectedAddress;

    if (signerAddress?.length) {
      setSigner(signer);
    } else {
      console.log("No accounts found.");
    }
  } catch (error) {
    console.log(error);

    throw new Error("No ethereum object.");
  }
};
