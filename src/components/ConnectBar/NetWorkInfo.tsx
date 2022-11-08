import React, { useContext } from "react";
import { IconButton, Stack, Typography } from "@mui/material";
import { Context } from "../../context";
import { shortenAddress } from "../../utils/shorten";

export function Account() {
  const context = useContext(Context);
  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography variant="caption" color="primary.main">
        {context?.chainId === "0x1" && "ETH Mainnet"}
        {context?.chainId === "0x5" && "Görli Testnet"}
      </Typography>
      <Typography variant="body1" color="primary.main">
        {context?.currentAccount.provider.provider.selectedAddress &&
          shortenAddress(
            context?.currentAccount.provider.provider.selectedAddress
          )}
      </Typography>
    </Stack>
  );
}
export function IncorrectNetwork() {
  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Typography variant="caption" color="error.main">
        Incorrect Network
      </Typography>
      <Typography variant="body2" color="error.main">
        Switch to Mainnet or Görli
      </Typography>
    </Stack>
  );
}
